export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: DifficultyLevel;
  points: number;
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples?: string[];
  details?: string;
  references?: { title: string; url: string }[];
}

export interface PlayerScore {
  id: string;
  player_name: string;
  score: number;
  created_at: string;
}
