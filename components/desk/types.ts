export type DeskWorkspaceMode = 'learn' | 'practice' | 'quiz' | 'review' | 'notes' | 'more';

export interface DeskConcept {
  id: string;
  title: string;
  topic: string;
  chapter: string;
  conceptNumber: number;
  totalConcepts: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface DeskContextData {
  deskTitle: string;
  topic: string;
  chapter: string;
  currentConcept: string;
  conceptIndex: number;
  totalConcepts: number;
  sourceName?: string;
  sourceType?: string;
}
