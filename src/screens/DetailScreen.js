// src/screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { supabase } from '../api/supabase';
import { useAuth } from '../context/AuthContext';

const FAVORITES_KEY = '@javanese_favorites';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const { user } = useAuth();
  
  const [isFav, setIsFav] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [savingComment, setSavingComment] = useState(false);

  // Cek status favorit saat komponen mount
  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  // Load komentar setelah user dan item tersedia
  useEffect(() => {
    if (user && item) {
      loadUserComment();
      loadAllComments();
    }
  }, [user, item]);

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
      const { data, error } = await supabase
        .from('comments')
        .select('comment')
        .eq('user_id', user.id)
        .eq('art_id', item.id)
        .single();
      
      if (!error && data) {
        setComment(data.comment);
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
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('art_id', item.id)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setAllComments(data);
      } else {
        setAllComments([]);
      }
    } catch (error) {
      console.error('Gagal memuat semua komentar:', error);
      setAllComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Simpan komentar (insert atau update)
  const saveComment = async () => {
    if (!user) {
      Alert.alert('Error', 'Silakan login terlebih dahulu');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Error', 'Komentar tidak boleh kosong');
      return;
    }

    setSavingComment(true);
    try {
      // Cek apakah sudah ada komentar dari user ini
      const { data: existing } = await supabase
        .from('comments')
        .select('id')
        .eq('user_id', user.id)
        .eq('art_id', item.id)
        .single();

      if (existing) {
        // UPDATE komentar yang sudah ada
        const { error } = await supabase
          .from('comments')
          .update({ 
            comment: comment.trim(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        // INSERT komentar baru
        const { error } = await supabase
          .from('comments')
          .insert([{
            user_id: user.id,
            user_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Pengguna',
            art_id: item.id,
            art_title: item.title,
            comment: comment.trim(),
          }]);
        
        if (error) throw error;
      }

      Alert.alert('Berhasil', 'Komentar disimpan');
      setShowCommentInput(false);
      
      // Refresh daftar komentar
      loadAllComments();
      loadUserComment();
    } catch (error) {
      console.error('Gagal menyimpan komentar:', error);
      Alert.alert('Error', 'Gagal menyimpan komentar');
    } finally {
      setSavingComment(false);
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

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
                editable={!savingComment}
              />
              <TouchableOpacity 
                style={[styles.saveCommentButton, savingComment && { opacity: 0.6 }]} 
                onPress={saveComment}
                disabled={savingComment}
              >
                <Text style={styles.saveCommentButtonText}>
                  {savingComment ? 'Menyimpan...' : '💾 Simpan Komentar'}
                </Text>
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
                    <Text style={styles.otherCommentName}>{cmt.user_name || 'Anonymous'}</Text>
                    <Text style={styles.otherCommentDate}>
                      {formatDate(cmt.created_at)}
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