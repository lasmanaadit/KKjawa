// src/screens/HomeScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, FlatList, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import GalleryCard from '../components/GalleryCard';
import HorizontalCard from '../components/HorizontalCard';
import { galleryData, horizontalData } from '../data/galleryData';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = galleryData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeAnims = useRef(filteredData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    fadeAnims.forEach(anim => anim.setValue(0));
    Animated.stagger(
      100,
      fadeAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [searchQuery]);

  const handlePress = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Katalog Kesenian Jawa</Text>
        <Text style={styles.subtitle}>Jelajahi budaya tradisional Indonesia</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Cari kesenian atau daerah..."
            placeholderTextColor="#95a5a6"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>Kesenian Utama</Text>
        
        {filteredData.length === 0 ? (
          <View style={styles.emptySearch}>
            <Text style={styles.emptySearchText}>Tidak ada kesenian yang cocok</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Animated.View
                style={{
                  opacity: fadeAnims[index],
                  transform: [
                    {
                      translateY: fadeAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <GalleryCard item={item} onPress={() => handlePress(item)} />
              </Animated.View>
            )}
          />
        )}

        <Text style={styles.sectionTitle}>Kesenian Lainnya</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {horizontalData.map((item) => (
            <HorizontalCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}