import { api } from './api';
import type { GenerationParams, GeneratedContent } from '../types/ai';

export const aiService = {
  async generateContent(params: GenerationParams) {
    const { data } = await api.rpc.post('/generate_content', {
      p_topic: params.topic,
      p_type: params.type,
      p_skill_level: params.skillLevel,
      p_parameters: params.parameters
    });
    return data;
  },

  async getGenerationHistory() {
    const { data, error } = await api.supabase
      .from('generated_contents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as GeneratedContent[];
  }
};