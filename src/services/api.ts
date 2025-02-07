// src/services/api.ts
import axios from 'axios';
import { supabase } from './supabase';

export const api = {
  // Supabase client for direct database access
  supabase,
  
  // HTTP client for Supabase RPC calls
  rpc: axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc`,
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    }
  }),

  // HTTP client for your custom backend (Express)
  backend: axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api', // Ajusta la URL base
    headers: {
      'Content-Type': 'application/json'
    }
  })
};