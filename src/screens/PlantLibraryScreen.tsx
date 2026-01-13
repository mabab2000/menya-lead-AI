import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { StorageService, AnalysisResult } from '../services/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PlantLibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scans, setScans] = useState<AnalysisResult[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const loadScans = async () => {
    try {
      const savedScans = await StorageService.getAllScans();
      setScans(savedScans);
    } catch (error) {
      console.error('Error loading scans:', error);
      Alert.alert('Error', 'Failed to load scan history');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadScans();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadScans();
    setRefreshing(false);
  };

  const handleDeleteScan = async (id: string) => {
    Alert.alert(
      'Delete Scan',
      'Are you sure you want to delete this scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteScan(id);
              await loadScans();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete scan');
            }
          },
        },
      ]
    );
  };

  const handleViewScan = (scan: AnalysisResult) => {
    navigation.navigate('Results', {
      disease: scan.disease,
      severity: scan.severity,
      imageUri: scan.imageUri,
      recommendations: scan.recommendations,
      affectedParts: scan.affectedParts,
      isPlant: scan.isPlant,
      message: scan.message,
    });
  };

  const getSeverityColor = (severity: string) => {
    if (!severity) return '#999';
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return '#F44336';
      case 'medium':
      case 'moderate':
        return '#FF9800';
      case 'low':
      case 'mild':
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredScans = scans.filter((scan) =>
    scan.disease?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.headerTitle}>Scan History</Text>
        <View style={styles.menuButton}>
          <Ionicons name="time" size={24} color="#fff" />
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by disease..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Scans List */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredScans.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No scans yet</Text>
            <Text style={styles.emptySubtext}>
              Your scan history will appear here
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredScans.map((scan) => (
              <TouchableOpacity
                key={scan.id}
                style={styles.scanCard}
                onPress={() => handleViewScan(scan)}
              >
                <Image source={{ uri: scan.imageUri }} style={styles.scanImage} />
                <View style={styles.scanInfo}>
                  <View style={styles.scanHeader}>
                    <Text style={styles.diseaseText} numberOfLines={1}>
                      {scan.disease}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteScan(scan.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="trash-outline" size={20} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.scanDetails}>
                    <View
                      style={[
                        styles.severityBadge,
                        { backgroundColor: getSeverityColor(scan.severity) },
                      ]}
                    >
                      <Text style={styles.severityText}>{scan.severity}</Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate(scan.timestamp)}</Text>
                  </View>
                  {scan.affectedParts && scan.affectedParts.length > 0 && (
                    <Text style={styles.affectedText} numberOfLines={1}>
                      Affected: {scan.affectedParts.join(', ')}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  grid: {
    paddingHorizontal: 20,
  },
  scanCard: {
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
  scanImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  scanInfo: {
    padding: 15,
  },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  scanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  affectedText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
});
