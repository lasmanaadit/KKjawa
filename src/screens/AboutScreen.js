// src/screens/AboutScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Image
            source={{ uri: 'https://example.com/javanese-culture-logo.png' }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 12 }}
          />
          <Text style={styles.title}>Katalog Kesenian Jawa</Text>
          <Text style={styles.subtitle}>Versi 1.0.0</Text>
        </View>

        <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
        <Text style={styles.detailDescription}>
          Aplikasi ini bertujuan untuk memperkenalkan kekayaan budaya Jawa, 
          mulai dari tarian, wayang, batik, gamelan, hingga upacara adat. 
          Setiap kesenian dilengkapi dengan gambar, penjelasan, dan informasi pembuatnya.
        </Text>

        <Text style={styles.sectionTitle}>Tim Pengembang</Text>
        <Text style={styles.detailDescription}>
          • Lasmana Adit – Project Leader{'\n'}
          • Lasmana Adit – UI/UX Designer{'\n'}
          • Lasmana Adit – React Native Developer{'\n'}
          • Lasmana Adit – Content Writer
        </Text>

        <Text style={styles.sectionTitle}>Sumber Data</Text>
        <Text style={styles.detailDescription}>
          Data kesenian dikumpulkan dari Dinas Kebudayaan DIY, Kemendikbudristek, 
          serta wawancara dengan budayawan Jawa.
        </Text>

        <Text style={styles.sectionTitle}>Kontak & Media Sosial</Text>
        <Text style={[styles.detailDescription, { color: '#0984e3' }]}
              onPress={() => Linking.openURL('mailto:info@kesenianjawa.id')}>
          Email: info@kesenianjawa.id
        </Text>
        <Text style={[styles.detailDescription, { color: '#0984e3', marginTop: 8 }]}
              onPress={() => Linking.openURL('https://instagram.com/kesenianjawa')}>
          Instagram: @kesenianjawa
        </Text>

        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <Text style={{ color: '#b2bec3' }}>© 2025 Katalog Kesenian Jawa</Text>
          <Text style={{ color: '#b2bec3' }}>Melestarikan budaya, membangun identitas bangsa.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}