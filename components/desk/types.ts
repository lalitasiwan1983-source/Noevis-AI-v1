export type DeskWorkspaceMode = 'learn' | 'practice' | 'quiz' | 'review' | 'notes' | 'more';

export type DeskToolType = 'learn' | 'practice' | 'quiz' | 'flashcards' | 'summary' | 'review' | 'notes';

export interface DeskTab {
  id: string;
  title: string;
  toolType: DeskToolType | 'empty';
  contextName?: string;
}

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
  activeMode?: DeskWorkspaceMode;
}

