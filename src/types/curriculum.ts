export interface ThematicAxis {
  id: number;
  name: string;
  description?: string;
  topics: Topic[];
}

export interface Topic {
  id: number;
  axisId: number;
  name: string;
  description?: string;
  contents: Content[];
}

export interface Content {
  id: number;
  topicId: number;
  content: string;
  sequenceOrder: number;
}

export interface MicroLearning {
  id: number;
  title: string;
  type: 'video' | 'text' | 'interactive' | 'quiz';
  duration?: number;
  contentUrl?: string;
  skillLevel?: 'basic' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}