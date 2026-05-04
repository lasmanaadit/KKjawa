// src/screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles';

const FAVORITES_KEY = '@javanese_favorites';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
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
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.detailImage} />
      <View style={styles.detailContent}>
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailAuthor}>{item.author}</Text>
        <Text style={styles.detailDescription}>{description}</Text>

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
  );
}