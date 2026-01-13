import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ApiService } from '../services/api';
import { StorageService, AnalysisResult } from '../services/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userName] = useState('John');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastScan, setLastScan] = useState<AnalysisResult | null>(null);

  const loadLastScan = async () => {
    try {
      const scans = await StorageService.getAllScans();
      if (scans.length > 0) {
        setLastScan(scans[0]);
      }
    } catch (error) {
      console.error('Error loading last scan:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLastScan();
    }, [])
  );

  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is needed to take pictures');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      analyzePlant(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images' as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      analyzePlant(result.assets[0].uri);
    }
  };

  const analyzePlant = async (imageUri: string) => {
    setIsProcessing(true);
    
    try {
      const apiResponse = await ApiService.analyzeImage(imageUri);
      
      const scanResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        imageUri,
        isPlant: apiResponse.is_plant,
        message: apiResponse.message,
        disease: apiResponse.disease,
        severity: apiResponse.severity,
        recommendations: apiResponse.recommendations,
        affectedParts: apiResponse.affected_parts,
      };
      
      await StorageService.saveScan(scanResult);
      setLastScan(scanResult);
      setIsProcessing(false);
      
      navigation.navigate('Results', {
        disease: apiResponse.disease,
        severity: apiResponse.severity,
        imageUri,
        recommendations: apiResponse.recommendations,
        affectedParts: apiResponse.affected_parts,
        isPlant: apiResponse.is_plant,
        message: apiResponse.message,
      });
    } catch (error) {
      setIsProcessing(false);
      Alert.alert(
        'Analysis Failed',
        'Failed to analyze the image. Please check your internet connection and try again.'
      );
    }
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
        {/* Upload/Take Picture Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analyze a Plant</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={takePicture}
              disabled={isProcessing}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.actionGradient}
              >
                <Ionicons name="camera" size={40} color="#fff" />
                <Text style={styles.actionCardTitle}>Take Picture</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={pickImage}
              disabled={isProcessing}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.actionGradient}
              >
                <Ionicons name="cloud-upload-outline" size={40} color="#fff" />
                <Text style={styles.actionCardTitle}>Upload Image</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Processing Indicator */}
        {isProcessing && (
          <View style={styles.section}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Analyzing plant...</Text>
            </View>
          </View>
        )}

        {/* Last Analyzed Image */}
        {lastScan && !isProcessing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last Analysis</Text>
            <TouchableOpacity
              style={styles.lastScanCard}
              onPress={() =>
                navigation.navigate('Results', {
                  disease: lastScan.disease,
                  severity: lastScan.severity,
                  imageUri: lastScan.imageUri,
                  recommendations: lastScan.recommendations,
                  affectedParts: lastScan.affectedParts,
                  isPlant: lastScan.isPlant,
                  message: lastScan.message,
                })
              }
            >
              <Image source={{ uri: lastScan.imageUri }} style={styles.lastScanImage} />
              <View style={styles.lastScanInfo}>
                <Text style={styles.lastScanDisease} numberOfLines={1}>
                  {lastScan.disease}
                </Text>
                <View style={styles.lastScanDetails}>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(lastScan.severity) },
                    ]}
                  >
                    <Text style={styles.severityText}>{lastScan.severity}</Text>
                  </View>
                  <Text style={styles.lastScanDate}>{formatDate(lastScan.timestamp)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

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
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionCard: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  loadingCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  lastScanCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lastScanImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  lastScanInfo: {
    padding: 15,
  },
  lastScanDisease: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  lastScanDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  lastScanDate: {
    fontSize: 12,
    color: '#999',
  },
});
