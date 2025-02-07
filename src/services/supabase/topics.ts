import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Topic = Database['public']['Tables']['topics']['Row'];

export async function createTopic(data: { name: string; description: string; axis_id: string }) {
  const { error } = await supabase.from('topics').insert(data);
  if (error) throw error;
}

export async function updateTopic(id: string, data: { name: string; description: string }) {
  const { error } = await supabase.from('topics').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteTopic(id: string) {
  const { error } = await supabase.from('topics').delete().eq('id', id);
  if (error) throw error;
}

export function getOptimisticTopic(data: { name: string; description: string; axis_id: string }): Topic {
  return {
    id: crypto.randomUUID(),
    name: data.name,
    description: data.description,
    axis_id: data.axis_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}