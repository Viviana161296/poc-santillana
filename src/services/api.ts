import axios from 'axios';
import { supabase } from './supabase';

export const api = {
  // Supabase client for direct database access
  supabase,
  
  // HTTP client for RPC calls
  rpc: axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc`,
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    }
  })
};