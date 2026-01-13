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
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ResultsRouteProp = RouteProp<RootStackParamList, 'Results'>;

export default function ResultsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultsRouteProp>();
  const { colors } = useTheme();
  const { disease, severity, imageUri, recommendations, affectedParts, isPlant, message } = route.params;

  const getSeverityColor = () => {
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.gradient} style={styles.header}>
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
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {!isPlant && (
            <View style={styles.warningBanner}>
              <Ionicons name="warning" size={24} color={colors.warning} />
              <Text style={[styles.warningText, { color: colors.warning }]}>Not a plant detected</Text>
            </View>
          )}
          <Text style={[styles.plantName, { color: colors.text }]}>Analysis Result</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
          <View style={styles.diseaseContainer}>
            <Text style={[styles.diseaseLabel, { color: colors.textSecondary }]}>Disease: </Text>
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
          {affectedParts && affectedParts.length > 0 && (
            <View style={styles.affectedPartsContainer}>
              <Text style={[styles.affectedPartsLabel, { color: colors.textSecondary }]}>Affected Parts: </Text>
              <Text style={[styles.affectedPartsText, { color: colors.text }]}>
                {affectedParts.join(', ')}
              </Text>
            </View>
          )}
        </View>

        {/* Symptoms */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Affected Parts</Text>
          {affectedParts && affectedParts.map((part: string, index: number) => (
            <View key={index} style={styles.symptomItem}>
              <Text style={styles.bulletPoint}>🍃</Text>
              <Text style={[styles.symptomText, { color: colors.textSecondary }]}>{part}</Text>
            </View>
          ))}
        </View>

        {/* Treatment */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.treatmentHeader}>
            <Ionicons name="medical" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommendations</Text>
          </View>
          {recommendations && recommendations.map((recommendation: string, index: number) => (
            <View key={index} style={styles.recommendationItem}>
              <Text style={[styles.recommendationNumber, { color: colors.primary }]}>{index + 1}.</Text>
              <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>{recommendation}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Library' } as any)}
          >
            <Ionicons name="library" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>View Library</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.primary }]}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Ionicons name="home" size={20} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Go Home</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={[styles.homeButtonText, { color: colors.textSecondary }]}>Back to Home</Text>
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
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  warningText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
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
  affectedPartsContainer: {
    marginTop: 10,
  },
  affectedPartsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  affectedPartsText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    textTransform: 'capitalize',
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
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 5,
  },
  recommendationNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
    minWidth: 20,
  },
  recommendationText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    flex: 1,
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
