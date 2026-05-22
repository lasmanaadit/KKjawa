// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    // Validasi input
    if (!email.trim()) {
      Alert.alert('Error', 'Email wajib diisi');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password wajib diisi');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      Alert.alert('Berhasil', 'Login sukses');
      // Setelah login sukses, AuthContext akan otomatis mengupdate isLoggedIn
      // dan navigasi akan berpindah ke MainApp
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Terjadi kesalahan';
      if (error.message === 'User tidak ditemukan') {
        errorMessage = 'Email tidak terdaftar';
      } else if (error.message === 'Password salah') {
        errorMessage = 'Password salah';
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
        <Text style={styles.authTitle}>Katalog Kesenian Jawa</Text>
        <Text style={styles.authSubtitle}>Login untuk melanjutkan</Text>

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
          placeholder="Password"
          placeholderTextColor="#95a5a6"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.authButton, loading && { opacity: 0.6 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.authButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')}
          disabled={loading}
        >
          <Text style={styles.authLink}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}