import { LearnConceptData } from './types';

export const LEARN_CONCEPTS: LearnConceptData[] = [
  {
    id: 'c_001_structural_placeholder',
    index: 1,
    topic: 'Topic Name',
    chapter: 'Chapter Title',
    title: 'Concept / Lesson Title',
    subtitle: 'A brief contextual subtitle explaining the core objective of this specific learning block.',
    estimatedTime: '5 min',
    difficulty: 'Intermediate',
    whyItMatters: {
      headline: 'The Core Objective',
      description: 'This area explains the real-world or theoretical significance of the concept before diving into the mechanics. It establishes the "why" for the learner.',
      keyMetric: 'Metric',
      metricLabel: 'Data Point Label',
    },
    simpleExplanation: {
      coreIntuition: 'This section contains the core intuition or mental model. It explains the concept in clear, direct language without jargon, setting the foundation for deeper exploration.',
      scientificEquation: 'Key Formula or Process Summary',
      analogyTitle: 'Structural Analogy Placeholder',
      analogyText: 'An interactive analogy or mental model will be placed here to bridge the gap between known concepts and new information.',
    },
    diagram: {
      title: 'Visual Understanding',
      subtitle: 'A structural map of the core process.',
      steps: [
        {
          id: 'v1',
          number: 1,
          title: 'Input / Origin',
          subtitle: 'Initial State',
          detail: 'Description of the initial state or input variable.',
          highlightKey: 'ps2',
          analogy: 'Think of this as the starting raw material.',
        },
        {
          id: 'v2',
          number: 2,
          title: 'Transformation',
          subtitle: 'Core Mechanism',
          detail: 'The core process or mechanical transformation.',
          highlightKey: 'etc',
          analogy: 'This acts like the engine converting the material.',
        },
        {
          id: 'v3',
          number: 3,
          title: 'Output / Result',
          subtitle: 'Final State',
          detail: 'The resulting state or output variable.',
          highlightKey: 'atp',
          analogy: 'This is the final product ready for use.',
        },
      ]
    },
    keyTakeaways: [
      'Primary takeaway point demonstrating the first critical principle.',
      'Secondary takeaway point explaining the condition or constraint.',
      'Tertiary takeaway point summarizing the outcome or application.',
      'Final structural takeaway for synthesis.'
    ],
    examTip: 'This callout box warns the learner about common misconceptions, frequent errors, or specific nuances often tested.',
    quickCheck: {
      question: 'Adaptive Quick Check: What is the primary function of the mechanism described above?',
      prompt: 'Select the option that best describes the main transformation:',
      hint: 'Recall the relationship between the input variables and final output in step 3.',
      options: [
        { id: 'q1_a', text: 'Incorrect distractor based on a common misconception.', isCorrect: false, explanation: 'This addresses why the misconception is false.' },
        { id: 'q1_b', text: 'Correct answer synthesizing the core intuition.', isCorrect: true, explanation: 'Correct. This demonstrates accurate understanding of the process.' },
        { id: 'q1_c', text: 'Plausible but incomplete answer.', isCorrect: false, explanation: 'While partially true, it misses the main transformation.' },
      ]
    }
  }
];