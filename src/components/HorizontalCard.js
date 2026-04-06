import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';

const HorizontalCard = ({ item }) => {
  return (
    <View style={styles.horizontalCard}>
      <Image source={item.image} style={styles.horizontalImage} />
      <Text style={styles.horizontalText}>{item.title}</Text>
    </View>
  );
};

export default HorizontalCard;