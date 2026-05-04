// src/screens/HomeScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import GalleryCard from '../components/GalleryCard';
import HorizontalCard from '../components/HorizontalCard';
import { galleryData, horizontalData } from '../data/galleryData';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Buat animated value untuk tiap item di galleryData
  const fadeAnims = useRef(galleryData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animasi stagger: setiap kartu muncul bergantian dengan delay 100ms
    Animated.stagger(
      120,
      fadeAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Katalog Kesenian Jawa</Text>
      <Text style={styles.subtitle}>Jelajahi budaya tradisional Indonesia</Text>

      <Text style={styles.sectionTitle}>Kesenian Utama</Text>
      <FlatList
        data={galleryData}
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
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
          >
            <GalleryCard item={item} onPress={() => handlePress(item)} />
          </Animated.View>
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