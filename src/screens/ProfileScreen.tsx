import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

  const handleMyScans = () => {
    navigation.navigate('MainTabs', { screen: 'Library' } as any);
  };

  const handleAskExpert = () => {
    Alert.alert(
      'Ask an Expert',
      'Contact our agricultural experts for personalized advice.',
      [
        {
          text: 'Email',
          onPress: () => Linking.openURL('mailto:expert@menyaleaf.com'),
        },
        {
          text: 'Phone',
          onPress: () => Linking.openURL('tel:+1234567890'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      !notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'
    );
  };

  const handleOfflineModeToggle = () => {
    setOfflineModeEnabled(!offlineModeEnabled);
    Alert.alert(
      'Offline Mode',
      !offlineModeEnabled
        ? 'Offline mode enabled. You can now use the app without internet.'
        : 'Offline mode disabled.'
    );
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Logged Out', 'You have been logged out successfully.');
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your scan history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllScans();
              Alert.alert('Success', 'All scan data has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ]
    );
  };

  const settings = [
    { 
      id: 1, 
      title: 'My Scans', 
      icon: 'document-text-outline', 
      onPress: handleMyScans 
    },
    { 
      id: 2, 
      title: 'Ask an Expert', 
      icon: 'help-circle-outline', 
      onPress: handleAskExpert 
    },
    { 
      id: 3, 
      title: 'Notifications', 
      icon: 'notifications-outline', 
      toggle: true, 
      enabled: notificationsEnabled,
      onPress: handleNotificationsToggle 
    },
    { 
      id: 4, 
      title: 'Offline Mode', 
      icon: 'cloud-offline-outline', 
      toggle: true, 
      enabled: offlineModeEnabled,
      onPress: handleOfflineModeToggle 
    },
    { 
      id: 5, 
      title: 'Dark Mode', 
      icon: 'moon-outline', 
      toggle: true, 
      enabled: isDarkMode,
      onPress: handleDarkModeToggle 
    },
    { 
      id: 6, 
      title: 'Clear All Data', 
      icon: 'trash-outline', 
      onPress: handleClearData,
      danger: true 
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={colors.gradient} style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Card Removed */}

        {/* Settings List */}
        <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}>
          {settings.map((setting) => (
            <TouchableOpacity 
              key={setting.id} 
              style={[styles.settingItem, { borderBottomColor: colors.border }]}
              onPress={setting.onPress}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, setting.danger && styles.iconContainerDanger, { backgroundColor: isDarkMode ? colors.surface : (setting.danger ? '#FFEBEE' : '#E8F5E9') }]}>
                  <Ionicons 
                    name={setting.icon as any} 
                    size={24} 
                    color={setting.danger ? colors.error : colors.primary} 
                  />
                </View>
                <Text style={[styles.settingTitle, { color: setting.danger ? colors.error : colors.text }]}>
                  {setting.title}
                </Text>
              </View>
              {setting.toggle ? (
                <View
                  style={[
                    styles.toggle,
                    setting.enabled && { backgroundColor: colors.primary },
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
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.surface, borderColor: colors.error }]} onPress={handleLogout}>
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
    paddingTop: 20,
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
  settingTitleDanger: {
    color: '#F44336',
  },
  iconContainerDanger: {
    backgroundColor: '#FFEBEE',
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
