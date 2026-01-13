import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userName] = useState('John');

  

  const favorites = [
    { id: 1, name: 'Tomato', image: require('../../assets/plants/tomato.jpg') },
    { id: 2, name: 'Maize', image: require('../../assets/plants/maize.jpg') },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
            <Text style={styles.subtitle}>Let's care for your plants</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scan Options */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.scanCard}
            onPress={() => navigation.navigate('PlantScan')}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.scanGradient}
            >
              <Ionicons name="scan" size={40} color="#fff" />
              <Text style={styles.scanCardTitle}>Scan Plant</Text>
              <Text style={styles.scanCardSubtitle}>Detect diseases instantly</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => navigation.navigate('PlantScan')}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.scanGradient}
            >
              <Ionicons name="cloud-upload-outline" size={40} color="#fff" />
              <Text style={styles.scanCardTitle}>Upload Image</Text>
              <Text style={styles.scanCardSubtitle}>From your gallery</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Plant Tips removed */}

        {/* Weather Alert */}
        <View style={styles.section}>
          <View style={styles.weatherCard}>
            <Ionicons name="partly-sunny" size={24} color="#FFA500" />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTitle}>Weather Alert: Rain Expected</Text>
              <Text style={styles.weatherSubtitle}>🌧️ Cover your crops</Text>
            </View>
          </View>
        </View>

        {/* Favorites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {favorites.map((plant) => (
              <TouchableOpacity key={plant.id} style={styles.favoriteCard}>
                <Image source={plant.image} style={styles.favoriteImage} />
                <Text style={styles.favoriteName}>{plant.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  scanCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  uploadCard: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanGradient: {
    padding: 20,
    alignItems: 'center',
  },
  scanCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  scanCardSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  
  weatherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  weatherInfo: {
    flex: 1,
    marginLeft: 15,
  },
  weatherTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  weatherSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  favoriteCard: {
    width: 100,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  favoriteImage: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  favoriteName: {
    padding: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});
