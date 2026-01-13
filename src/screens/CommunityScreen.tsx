import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommunityScreen() {
  const posts = [
    {
      id: 1,
      user: 'Sarah M.',
      time: '2h ago',
      content: 'Just identified a pest on my tomatoes! The app helped me catch it early. 🍅',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      user: 'Mike K.',
      time: '5h ago',
      content: 'Any tips for dealing with leaf curl on maize plants?',
      likes: 18,
      comments: 12,
    },
    {
      id: 3,
      user: 'Emma L.',
      time: '1d ago',
      content: 'The offline mode is a lifesaver! I can scan plants even in remote areas.',
      likes: 45,
      comments: 8,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.headerTitle}>Community Forum</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Create Post Button */}
        <TouchableOpacity style={styles.createPostButton}>
          <Ionicons name="add-circle" size={24} color="#4CAF50" />
          <Text style={styles.createPostText}>Share your experience...</Text>
        </TouchableOpacity>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#4CAF50" />
              </View>
              <View style={styles.postUserInfo}>
                <Text style={styles.postUser}>{post.user}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={20} color="#666" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#666" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Additional Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>More Features</Text>
          
          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="search-circle" size={32} color="#4CAF50" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Symptom Checker</Text>
              <Text style={styles.featureDescription}>
                Identify plant issues by symptoms
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="cloud-offline" size={32} color="#2196F3" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Offline Access</Text>
              <Text style={styles.featureDescription}>
                Use the app without internet
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
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
  searchButton: {
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
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  createPostText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#999',
  },
  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
});
