import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Content = Database['public']['Tables']['contents']['Row'];

export async function createContent(data: { content: string; sequence_order: number | null; topic_id: string }) {
  const { error } = await supabase.from('contents').insert(data);
  if (error) throw error;
}

export async function updateContent(id: string, data: { content: string; sequence_order: number | null }) {
  const { error } = await supabase.from('contents').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteContent(id: string) {
  const { error } = await supabase.from('contents').delete().eq('id', id);
  if (error) throw error;
}

export function getOptimisticContent(data: { content: string; sequence_order: number | null; topic_id: string }): Content {
  return {
    id: crypto.randomUUID(),
    content: data.content,
    sequence_order: data.sequence_order,
    topic_id: data.topic_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}