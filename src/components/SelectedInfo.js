import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

const SelectedInfo = ({ selectedItem }) => {
  if (!selectedItem) return null;
  
  return (
    <View style={styles.selectedBox}>
      <Text style={styles.selectedText}>
        Dipilih: {selectedItem.title}
      </Text>
    </View>
  );
};

export default SelectedInfo;