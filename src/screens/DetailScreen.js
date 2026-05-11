// src/screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';

const FAVORITES_KEY = '@javanese_favorites';
const COMMENTS_KEY = '@javanese_comments';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [isFav, setIsFav] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
    loadComment();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const favIds = stored ? JSON.parse(stored) : [];
      setIsFav(favIds.includes(item.id));
    } catch (error) {
      console.error('Gagal cek favorit:', error);
    }
  };

  const loadComment = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMMENTS_KEY);
      const allComments = stored ? JSON.parse(stored) : {};
      setComment(allComments[item.id] || '');
    } catch (error) {
      console.error('Gagal memuat komentar:', error);
    }
  };

  const saveComment = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMMENTS_KEY);
      const allComments = stored ? JSON.parse(stored) : {};
      allComments[item.id] = comment;
      await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
      Alert.alert('Berhasil', 'Komentar disimpan');
      setShowCommentInput(false); // Tutup input setelah menyimpan
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

          {/* TextInput muncul jika showCommentInput true */}
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

          {/* Tampilkan komentar yang sudah disimpan (jika ada dan input lagi terbuka) */}
          {comment !== '' && !showCommentInput && (
            <View style={styles.existingComment}>
              <Text style={styles.existingCommentLabel}>📝 Komentar tersimpan:</Text>
              <Text style={styles.existingCommentText}>"{comment}"</Text>
              <TouchableOpacity 
                style={styles.editCommentButton} 
                onPress={() => setShowCommentInput(true)}
              >
                <Text style={styles.editCommentButtonText}>✏️ Edit</Text>
              </TouchableOpacity>
            </View>
          )}

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