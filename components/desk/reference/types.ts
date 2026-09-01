export type ReferenceSourceType = 'file' | 'text' | 'link' | 'youtube' | 'photo';

export type ReferenceViewStatus = 'loaded' | 'empty' | 'loading' | 'error';

export interface ReferenceData {
  sourceType: ReferenceSourceType;
  sourceTitle: string;
  sourceOrigin?: string;
  sectionLocator?: string;
  timestamp?: string;
  excerpt?: string;
  keyPoints?: string[];
  lastUpdated?: string;
}
