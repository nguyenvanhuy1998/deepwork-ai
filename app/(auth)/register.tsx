import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { signUp, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      setFormError(null);
      await signUp(email, password, fullName);
      router.replace('/');
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.appName, { color: theme.text }]}>DeepWork AI</Text>
          <Text style={[styles.tagline, { color: theme.text + 'CC' }]}>
            Focus better. Achieve more.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
          
          {formError && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {formError}
            </Text>
          )}

          <Input
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
            autoCapitalize="words"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />

          <Button
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.registerButton}
          >
            Sign Up
          </Button>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: theme.text }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={[styles.loginLink, { color: theme.primary }]}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Layout.spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.xs,
  },
  tagline: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.lg,
  },
  errorText: {
    marginBottom: Layout.spacing.md,
    fontSize: 14,
  },
  registerButton: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.md,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 