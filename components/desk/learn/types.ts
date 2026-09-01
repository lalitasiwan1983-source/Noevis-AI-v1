export interface DiagramStep {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  detail: string;
  highlightKey: string;
  analogy: string;
}

export interface QuickCheckOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuickCheckQuestion {
  question: string;
  prompt: string;
  options: QuickCheckOption[];
  hint: string;
}

export interface LearnConceptData {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  topic: string;
  chapter: string;
  estimatedTime: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  whyItMatters: {
    headline: string;
    description: string;
    keyMetric: string;
    metricLabel: string;
  };
  simpleExplanation: {
    coreIntuition: string;
    analogyTitle: string;
    analogyText: string;
    scientificEquation?: string;
  };
  diagram: {
    title: string;
    subtitle: string;
    steps: DiagramStep[];
  };
  keyTakeaways: string[];
  examTip: string;
  quickCheck: QuickCheckQuestion;
}
