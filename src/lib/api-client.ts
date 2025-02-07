import { supabase } from './supabase';
import { getCurrentUser } from './auth';

class APIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const apiClient = {
  async get<T>(path: string, options?: { params?: Record<string, any> }) {
    const user = await getCurrentUser();
    if (!user) throw new APIError('Unauthorized', 'AUTH_REQUIRED');

    const { data, error } = await supabase
      .from(path)
      .select(options?.params?.select || '*');

    if (error) throw new APIError(error.message, error.code);
    return data as T;
  },

  async post<T>(path: string, data: any) {
    const user = await getCurrentUser();
    if (!user) throw new APIError('Unauthorized', 'AUTH_REQUIRED');

    const { error } = await supabase
      .from(path)
      .insert({ ...data, created_by: user.id });

    if (error) throw new APIError(error.message, error.code);
    return data as T;
  },

  async put<T>(path: string, id: string, data: any) {
    const user = await getCurrentUser();
    if (!user) throw new APIError('Unauthorized', 'AUTH_REQUIRED');

    const { error } = await supabase
      .from(path)
      .update(data)
      .eq('id', id);

    if (error) throw new APIError(error.message, error.code);
    return data as T;
  },

  async delete(path: string, id: string) {
    const user = await getCurrentUser();
    if (!user) throw new APIError('Unauthorized', 'AUTH_REQUIRED');

    const { error } = await supabase
      .from(path)
      .delete()
      .eq('id', id);

    if (error) throw new APIError(error.message, error.code);
  }
};