import { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-q1',
    questionNumber: 1,
    conceptTag: 'Light Reactions & Photolysis',
    conceptIndex: 1,
    type: 'single-choice',
    typeBadge: 'Single Choice',
    prompt:
      'During non-cyclic photophosphorylation in the thylakoid membrane, which specific structure directly catalyzes the photolysis of water to replace lost electrons?',
    contextFormula: '2H₂O ➔ 4H⁺ + 4e⁻ + O₂ ↑',
    options: [
      {
        id: 'q1-opt-a',
        letter: 'A',
        text: 'Oxygen-Evolving Complex at Photosystem II (P680)',
        detail: 'Manganese cluster on the lumenal side of PS II that extracts electrons from H₂O.',
        isCorrect: true,
      },
      {
        id: 'q1-opt-b',
        letter: 'B',
        text: 'NADP⁺ Reductase Complex on the Stroma Surface',
        detail: 'Enzyme responsible for reducing NADP⁺ to NADPH at the terminal end of PS I.',
        isCorrect: false,
      },
      {
        id: 'q1-opt-c',
        letter: 'C',
        text: 'F₀ Rotor Unit of ATP Synthase',
        detail: 'Hydrophobic transmembrane rotor that channels proton flux.',
        isCorrect: false,
      },
      {
        id: 'q1-opt-d',
        letter: 'D',
        text: 'Cytochrome b₆f Proton Pump',
        detail: 'Intermediate redox complex that translocates protons across the thylakoid membrane.',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Photosystem II (P680) is excited by photons, losing high-energy electrons. Its oxygen-evolving manganese cluster splits water molecules, generating oxygen gas, protons, and replacement electrons.',
      whyCorrect:
        'The water-splitting complex is exclusively located on the lumenal face of PS II. NADP⁺ reductase and ATP synthase operate at downstream stages.',
      conceptAnchor: 'Concept 1: Light-Dependent Reactions & Photophosphorylation',
      conceptIndex: 1,
    },
  },
  {
    id: 'quiz-q2',
    questionNumber: 2,
    conceptTag: 'Calvin Cycle Stoichiometry',
    conceptIndex: 2,
    type: 'multi-select',
    typeBadge: 'Multiple Select',
    prompt:
      'To produce a net yield of ONE 3-carbon sugar (G3P) for glucose synthesis, which of the following molecular inputs are consumed across 3 turns of the Calvin Cycle?',
    contextSnippet: 'Select ALL molecules that are required inputs.',
    options: [
      {
        id: 'q2-opt-a',
        letter: 'A',
        text: '3 Molecules of Carbon Dioxide (CO₂)',
        detail: 'Fixed one-by-one by the enzyme RuBisCO onto RuBP acceptors.',
        isCorrect: true,
      },
      {
        id: 'q2-opt-b',
        letter: 'B',
        text: '9 Molecules of ATP',
        detail: '6 ATP consumed during 3-PGA reduction + 3 ATP consumed during RuBP regeneration.',
        isCorrect: true,
      },
      {
        id: 'q2-opt-c',
        letter: 'C',
        text: '6 Molecules of NADPH',
        detail: 'High-energy reducing equivalents exported from light reactions.',
        isCorrect: true,
      },
      {
        id: 'q2-opt-d',
        letter: 'D',
        text: '2 Molecules of Oxygen Gas (O₂)',
        detail: 'Atmospheric oxygen is not consumed; oxygenation is an unproductive photorespiration side reaction.',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The Calvin cycle net stoichiometry for exporting one G3P triose is exactly 3 CO₂ + 9 ATP + 6 NADPH. Six turns (6 CO₂ + 18 ATP + 12 NADPH) are needed for one full 6-carbon glucose molecule.',
      whyCorrect:
        'Options A, B, and C are required energetic and carbon inputs. Oxygen gas is a byproduct of the light reactions and an inhibitor of RuBisCO, not a consumed input.',
      conceptAnchor: 'Concept 2: Calvin Cycle: Carbon Fixation & Glucose Synthesis',
      conceptIndex: 2,
    },
  },
  {
    id: 'quiz-q3',
    questionNumber: 3,
    conceptTag: 'Glycolysis & Energy Investment',
    conceptIndex: 3,
    type: 'true-false',
    typeBadge: 'True / False',
    prompt:
      'True or False: Cytosolic glycolysis generates a gross yield of 4 ATP per glucose, but results in a NET gain of only 2 ATP because 2 ATP are consumed during the initial preparatory phase.',
    contextFormula: 'Glucose (6C) + 2 NAD⁺ + 2 ADP + 2 Pi ➔ 2 Pyruvate (3C) + 2 NADH + 2 ATP (net)',
    options: [
      {
        id: 'q3-opt-true',
        letter: 'T',
        text: 'True',
        detail: 'Hexokinase and PFK-1 each invest 1 ATP (total -2 ATP), while payoff steps yield 4 ATP (net +2 ATP).',
        isCorrect: true,
      },
      {
        id: 'q3-opt-false',
        letter: 'F',
        text: 'False',
        detail: 'Glycolysis requires no energy investment and directly yields 4 net ATP.',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Glycolysis is split into two halves: the Energy Investment Phase (steps 1–5, requiring 2 ATP to phosphorylate hexoses) and the Energy Payoff Phase (steps 6–10, generating 4 ATP via substrate-level phosphorylation).',
      whyCorrect:
        'The net yield is 4 gross ATP minus 2 invested ATP = 2 net ATP, along with 2 NADH and 2 pyruvate molecules.',
      conceptAnchor: 'Concept 3: Cellular Respiration & Glycolytic Pathway',
      conceptIndex: 3,
    },
  },
  {
    id: 'quiz-q4',
    questionNumber: 4,
    conceptTag: 'Oxidative Phosphorylation & ETC',
    conceptIndex: 4,
    type: 'single-choice',
    typeBadge: 'Single Choice',
    prompt:
      'What is the ultimate terminal electron acceptor in the mitochondrial electron transport chain (Complex IV), without which aerobic ATP synthesis ceases?',
    contextFormula: '4e⁻ + 4H⁺ + O₂ ➔ 2H₂O',
    options: [
      {
        id: 'q4-opt-a',
        letter: 'A',
        text: 'Molecular Oxygen (O₂)',
        detail: 'Reduced by Cytochrome c Oxidase at Complex IV to form metabolic water.',
        isCorrect: true,
      },
      {
        id: 'q4-opt-b',
        letter: 'B',
        text: 'Ubiquinone / Coenzyme Q',
        detail: 'Mobile lipid electron carrier moving between Complex I/II and Complex III.',
        isCorrect: false,
      },
      {
        id: 'q4-opt-c',
        letter: 'C',
        text: 'Inorganic Phosphate (Pi)',
        detail: 'Substrate for ATP synthesis, not an electron acceptor in the redox chain.',
        isCorrect: false,
      },
      {
        id: 'q4-opt-d',
        letter: 'D',
        text: 'Pyruvate Translocase',
        detail: 'Symporter protein transporting pyruvate from cytosol into the mitochondrial matrix.',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Molecular oxygen (O₂) has the highest electronegativity in the respiratory chain and acts as the final electron sink, picking up electrons and protons to form harmless water.',
      whyCorrect:
        'In the absence of O₂, electron transport halts, upstream carriers (NADH/FADH₂) cannot be re-oxidized, and the proton gradient collapses.',
      conceptAnchor: 'Concept 4: Oxidative Phosphorylation & ATP Yields',
      conceptIndex: 4,
    },
  },
  {
    id: 'quiz-q5',
    questionNumber: 5,
    conceptTag: 'Chemiosmosis & Rotary Catalysis',
    conceptIndex: 4,
    type: 'single-choice',
    typeBadge: 'Mechanism Insight',
    prompt:
      'According to Mitchell’s Chemiosmotic Hypothesis, what directly provides the mechanical driving force for the rotary synthesis of ATP in the mitochondrial matrix?',
    contextSnippet: 'Focus on the physical and chemical driving gradient.',
    options: [
      {
        id: 'q5-opt-a',
        letter: 'A',
        text: 'Proton Motive Force (PMF) across the Inner Mitochondrial Membrane',
        detail: 'The electrochemical gradient (ΔpH + membrane potential) driving H⁺ flux through the F₀ subunit.',
        isCorrect: true,
      },
      {
        id: 'q5-opt-b',
        letter: 'B',
        text: 'Direct heat dissipation from glucose cleavage',
        detail: 'Thermal energy cannot be directly coupled to bond synthesis in biological enzymes.',
        isCorrect: false,
      },
      {
        id: 'q5-opt-c',
        letter: 'C',
        text: 'Active pumping of sodium (Na⁺) ions into the cristae',
        detail: 'Mitochondrial ATP synthesis relies strictly on hydrogen ions (protons), not sodium.',
        isCorrect: false,
      },
      {
        id: 'q5-opt-d',
        letter: 'D',
        text: 'Osmotic pressure of cytoplasmic glucose entering the outer pores',
        detail: 'Glucose is already broken down into pyruvate and acetyl-CoA prior to cristae transport.',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Protons pumped into the intermembrane space create a potent electrochemical difference (Proton Motive Force). As protons stream down this gradient through the F₀ channel of ATP Synthase, the central rotor physically spins to synthesize ATP.',
      whyCorrect:
        'The proton motive force directly powers the conformational changes in the catalytic F₁ headpiece.',
      conceptAnchor: 'Concept 4: Oxidative Phosphorylation & ATP Yields',
      conceptIndex: 4,
    },
  },
];
