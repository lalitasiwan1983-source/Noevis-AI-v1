export type SaveStatus = 'idle' | 'saving' | 'saved';

export interface DeskNote {
  id: string;
  title: string;
  content: string;
  lastSavedAt?: string;
  topic: string;
  chapter: string;
  conceptName?: string;
  conceptIndex?: number;
}

export interface QuickInsertAction {
  id: string;
  label: string;
  iconName?: string;
  snippet: string;
}
