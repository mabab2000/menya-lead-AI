import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ResultsRouteProp = RouteProp<RootStackParamList, 'Results'>;

export default function ResultsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultsRouteProp>();
  const { plantName, disease, severity, imageUri } = route.params;

  const getSeverityColor = () => {
    switch (severity) {
      case 'High':
        return '#F44336';
      case 'Medium':
        return '#FF9800';
      case 'Low':
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  const getDiseaseInfo = () => {
    // Sample disease information
    const diseaseData: any = {
      'Leaf Blight': {
        symptoms: ['Brown spots', 'Yellowing'],
        treatment: 'Apply fungicide and remove affected leaves. Ensure proper spacing for air circulation.',
      },
      'Early Blight': {
        symptoms: ['Dark spots', 'Target-like patterns', 'Leaf yellowing'],
        treatment: 'Use copper-based fungicides. Remove infected leaves and maintain proper plant spacing.',
      },
      'Brown Spot': {
        symptoms: ['Brown lesions', 'Oval spots', 'Yellow halo'],
        treatment: 'Apply recommended fungicides and improve drainage. Use resistant varieties if available.',
      },
    };

    return diseaseData[disease] || {
      symptoms: ['Leaf discoloration', 'Spots on leaves'],
      treatment: 'Consult with an agricultural expert for specific treatment recommendations.',
    };
  };

  const info = getDiseaseInfo();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image */}
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        {/* Plant Info */}
        <View style={styles.card}>
          <Text style={styles.plantName}>{plantName}</Text>
          <View style={styles.diseaseContainer}>
            <Text style={styles.diseaseLabel}>Disease: </Text>
            <Text style={[styles.disease, { color: getSeverityColor() }]}>
              {disease}
            </Text>
          </View>
          <View style={styles.severityContainer}>
            <Text style={styles.severityLabel}>Severity: </Text>
            <View
              style={[
                styles.severityBadge,
                { backgroundColor: getSeverityColor() },
              ]}
            >
              <Text style={styles.severityText}>{severity}</Text>
            </View>
          </View>
        </View>

        {/* Symptoms */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          {info.symptoms.map((symptom: string, index: number) => (
            <View key={index} style={styles.symptomItem}>
              <Text style={styles.bulletPoint}>🍃</Text>
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
        </View>

        {/* Treatment */}
        <View style={styles.card}>
          <View style={styles.treatmentHeader}>
            <Ionicons name="medical" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Treatment</Text>
          </View>
          <Text style={styles.treatmentText}>{info.treatment}</Text>
        </View>

        {/* Care Tips */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Care Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="water" size={20} color="#2196F3" />
            <Text style={styles.tipText}>
              Water regularly but avoid over-watering
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="sunny" size={20} color="#FFC107" />
            <Text style={styles.tipText}>
              Ensure adequate sunlight exposure
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="leaf" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>
              Remove infected leaves promptly
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Save to History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="person" size={20} color="#4CAF50" />
            <Text style={styles.secondaryButtonText}>Ask an Expert</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  shareButton: {
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
  imageContainer: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  diseaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseLabel: {
    fontSize: 16,
    color: '#666',
  },
  disease: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginLeft: 8,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 10,
  },
  symptomText: {
    fontSize: 15,
    color: '#555',
    flex: 1,
  },
  treatmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  treatmentText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    marginRight: 10,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  homeButton: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  homeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});
