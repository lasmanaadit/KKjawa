import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

export default function App() {

  // DATA GALLERY (data utama yang ditampilkan secara vertikal)
  const galleryData = [
    {
      id: '1',
      title: 'Reog Ponorogo',
      author: 'Jawa Timur',
      image: require('./assets/images/reogponorogo.jpg'), // gambar lokal
    },
    {
      id: '2',
      title: 'Tari Gambyong',
      author: 'Jawa Tengah',
      image: require('./assets/images/gambyong.jpg'),
    },
    {
      id: '3',
      title: 'Wayang Kulit',
      author: 'Jawa',
      image: require('./assets/images/wayangkulit.jpeg'),
    },
  ];

  // DATA HORIZONTAL (ditampilkan scroll ke samping di bawah)
  const horizontalData = [
    {
      id: '1',
      title: 'Gamelan',
      image: require('./assets/images/gamelan.jpg'),
    },
    {
      id: '2',
      title: 'Ludruk',
      image: require('./assets/images/reogponorogo.jpg'),
    },
    {
      id: '3',
      title: 'Ketoprak',
      image: require('./assets/images/gambyong.jpg'),
    },
  ];

  return (
    // ScrollView utama untuk seluruh halaman (scroll ke bawah)
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.title}>Katalog Kesenian Jawa</Text> {/* Judul */}
      <Text style={styles.subtitle}>
        Jelajahi budaya tradisional Indonesia {/* Subjudul */}
      </Text>

      {/* SECTION GALLERY (VERTICAL) */}
      <Text style={styles.sectionTitle}>Kesenian Utama</Text>

      <FlatList
        data={galleryData} // sumber data
        keyExtractor={(item) => item.id} // key unik tiap item
        scrollEnabled={false} // agar mengikuti ScrollView utama
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Gambar utama */}
            <Image source={item.image} style={styles.cardImage} />

            {/* Konten teks */}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text> {/* Judul */}
              <Text style={styles.cardAuthor}>{item.author}</Text> {/* Asal */}
            </View>
          </View>
        )}
      />

      {/* SECTION HORIZONTAL */}
      <Text style={styles.sectionTitle}>Kesenian Lainnya</Text>

      {/* Scroll horizontal untuk item tambahan */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {horizontalData.map((item) => (
          <View key={item.id} style={styles.horizontalCard}>
            {/* Gambar */}
            <Image source={item.image} style={styles.horizontalImage} />
            {/* Judul */}
            <Text style={styles.horizontalText}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>

    </ScrollView>
  );
}

// STYLE UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  subtitle: {
    color: '#7f8c8d',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#34495e',
  },

  // STYLE CARD UTAMA (vertical)
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4, // bayangan android
  },

  cardImage: {
    width: '100%',
    height: 180,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  cardAuthor: {
    color: '#7f8c8d',
  },

  // STYLE CARD HORIZONTAL
  horizontalCard: {
    marginRight: 15,
  },

  horizontalImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
  },

  horizontalText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
});