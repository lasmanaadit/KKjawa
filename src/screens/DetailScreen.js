// src/screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { ENDPOINTS } from '../api/config';

const FAVORITES_KEY = '@javanese_favorites';
const AUTH_KEY = '@auth_user';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [isFav, setIsFav] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [user, setUser] = useState(null);

  // Load user data saat komponen mount
  useEffect(() => {
    loadUser();
    checkFavoriteStatus();
  }, []);

  // Load komentar setelah user dan item tersedia
  useEffect(() => {
    if (user && item) {
      loadUserComment();
      loadAllComments();
    }
  }, [user, item]);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(AUTH_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Gagal memuat user:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const favIds = stored ? JSON.parse(stored) : [];
      setIsFav(favIds.includes(item.id));
    } catch (error) {
      console.error('Gagal cek favorit:', error);
    }
  };

  // Load komentar milik user saat ini untuk kesenian ini
  const loadUserComment = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${ENDPOINTS.comments}?userId=${user.id}&artId=${item.id}`);
      const comments = await response.json();
      
      if (comments.length > 0) {
        setComment(comments[0].comment);
      } else {
        setComment('');
      }
    } catch (error) {
      console.error('Gagal memuat komentar user:', error);
    }
  };

  // Load semua komentar dari semua user untuk kesenian ini
  const loadAllComments = async () => {
    setLoadingComments(true);
    try {
      const response = await fetch(`${ENDPOINTS.comments}?artId=${item.id}`);
      const comments = await response.json();
      setAllComments(comments);
    } catch (error) {
      console.error('Gagal memuat semua komentar:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const saveComment = async () => {
    if (!user) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Error', 'Komentar tidak boleh kosong');
      return;
    }

    try {
      // Cek apakah sudah ada komentar dari user ini untuk kesenian ini
      const checkResponse = await fetch(`${ENDPOINTS.comments}?userId=${user.id}&artId=${item.id}`);
      const existingComments = await checkResponse.json();

      if (existingComments.length > 0) {
        // UPDATE komentar yang sudah ada
        const commentId = existingComments[0].id;
        await fetch(`${ENDPOINTS.comments}/${commentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...existingComments[0],
            comment: comment,
            updatedAt: new Date().toISOString(),
          }),
        });
      } else {
        // CREATE komentar baru
        const newComment = {
          userId: user.id,
          userName: user.name,
          artId: item.id,
          artTitle: item.title,
          comment: comment,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await fetch(ENDPOINTS.comments, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newComment),
        });
      }

      Alert.alert('Berhasil', 'Komentar disimpan');
      setShowCommentInput(false);
      
      // Refresh daftar komentar
      loadAllComments();
      loadUserComment();
    } catch (error) {
      console.error('Gagal menyimpan komentar:', error);
      Alert.alert('Error', 'Gagal menyimpan komentar');
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      let favIds = stored ? JSON.parse(stored) : [];

      if (isFav) {
        favIds = favIds.filter(id => id !== item.id);
        Alert.alert('Info', `${item.title} dihapus dari favorit.`);
      } else {
        if (!favIds.includes(item.id)) {
          favIds.push(item.id);
          Alert.alert('Sukses', `${item.title} ditambahkan ke favorit.`);
        }
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favIds));
      setIsFav(!isFav);
    } catch (error) {
      console.error('Gagal menyimpan favorit:', error);
      Alert.alert('Error', 'Gagal menyimpan perubahan.');
    }
  };

  const description = item.description || 
    `${item.title} merupakan warisan budaya Jawa yang terkenal dari ${item.author}. ` +
    `Nikmati keindahannya dan lestarikan budaya Indonesia.`;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Image source={item.image} style={styles.detailImage} />
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>{item.title}</Text>
          <Text style={styles.detailAuthor}>{item.author}</Text>
          <Text style={styles.detailDescription}>{description}</Text>

          {/* Tombol Komentar */}
          <TouchableOpacity 
            style={styles.commentButton} 
            onPress={() => setShowCommentInput(!showCommentInput)}
          >
            <Text style={styles.commentButtonText}>
              💬 {showCommentInput ? 'Tutup Komentar' : (comment ? '✏️ Edit Komentar' : '➕ Tambah Komentar')}
            </Text>
          </TouchableOpacity>

          {/* TextInput Komentar */}
          {showCommentInput && (
            <View style={styles.commentContainer}>
              <Text style={styles.commentLabel}>Komentar Anda:</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Tulis komentar atau pendapat Anda tentang kesenian ini..."
                placeholderTextColor="#bdc3c7"
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles.saveCommentButton} onPress={saveComment}>
                <Text style={styles.saveCommentButtonText}>💾 Simpan Komentar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tampilkan komentar user yang sudah disimpan */}
          {comment !== '' && !showCommentInput && (
            <View style={styles.existingComment}>
              <Text style={styles.existingCommentLabel}>📝 Komentar Anda:</Text>
              <Text style={styles.existingCommentText}>"{comment}"</Text>
              <TouchableOpacity 
                style={styles.editCommentButton} 
                onPress={() => setShowCommentInput(true)}
              >
                <Text style={styles.editCommentButtonText}>✏️ Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Daftar Semua Komentar dari Pengguna Lain */}
          <View style={styles.allCommentsContainer}>
            <Text style={styles.allCommentsTitle}>💬 Komentar Pengguna Lain:</Text>
            
            {loadingComments ? (
              <ActivityIndicator size="small" color="#e17055" style={{ marginVertical: 15 }} />
            ) : allComments.length === 0 ? (
              <Text style={styles.noCommentsText}>Belum ada komentar dari pengguna lain. Jadilah yang pertama!</Text>
            ) : (
              allComments.map((cmt, index) => (
                <View key={cmt.id || index} style={styles.otherCommentCard}>
                  <View style={styles.otherCommentHeader}>
                    <Text style={styles.otherCommentName}>{cmt.userName || 'Anonymous'}</Text>
                    <Text style={styles.otherCommentDate}>
                      {cmt.createdAt ? new Date(cmt.createdAt).toLocaleDateString('id-ID') : ''}
                    </Text>
                  </View>
                  <Text style={styles.otherCommentText}>{cmt.comment}</Text>
                </View>
              ))
            )}
          </View>

          {/* Tombol Favorit */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: isFav ? '#e17055' : '#bdc3c7' }
            ]}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {isFav ? '❤️ Hapus dari Favorit' : '♡ Tambah ke Favorit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}