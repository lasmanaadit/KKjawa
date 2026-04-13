// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Kesenian' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorit Saya' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Tentang Aplikasi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}