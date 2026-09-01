import React from 'react';

export type MoreToolId =
  | 'summary'
  | 'key_ideas'
  | 'examples'
  | 'study_aid'
  | 'reference'
  | 'ask_noevis';

export interface MoreToolItem {
  id: MoreToolId;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isDeskTool?: boolean;
}
