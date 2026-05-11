// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?background=e17055&color=fff&name=User' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
        <Text style={styles.title}>Akun Saya</Text>
        <Text style={styles.subtitle}>user@example.com</Text>
        <View style={{ marginTop: 30, width: '80%' }}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Edit Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, { backgroundColor: '#e74c3c', marginTop: 10 }]}>
            <Text style={styles.navButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}