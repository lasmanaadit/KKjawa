// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth(); // <-- ambil user dan logout dari context
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout(); // <-- cukup panggil logout, navigasi otomatis
            Alert.alert('Berhasil', 'Anda telah logout');
          }
        }
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <ActivityIndicator size="large" color="#e17055" />
          <Text style={{ marginTop: 10, color: '#7f8c8d' }}>Memuat profil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: `https://ui-avatars.com/api/?background=e17055&color=fff&name=${encodeURIComponent(user.name || 'User')}&size=120` }}
            style={styles.profileAvatar}
          />
          
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.profileDate}>
            Bergabung: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
          </Text>
          
          <View style={styles.profileButtons}>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => Alert.alert('Info', 'Fitur edit profil akan segera hadir')}
            >
              <Text style={styles.editButtonText}>✏️ Edit Profil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Informasi Statistik */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Informasi Akun</Text>
          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>User ID:</Text>
              <Text style={styles.statsValue}>{user.id}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Terdaftar pada:</Text>
              <Text style={styles.statsValue}>
                {user.createdAt ? new Date(user.createdAt).toLocaleString('id-ID') : '-'}
              </Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Status:</Text>
              <Text style={[styles.statsValue, { color: '#27ae60' }]}>✓ Aktif</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}