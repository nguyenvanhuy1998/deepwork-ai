import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import useAuth from '../../../hooks/useAuth';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, signOut } = useAuth();

  // Mock settings state
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    vibration: true,
    theme: 'system',
    focusDuration: 25,
    breakDuration: 5,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by the auth state change in _layout.tsx
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const renderSettingItem = (
    icon: string, 
    title: string, 
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void,
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={22} color={theme.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: theme.text + 'CC' }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        onPress && <Ionicons name="chevron-forward" size={20} color={theme.text + '66'} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View 
              style={[
                styles.profileAvatar, 
                { backgroundColor: theme.primary + '22' }
              ]}
            >
              <Text style={[styles.profileInitials, { color: theme.primary }]}>
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                {user?.full_name || 'User'}
              </Text>
              <Text style={[styles.profileEmail, { color: theme.text + 'CC' }]}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={() => router.push('settings/profile')}
            style={styles.editProfileButton}
          >
            Edit Profile
          </Button>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            App Settings
          </Text>
          <Card style={styles.settingsCard}>
            {renderSettingItem(
              'notifications-outline',
              'Notifications',
              'Receive reminders and updates',
              <Switch
                value={settings.notifications}
                onValueChange={(value) => 
                  setSettings({...settings, notifications: value})
                }
                trackColor={{ false: theme.border, true: theme.primary + '88' }}
                thumbColor={settings.notifications ? theme.primary : theme.card}
              />
            )}
            {renderSettingItem(
              'volume-medium-outline',
              'Sounds',
              'Play sounds during focus sessions',
              <Switch
                value={settings.sounds}
                onValueChange={(value) => 
                  setSettings({...settings, sounds: value})
                }
                trackColor={{ false: theme.border, true: theme.primary + '88' }}
                thumbColor={settings.sounds ? theme.primary : theme.card}
              />
            )}
            {renderSettingItem(
              'phone-portrait-outline',
              'Vibration',
              'Vibrate on notifications and timers',
              <Switch
                value={settings.vibration}
                onValueChange={(value) => 
                  setSettings({...settings, vibration: value})
                }
                trackColor={{ false: theme.border, true: theme.primary + '88' }}
                thumbColor={settings.vibration ? theme.primary : theme.card}
              />
            )}
            {renderSettingItem(
              'color-palette-outline',
              'Theme',
              'Change app appearance',
              <Text style={[styles.settingValue, { color: theme.primary }]}>
                {settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}
              </Text>,
              () => router.push('settings/preferences')
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Focus Settings
          </Text>
          <Card style={styles.settingsCard}>
            {renderSettingItem(
              'timer-outline',
              'Focus Duration',
              'Default session length',
              <Text style={[styles.settingValue, { color: theme.primary }]}>
                {settings.focusDuration} min
              </Text>,
              () => router.push('settings/preferences')
            )}
            {renderSettingItem(
              'cafe-outline',
              'Break Duration',
              'Time between focus sessions',
              <Text style={[styles.settingValue, { color: theme.primary }]}>
                {settings.breakDuration} min
              </Text>,
              () => router.push('settings/preferences')
            )}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            About
          </Text>
          <Card style={styles.settingsCard}>
            {renderSettingItem(
              'information-circle-outline',
              'App Version',
              'Current version of the app',
              <Text style={[styles.settingValue, { color: theme.text + '99' }]}>
                1.0.0
              </Text>
            )}
            {renderSettingItem(
              'help-circle-outline',
              'Help & Support',
              'Get assistance with the app',
              undefined,
              () => {}
            )}
            {renderSettingItem(
              'document-text-outline',
              'Terms of Service',
              'Read our terms and conditions',
              undefined,
              () => {}
            )}
            {renderSettingItem(
              'shield-outline',
              'Privacy Policy',
              'How we handle your data',
              undefined,
              () => {}
            )}
          </Card>
        </View>

        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
          color={theme.error}
        >
          Sign Out
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl + 20, // Extra padding for status bar
    paddingBottom: Layout.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  profileCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  profileEmail: {
    fontSize: 14,
  },
  editProfileButton: {
    marginTop: Layout.spacing.xs,
  },
  section: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Layout.spacing.sm,
    marginLeft: Layout.spacing.xs,
  },
  settingsCard: {
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#00000011',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  signOutButton: {
    marginVertical: Layout.spacing.xl,
  },
}); 