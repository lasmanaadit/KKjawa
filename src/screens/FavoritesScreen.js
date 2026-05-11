// src/screens/FavoritesScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import GalleryCard from '../components/GalleryCard';
import { galleryData } from '../data/galleryData';

const FAVORITES_KEY = '@javanese_favorites';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      const favIds = stored ? JSON.parse(stored) : [];
      const favItems = galleryData.filter(item => favIds.includes(item.id));
      setFavorites(favItems);
    } catch (error) {
      console.error('Gagal memuat favorit:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handlePress = (item) => {
    navigation.navigate('Detail', { item });
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <Text style={styles.subtitle}>Belum ada favorit.</Text>
          <Text style={{ color: '#7f8c8d' }}>Tekan ♡ pada halaman detail untuk menambahkan.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <GalleryCard item={item} onPress={() => handlePress(item)} />
        )}
      />
    </SafeAreaView>
  );
}