// src/screens/DetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

export default function DetailScreen({ route }) {
  const { item } = route.params;

  const description = item.description || 
    `${item.title} merupakan warisan budaya Jawa yang terkenal dari ${item.author}. ` +
    `Nikmati keindahannya dan lestarikan budaya Indonesia.`;

  return (
    <ScrollView style={styles.container}>
      {/* Langsung pakai source={item.image} karena item.image adalah require */}
      <Image source={item.image} style={styles.detailImage} />
      <View style={styles.detailContent}>
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailAuthor}>{item.author}</Text>
        <Text style={styles.detailDescription}>{description}</Text>
      </View>
    </ScrollView>
  );
}