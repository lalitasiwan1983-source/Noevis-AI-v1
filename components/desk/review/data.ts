import { ReviewConceptItem } from './types';

export const REVIEW_CONCEPTS: ReviewConceptItem[] = [
  {
    id: 'rev-c1',
    conceptIndex: 2,
    conceptName: 'Calvin Cycle: Carbon Fixation & Stoichiometry',
    topicTitle: 'Biology',
    chapterTitle: 'Chapter 6: Life Processes',
    state: 'needs_attention',
    reason: 'Frequent hesitation on energetic inputs (9 ATP / 6 NADPH balance per G3P export).',
    actionLabel: 'Review this concept',
    simplifiedSummary:
      'The Calvin cycle takes place in the chloroplast stroma. To export 1 net triose sugar (G3P) for glucose assembly, RuBisCO fixes 3 molecules of CO₂, consuming exactly 9 ATP and 6 NADPH across 3 turns.',
    coreMechanismTip:
      'Remember: 3 CO₂ fixed → 6 3-PGA reduced (uses 6 ATP + 6 NADPH) → 1 G3P leaves → remaining 5 G3P regenerated into 3 RuBP (uses 3 ATP). Total input = 9 ATP & 6 NADPH.',
    quickCheckQuestion: {
      prompt: 'How many molecules of ATP and NADPH are required to produce ONE net 3-carbon sugar (G3P) in the Calvin Cycle?',
      options: [
        { id: 'opt-1', letter: 'A', text: '9 ATP and 6 NADPH', isCorrect: true },
        { id: 'opt-2', letter: 'B', text: '6 ATP and 6 NADPH', isCorrect: false },
        { id: 'opt-3', letter: 'C', text: '18 ATP and 12 NADPH', isCorrect: false },
        { id: 'opt-4', letter: 'D', text: '2 ATP and 2 NADPH', isCorrect: false },
      ],
      explanation: 'Exporting 1 net G3P requires 3 turns of the cycle, consuming 6 ATP in reduction + 3 ATP in RuBP regeneration (total 9 ATP) alongside 6 NADPH reducing equivalents.',
    },
  },
  {
    id: 'rev-c2',
    conceptIndex: 3,
    conceptName: 'Glycolysis: Net ATP Yield & Redox Balance',
    topicTitle: 'Biology',
    chapterTitle: 'Chapter 6: Life Processes',
    state: 'developing',
    reason: 'Understands glucose cleavage, but occasionally misses the difference between gross (4) and net (2) ATP yield.',
    actionLabel: 'Practice again',
    simplifiedSummary:
      'Glycolysis occurs in the cytosol without requiring oxygen. It invests 2 ATP upfront to split 1 glucose molecule, and pays back 4 ATP via substrate-level phosphorylation, leaving a net gain of 2 ATP and 2 NADH.',
    coreMechanismTip:
      'Investment Phase (-2 ATP) + Payoff Phase (+4 ATP) = +2 Net ATP + 2 Pyruvate + 2 NADH per glucose.',
    quickCheckQuestion: {
      prompt: 'Why does glycolysis yield a net gain of only 2 ATP despite generating 4 ATP in the payoff phase?',
      options: [
        { id: 'opt-1', letter: 'A', text: '2 ATP are invested during the preparatory phosphorylation phase', isCorrect: true },
        { id: 'opt-2', letter: 'B', text: '2 ATP are consumed to transport pyruvate into mitochondria', isCorrect: false },
        { id: 'opt-3', letter: 'C', text: '2 ATP are lost as thermal energy in the cytoplasm', isCorrect: false },
      ],
      explanation: 'Hexokinase and Phosphofructokinase-1 each hydrolyze 1 ATP to activate the sugar, so 4 produced - 2 invested = 2 net ATP.',
    },
  },
  {
    id: 'rev-c3',
    conceptIndex: 1,
    conceptName: 'Light-Dependent Reactions & Photolysis',
    topicTitle: 'Biology',
    chapterTitle: 'Chapter 6: Life Processes',
    state: 'strong',
    reason: 'Solid grasp of photon capture at PS II, photolysis of water, and proton gradient generation.',
    actionLabel: 'Explore Concept',
    simplifiedSummary:
      'Photons excite Photosystem II (P680), driving water splitting into O₂ and H⁺. Electrons flow through cytochrome b₆f to PS I, forming NADPH and powering ATP synthase via chemiosmosis.',
    coreMechanismTip:
      'Water splitting occurs at the manganese oxygen-evolving complex on the lumenal face of PS II.',
    quickCheckQuestion: {
      prompt: 'Where does the photolysis of water physically occur?',
      options: [
        { id: 'opt-1', letter: 'A', text: 'Lumenal side of Photosystem II in the thylakoid', isCorrect: true },
        { id: 'opt-2', letter: 'B', text: 'Stroma matrix outside the thylakoid', isCorrect: false },
      ],
      explanation: 'Water photolysis takes place exclusively at the oxygen-evolving complex on the inner lumenal face of PS II.',
    },
  },
  {
    id: 'rev-c4',
    conceptIndex: 4,
    conceptName: 'Oxidative Phosphorylation & ATP Synthase',
    topicTitle: 'Biology',
    chapterTitle: 'Chapter 6: Life Processes',
    state: 'strong',
    reason: 'Reliably identifies oxygen as the terminal electron acceptor and Mitchell’s proton motive force mechanism.',
    actionLabel: 'Explore Concept',
    simplifiedSummary:
      'Complexes I, III, and IV pump protons into the mitochondrial intermembrane space. Protons re-enter matrix via ATP synthase rotor, driving high-yield oxidative phosphorylation.',
    coreMechanismTip:
      'Molecular O₂ acts as the final electron sink, reducing to harmless H₂O.',
    quickCheckQuestion: {
      prompt: 'What acts as the terminal electron acceptor in mitochondrial respiration?',
      options: [
        { id: 'opt-1', letter: 'A', text: 'Molecular Oxygen (O₂)', isCorrect: true },
        { id: 'opt-2', letter: 'B', text: 'Carbon Dioxide (CO₂)', isCorrect: false },
      ],
      explanation: 'Complex IV transfers electrons to O₂, which binds free protons to create metabolic water.',
    },
  },
];
