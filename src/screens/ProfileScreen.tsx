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
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: require('../../assets/avatar.jpg'),
  };

  const settings = [
    { id: 1, title: 'My Scans', icon: 'document-text-outline', value: '' },
    { id: 2, title: 'Ask an Expert', icon: 'help-circle-outline', value: 'English' },
    { id: 3, title: 'Notifications', icon: 'notifications-outline', value: '', toggle: true, enabled: true },
    { id: 4, title: 'Offline Mode', icon: 'cloud-offline-outline', value: '', toggle: true, enabled: false },
    { id: 5, title: 'Dark Mode', icon: 'moon-outline', value: '', toggle: true, enabled: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.headerTitle}>Profile / Settings</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile */}
        <View style={styles.profileCard}>
          <Image source={user.avatar} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <View style={styles.settingsSection}>
          {settings.map((setting) => (
            <TouchableOpacity key={setting.id} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name={setting.icon as any} size={24} color="#4CAF50" />
                </View>
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              {setting.toggle ? (
                <View
                  style={[
                    styles.toggle,
                    setting.enabled && styles.toggleActive,
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      setting.enabled && styles.toggleThumbActive,
                    ]}
                  />
                </View>
              ) : (
                <View style={styles.settingRight}>
                  {setting.value && (
                    <Text style={styles.settingValue}>{setting.value}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
  },
});
