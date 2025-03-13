import supabase from './client';
import { User } from '../../types/supabase';

export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error: any) {
    throw new Error(error.message || 'Error signing up');
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error: any) {
    throw new Error(error.message || 'Error signing in');
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Error signing out');
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message || 'Error resetting password');
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error: any) {
    throw new Error(error.message || 'Error getting current user');
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
) => {
  try {
    // First check if the user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId);
    
    if (checkError) throw checkError;
    
    // If user doesn't exist, create a new record
    if (!existingUser || existingUser.length === 0) {
      // Get auth user data to create a complete profile
      const { data: authUser } = await supabase.auth.getUser();
      
      if (!authUser || !authUser.user) {
        throw new Error('Cannot find auth user data');
      }
      
      // Create a new user profile with the updates
      const newUser: Partial<User> = {
        id: userId,
        email: authUser.user.email || '',
        created_at: authUser.user.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        full_name: authUser.user.user_metadata?.full_name || null,
        avatar_url: authUser.user.user_metadata?.avatar_url || null,
        preferences: null,
        time_zone: null,
        last_login: new Date().toISOString(),
        ...updates // Apply the updates to the new user
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([newUser])
        .select();
      
      if (insertError) throw insertError;
      return insertData?.[0] || newUser;
    }
    
    // User exists, update the record
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();

    if (error) throw error;
    return data?.[0] || updates;
  } catch (error: any) {
    throw new Error(error.message || 'Error updating user profile');
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error: any) {
    throw new Error(error.message || 'Error getting session');
  }
}; 