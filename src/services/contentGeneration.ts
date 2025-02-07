import axios from 'axios';

const API_URL = '/api/content';

interface GenerationParams {
  topic: string;
  type: 'exercise' | 'explanation' | 'quiz';
  skillLevel: 'basic' | 'intermediate' | 'advanced';
  parameters?: {
    questionCount?: number;
    temperature?: number;
    maxTokens?: number;
  };
}

interface SaveContentParams {
  title: string;
  content: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  skillLevel: 'basic' | 'intermediate' | 'advanced';
}

console.log(API_URL);

export async function generateContent(params: GenerationParams) {
  const { data } = await axios.post(`${API_URL}/generate_content`, params);
  return data;
}

export async function saveContent(params: SaveContentParams) {
  const { data } = await axios.post(`${API_URL}/save`, params);
  return data;
}