// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../api/supabase';

const AuthContext = createContext();
const AUTH_KEY = '@auth_user';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(AUTH_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Gagal cek session:', error);
      setIsLoggedIn(false);
    }
  };

  const login = async (email, password) => {
    // Cari user berdasarkan email
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, password')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      throw new Error('User tidak ditemukan');
    }
    
    // Cek password (string biasa)
    if (data.password !== password) {
      throw new Error('Password salah');
    }
    
    // Simpan user ke AsyncStorage (tanpa password)
    const userWithoutPassword = {
      id: data.id,
      name: data.name,
      email: data.email,
    };
    
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    setIsLoggedIn(true);
    
    return data;
  };

  const register = async (name, email, password) => {
    // Cek apakah email sudah terdaftar
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    
    if (existing) {
      throw new Error('Email sudah terdaftar');
    }
    
    // Simpan user baru ke tabel users
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: name,
        email: email,
        password: password,
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Insert error:', error);
      throw new Error('Gagal membuat akun');
    }
    
    return data;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}