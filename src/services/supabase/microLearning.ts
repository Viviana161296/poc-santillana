import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type MicroLearning = Database['public']['Tables']['micro_learnings']['Row'];

export async function getMicroLearnings() {
  const { data, error } = await supabase
    .from('micro_learnings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createMicroLearning(data: Omit<MicroLearning, 'id' | 'created_at' | 'updated_at'>) {
  const { error } = await supabase.from('micro_learnings').insert(data);
  if (error) throw error;
}

export async function updateMicroLearning(id: string, data: Partial<MicroLearning>) {
  const { error } = await supabase.from('micro_learnings').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteMicroLearning(id: string) {
  const { error } = await supabase.from('micro_learnings').delete().eq('id', id);
  if (error) throw error;
}