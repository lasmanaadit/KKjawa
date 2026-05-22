// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    // Validasi nama
    if (!name.trim()) {
      Alert.alert('Error', 'Nama wajib diisi');
      return;
    }
    
    // Validasi email
    if (!email.trim()) {
      Alert.alert('Error', 'Email wajib diisi');
      return;
    }
    
    // Validasi password
    if (!password.trim()) {
      Alert.alert('Error', 'Password wajib diisi');
      return;
    }
    
    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok');
      return;
    }
    
    // Validasi panjang password
    if (password.length < 4) {
      Alert.alert('Error', 'Password minimal 4 karakter');
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      Alert.alert(
        'Berhasil', 
        'Akun berhasil dibuat! Silakan login.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Register error:', error);
      let errorMessage = 'Terjadi kesalahan';
      if (error.message === 'Email sudah terdaftar') {
        errorMessage = 'Email sudah terdaftar, silakan gunakan email lain';
      } else {
        errorMessage = error.message;
      }
      Alert.alert('Gagal', errorMessage);
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