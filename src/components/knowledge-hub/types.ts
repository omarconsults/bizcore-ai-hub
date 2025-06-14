
export interface Resource {
  title: string;
  type: 'guide' | 'template' | 'video' | 'course';
  category: string;
  duration?: string;
  rating?: number;
  description: string;
  tags: string[];
  featured?: boolean;
  url?: string;
}

export interface LearningTrack {
  title: string;
  description: string;
  lessons: number;
  duration: string;
  level: string;
  progress: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
