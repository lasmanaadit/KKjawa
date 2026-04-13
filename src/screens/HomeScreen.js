import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/styles';
import GalleryCard from '../components/GalleryCard';
import HorizontalCard from '../components/HorizontalCard';
import { galleryData, horizontalData } from '../data/galleryData';

export default function HomeScreen({ navigation }) {  // ← terima props navigation
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);
    navigation.navigate('Detail', { item });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tombol navigasi ke Favorites dan About */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Text style={{ color: '#e17055', fontWeight: 'bold' }}>❤️ Favorit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={{ color: '#0984e3', fontWeight: 'bold' }}>ℹ️ Tentang</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Katalog Kesenian Jawa</Text>
      <Text style={styles.subtitle}>
        Jelajahi budaya tradisional Indonesia
      </Text>

      {/* Hapus atau komentar SelectedInfo jika tidak diperlukan */}
      {/* <SelectedInfo selectedItem={selectedItem} /> */}

      <Text style={styles.sectionTitle}>Kesenian Utama</Text>
      
      <FlatList
        data={galleryData}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <GalleryCard 
            item={item} 
            onPress={() => handlePress(item)}
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