import { createContext, useContext } from 'react';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};