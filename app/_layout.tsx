import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import useAuth from '../hooks/useAuth';

// Simple auth context to manage authentication state
export const AuthContext = React.createContext({
  signIn: async (_email: string, _password: string) => {},
  signUp: async (_email: string, _password: string, _fullName: string) => {},
  signOut: async () => {},
  user: null as any,
  loading: false,
});

// Root layout component
export default function RootLayout() {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Check if the user is authenticated and redirect accordingly
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to the login page if not authenticated
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to the main page if authenticated
      router.replace('/');
    }
  }, [user, loading, segments]);

  // Provide the auth context to the app
  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user, loading }}>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </PaperProvider>
    </AuthContext.Provider>
  );
}
