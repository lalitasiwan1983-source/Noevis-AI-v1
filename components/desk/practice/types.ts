export type PracticeTaskType = 'sequence' | 'visual-hotspot' | 'scenario' | 'matching';

export interface SequenceItem {
  id: string;
  label: string;
  detail: string;
  correctOrder: number;
}

export interface HotspotTarget {
  id: string;
  stageName: string;
  slotLabel: string;
  correctTokenId: string;
  hint: string;
}

export interface HotspotToken {
  id: string;
  label: string;
  formula?: string;
  category: 'input' | 'intermediate' | 'product' | 'acceptor';
}

export interface ScenarioOption {
  id: string;
  letter: string;
  title: string;
  description: string;
  isCorrect: boolean;
  feedback: string;
}

export interface MatchingPair {
  id: string;
  source: string;
  target: string;
  hint: string;
}

export interface PracticeTask {
  id: string;
  conceptIndex: number;
  conceptTitle: string;
  topic: string;
  chapter: string;
  taskType: PracticeTaskType;
  typeBadge: string;
  title: string;
  instruction: string;
  contextPill: string;
  estimatedTime: string;
  hint: string;
  whyExplanation: {
    coreInsight: string;
    connectionToLearn: string;
    scientificMechanism: string;
  };
  // Specific payloads
  sequenceData?: {
    items: SequenceItem[];
    startLabel: string;
    endLabel: string;
  };
  hotspotData?: {
    diagramTitle: string;
    diagramSubtitle: string;
    targets: HotspotTarget[];
    tokens: HotspotToken[];
  };
  scenarioData?: {
    story: string;
    question: string;
    options: ScenarioOption[];
  };
  matchingData?: {
    leftTitle: string;
    rightTitle: string;
    pairs: MatchingPair[];
  };
}
