import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import { styles } from '../styles/styles';
// ✅ Perbaiki path - tambahkan ./src/ di depan
import GalleryCard from '../components/GalleryCard';
import HorizontalCard from '../components/HorizontalCard';
import SelectedInfo from '../components/SelectedInfo';
import { galleryData, horizontalData } from '../data/galleryData';

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Katalog Kesenian Jawa</Text>
      <Text style={styles.subtitle}>
        Jelajahi budaya tradisional Indonesia
      </Text>

      <SelectedInfo selectedItem={selectedItem} />

      <Text style={styles.sectionTitle}>Kesenian Utama</Text>
      
      <FlatList
        data={galleryData}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <GalleryCard 
            item={item} 
            onPress={handlePress}
          />
        )}
      />

      <Text style={styles.sectionTitle}>Kesenian Lainnya</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {horizontalData.map((item) => (
          <HorizontalCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}