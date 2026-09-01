export type LearningState = 'needs_attention' | 'developing' | 'strong';

export interface ReviewConceptItem {
  id: string;
  conceptIndex: number;
  conceptName: string;
  topicTitle: string;
  chapterTitle: string;
  state: LearningState;
  reason?: string;
  actionLabel: string;
  simplifiedSummary: string;
  coreMechanismTip: string;
  quickCheckQuestion: {
    prompt: string;
    options: {
      id: string;
      letter: string;
      text: string;
      isCorrect: boolean;
    }[];
    explanation: string;
  };
}

export interface ReviewStateSummary {
  needsAttentionCount: number;
  developingCount: number;
  strongCount: number;
}
