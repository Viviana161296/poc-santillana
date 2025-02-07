// src/services/ai.ts
import { api } from './api';
import type { GenerationParams, GeneratedContent } from '../types/ai';

export const aiService = {
  async generateContent(params: GenerationParams): Promise<GeneratedContent> {
    console.log('ai service but?');
    
    const { data } = await api.backend.post('/generate_content', {
      p_topic: params.topic,
      p_type: params.type,
      p_skill_level: params.skillLevel,
      p_parameters: params.parameters
    });
    const { data2 } = await api.rpc.post('/generate_content', {
      p_topic: params.topic,
      p_type: params.type,
      p_skill_level: params.skillLevel,
      p_parameters: params.parameters
    });
    console.log(data);

    // Transformar la respuesta de la API al tipo GeneratedContent
    const generatedContent: GeneratedContent = {
      id: data.id,
      userId: data.userId,
      promptId: data.promptId,
      promptName: data.promptName,
      inputParameters: data.inputParameters,
      generatedText: data.generatedText,
      status: data.status,
      errorMessage: data.errorMessage,
      createdAt: data.createdAt,
      content: {
        completion: data.content.completion, // Asegúrate de mapear correctamente
      },
    };

    return generatedContent;
  },

  async getGenerationHistory(): Promise<GeneratedContent[]> {
    const { data, error } = await api.supabase
      .from('generated_contents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;

    // Transformar la respuesta de Supabase al tipo GeneratedContent
    const generatedContents: GeneratedContent[] = data.map((item: any) => ({
      id: item.id,
      userId: item.userId,
      promptId: item.promptId,
      promptName: item.promptName,
      inputParameters: item.inputParameters,
      generatedText: item.generatedText,
      status: item.status,
      errorMessage: item.errorMessage,
      createdAt: item.createdAt,
      completion: item.completion
    }));

    return generatedContents;
  }
};