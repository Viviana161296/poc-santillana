import { api } from './api';
import type { AIPrompt, GenerationRequest } from '../types/ai';

export const aiPromptsService = {
  async getPrompts() {
    const { data, error } = await api.supabase
      .from('ai_prompts')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data as AIPrompt[];
  },

  async generateContent(request: GenerationRequest) {
    console.log('Generating content...');
    const { data, error } = await api.supabase
      .rpc('generate_content_with_logging', {
        p_prompt_id: request.promptId,
        p_parameters: request.parameters
      });
    
    if (error) throw error;
    return data as string;
  },

  async getGenerationLogs() {
    const { data, error } = await api.supabase
      .from('generation_logs')
      .select(`
        *,
        prompt:ai_prompts(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};