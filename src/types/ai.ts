export type ContentType = 'exercise' | 'explanation' | 'quiz';
export type SkillLevel = 'basic' | 'intermediate' | 'advanced';
export type GenerationStatus = 'processing' | 'completed' | 'failed';

export interface AIPrompt {
  id: number;
  name: string;
  description: string | null;
  promptText: string;
  defaultParameters: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GenerationRequest {
  promptId: number;
  parameters: Record<string, any>;
}

export interface GenerationLog {
  id: number;
  userId: string;
  promptId: number;
  prompt: {
    name: string;
  };
  inputParameters: Record<string, any>;
  generatedContent: string | null;
  status: GenerationStatus;
  errorMessage: string | null;
  createdAt: string;
}

export interface GenerationParams {
  topic: string;
  type: ContentType;
  skillLevel: SkillLevel;
  parameters?: {
    temperature?: number;
    maxTokens?: number;
    questionCount?: number;
  };
}