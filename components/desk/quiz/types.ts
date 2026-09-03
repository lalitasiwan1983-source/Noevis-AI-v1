export interface QuizOption {
  id: string;
  letter: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  detail?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  questionNumber: number;
  conceptTag: string;
  conceptIndex: number;
  prompt: string;
  contextSnippet?: string;
  contextFormula?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  options: QuizOption[]; // exactly 4 single-select options
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
  questions: QuizQuestion[];
  userAnswers: Record<string, string>; // questionId -> selectedOptionId
}

