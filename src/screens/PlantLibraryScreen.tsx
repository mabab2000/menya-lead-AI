import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlantLibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Corn', 'Fruits', 'Vegetables'];

  const plants = [
    {
      id: 1,
      name: 'Maize',
      category: 'Corn',
      image: require('../../assets/plants/maize.jpg'),
      description: 'Common cereal crop',
    },
    {
      id: 2,
      name: 'Cassava',
      category: 'Vegetables',
      image: require('../../assets/plants/cassava.jpg'),
      description: 'Root vegetable crop',
    },
    {
      id: 3,
      name: 'Rice',
      category: 'Corn',
      image: require('../../assets/plants/rice.jpg'),
      description: 'Staple grain crop',
    },
    {
      id: 4,
      name: 'Tomato',
      category: 'Vegetables',
      image: require('../../assets/plants/tomato.jpg'),
      description: 'Popular garden vegetable',
    },
  ];

  const filteredPlants = plants.filter((plant) => {
    const matchesCategory =
      selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.headerTitle}>Plant Library</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Plants Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredPlants.map((plant) => (
            <TouchableOpacity key={plant.id} style={styles.plantCard}>
              <Image source={plant.image} style={styles.plantImage} />
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantDescription} numberOfLines={1}>
                  {plant.description}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#4CAF50"
                  style={styles.plantArrow}
                />
              </View>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  categoryChipActive: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  grid: {
    paddingHorizontal: 20,
  },
  plantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plantImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
  },
  plantInfo: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  plantDescription: {
    fontSize: 14,
    color: '#666',
    flex: 2,
    marginLeft: 10,
  },
  plantArrow: {
    marginLeft: 10,
  },
});
