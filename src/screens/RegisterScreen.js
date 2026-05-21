// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { API_BASE_URL } from '../api/config';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validasi input
    if (!name.trim()) {
      Alert.alert('Error', 'Nama wajib diisi');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email wajib diisi');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password wajib diisi');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok');
      return;
    }
    if (password.length < 4) {
      Alert.alert('Error', 'Password minimal 4 karakter');
      return;
    }

    setLoading(true);
    try {
      // Cek apakah email sudah terdaftar
      const checkUrl = `${API_BASE_URL}/users?email=${email}`;
      console.log('Checking URL:', checkUrl);
      
      const checkResponse = await fetch(checkUrl);
      
      if (!checkResponse.ok) {
        throw new Error(`HTTP ${checkResponse.status}`);
      }
      
      const existingData = await checkResponse.json();
      const existingUsers = Array.isArray(existingData) ? existingData : [];
      
      if (existingUsers.length > 0) {
        Alert.alert('Error', 'Email sudah terdaftar');
        setLoading(false);
        return;
      }

      // Buat user baru
      const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      const createUrl = `${API_BASE_URL}/users`;
      console.log('Creating at URL:', createUrl);
      
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      console.log('Create response status:', createResponse.status);

      if (createResponse.ok) {
        Alert.alert('Berhasil', 'Akun berhasil dibuat, silakan login');
        navigation.goBack();
      } else {
        const errorText = await createResponse.text();
        console.error('Create failed:', errorText);
        Alert.alert('Error', `Gagal membuat akun: ${createResponse.status}`);
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', `Terjadi kesalahan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.authCard}>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?background=e17055&color=fff&name=KJ&size=80' }}
          style={styles.authLogo}
        />
        <Text style={styles.authTitle}>Daftar Akun</Text>
        <Text style={styles.authSubtitle}>Buat akun baru</Text>

        <TextInput
          style={styles.authInput}
          placeholder="Nama Lengkap"
          placeholderTextColor="#95a5a6"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />
        
        <TextInput
          style={styles.authInput}
          placeholder="Email"
          placeholderTextColor="#95a5a6"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        
        <TextInput
          style={styles.authInput}
          placeholder="Password (min 4 karakter)"
          placeholderTextColor="#95a5a6"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        
        <TextInput
          style={styles.authInput}
          placeholder="Konfirmasi Password"
          placeholderTextColor="#95a5a6"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.authButton, loading && { opacity: 0.6 }]} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.authButtonText}>Daftar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.authLink}>Sudah punya akun? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}