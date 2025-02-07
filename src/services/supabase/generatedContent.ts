import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type GeneratedContent = Database['public']['Tables']['generated_contents']['Row'];

export async function getGeneratedContents() {
  const { data, error } = await supabase
    .from('generated_contents')
    .select('*, micro_learning_id(*)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createGeneratedContent(data: {
  prompt_template: string;
  parameters: Record<string, any>;
  micro_learning_id?: string;
}) {
  const { error } = await supabase
    .from('generated_contents')
    .insert({
      ...data,
      created_by: '4fb47a3f-1013-4b98-9559-07387f29f52e', // Replace with actual user ID from auth
    });
  if (error) throw error;
}

export async function deleteGeneratedContent(id: string) {
  const { error } = await supabase
    .from('generated_contents')
    .delete()
    .eq('id', id);
  if (error) throw error;
}