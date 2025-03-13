import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { signIn, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      setFormError(null);
      await signIn(email, password);
      router.replace('/(main)');
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
        <View style={styles.logoContainer}>
          <Text style={[styles.appName, { color: theme.text }]}>DeepWork AI</Text>
          <Text style={[styles.tagline, { color: theme.text + 'CC' }]}>
            Focus better. Achieve more.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
          
          {formError && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {formError}
            </Text>
          )}

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
            placeholder="Your password"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgot-password')}
            style={styles.forgotPasswordContainer}
          >
            <Text style={[styles.forgotPassword, { color: theme.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
          >
            Log In
          </Button>

          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, { color: theme.text }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={[styles.signupLink, { color: theme.primary }]}>
                Sign Up
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
  logoContainer: {
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.lg,
  },
  forgotPassword: {
    fontSize: 14,
  },
  loginButton: {
    marginBottom: Layout.spacing.lg,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.md,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 