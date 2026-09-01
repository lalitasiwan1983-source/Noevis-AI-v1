export type QuizQuestionType = 'single-choice' | 'multi-select' | 'true-false' | 'conceptual-choice';

export interface QuizOption {
  id: string;
  letter: string;
  text: string;
  detail?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  conceptTag: string;
  conceptIndex: number;
  type: QuizQuestionType;
  typeBadge: string;
  prompt: string;
  contextSnippet?: string;
  contextFormula?: string;
  options: QuizOption[];
  explanation: {
    corePrinciple: string;
    whyCorrect: string;
    conceptAnchor: string;
    conceptIndex: number;
  };
}

export interface QuizResultSummary {
  score: number;
  totalQuestions: number;
  percentage: number;
  masteredConcepts: Array<{ name: string; conceptIndex: number }>;
  reviewConcepts: Array<{ name: string; conceptIndex: number; countWrong: number }>;
  noevisInsight: string;
}
