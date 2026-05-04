// src/components/GalleryCard.js
import React, { useRef } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import { styles } from '../styles/styles';

const GalleryCard = ({ item, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(item)}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardAuthor}>{item.author}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default GalleryCard;