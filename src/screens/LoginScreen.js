import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { API_BASE_URL } from '../api/config';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // <-- ambil fungsi login dari context

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users?email=${email}`);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const users = Array.isArray(data) ? data : [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        await login(user); // <-- panggil fungsi login dari context
        Alert.alert('Berhasil', 'Login sukses');
        // Tidak perlu navigation.reset lagi! Context akan otomatis mengganti navigator
      } else {
        Alert.alert('Gagal', 'Email atau password salah');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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