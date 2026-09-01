import { DeskWorkspaceMode } from '../types';

export type AskNoevisStatus = 'empty' | 'thinking' | 'response' | 'error';

export interface AskNoevisMessage {
  id: string;
  sender: 'user' | 'noevis';
  text: string;
  timestamp: string;
  explanation?: string;
  keyRule?: string;
  steps?: string[];
  example?: string;
  suggestedFollowUps?: string[];
}

export interface AskNoevisContext {
  topic: string;
  chapter: string;
  currentConcept: string;
  conceptIndex?: number;
  totalConcepts?: number;
  activeMode?: DeskWorkspaceMode;
}
