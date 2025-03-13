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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { resetPassword, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }

    try {
      setFormError(null);
      await resetPassword(email);
      setSuccess(true);
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
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Reset Password</Text>
          
          {success ? (
            <View style={styles.successContainer}>
              <Text style={[styles.successText, { color: theme.success }]}>
                Password reset instructions have been sent to your email.
              </Text>
              <Button
                onPress={() => router.push('/')}
                style={styles.backButton}
                mode="outlined"
              >
                Back to Login
              </Button>
            </View>
          ) : (
            <>
              <Text style={[styles.subtitle, { color: theme.text + 'CC' }]}>
                Enter your email address and we'll send you instructions to reset your password.
              </Text>
              
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

              <Button
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={styles.resetButton}
              >
                Send Reset Instructions
              </Button>

              <TouchableOpacity 
                onPress={() => router.push('/')}
                style={styles.backContainer}
              >
                <Text style={[styles.backText, { color: theme.primary }]}>
                  Back to Login
                </Text>
              </TouchableOpacity>
            </>
          )}
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
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.md,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: Layout.spacing.lg,
  },
  errorText: {
    marginBottom: Layout.spacing.md,
    fontSize: 14,
  },
  resetButton: {
    marginTop: Layout.spacing.md,
  },
  backContainer: {
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
  },
  backText: {
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: Layout.spacing.lg,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  backButton: {
    marginTop: Layout.spacing.md,
  },
}); 