import { supabase } from './supabase';
import type { MicroLearning } from '../types/curriculum';

export const microLearningService = {
  async getAll() {
    const { data, error } = await supabase
      .from('micro_learnings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('micro_learnings')
      .select(`
        *,
        content_mappings (
          content (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(data: Omit<MicroLearning, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data: created, error } = await supabase
      .from('micro_learnings')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return created;
  },

  async update(id: number, data: Partial<MicroLearning>) {
    const { data: updated, error } = await supabase
      .from('micro_learnings')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updated;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('micro_learnings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};