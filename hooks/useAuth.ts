import { useState, useEffect } from 'react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import * as AuthService from '../services/supabase/auth';
import { User } from '../types/supabase';
import supabase from '../services/supabase/client';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const session = await AuthService.getSession();
      setSession(session);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fetch additional user data from the users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);

      if (error) throw error;
      
      // Check if we got any user data
      if (data && data.length > 0) {
        // Use the first record if multiple exist (shouldn't happen with proper RLS)
        setUser(data[0] as User);
      } else {
        // No user record found, create one
        await createUserProfile(userId);
      }
    } catch (error: any) {
      console.error('Error fetching user profile:', error.message);
      // If we can't fetch the profile, at least set the basic user info
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at || '',
          updated_at: new Date().toISOString(),
          full_name: null,
          avatar_url: null,
          preferences: null,
          time_zone: null,
          last_login: null,
        });
      }
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      if (!session?.user) return;
      
      // Create a new user profile record
      const newUser: Partial<User> = {
        id: userId,
        email: session.user.email || '',
        created_at: session.user.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        full_name: session.user.user_metadata?.full_name || null,
        avatar_url: session.user.user_metadata?.avatar_url || null,
        preferences: null,
        time_zone: null,
        last_login: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setUser(data[0] as User);
      } else {
        // Fallback to basic user info if insert didn't return data
        setUser(newUser as User);
      }
    } catch (error: any) {
      console.error('Error creating user profile:', error.message);
      // Set basic user info as fallback
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at || '',
          updated_at: new Date().toISOString(),
          full_name: null,
          avatar_url: null,
          preferences: null,
          time_zone: null,
          last_login: null,
        });
      }
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.signUp(email, password, fullName);
      // Note: We don't set the user here because the onAuthStateChange listener will handle it
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.signIn(email, password);
      // Note: We don't set the user here because the onAuthStateChange listener will handle it
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.signOut();
      setUser(null);
      setSession(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.resetPassword(email);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = await AuthService.updateUserProfile(user.id, updates);
      setUser({ ...user, ...updatedUser });
      return updatedUser;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };
} 