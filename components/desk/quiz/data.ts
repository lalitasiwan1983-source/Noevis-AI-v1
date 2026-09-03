import { QuizQuestion } from './types';

// Biology / Life Processes Quiz (10 Questions, Exactly 4 Options Each)
export const BIOLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'bio-q1',
    questionNumber: 1,
    conceptTag: 'Light Reactions & Photolysis',
    conceptIndex: 1,
    prompt:
      'Which process directly converts light energy into chemical energy during the initial phase of photosynthesis?',
    contextSnippet: 'Concept · Photosystem Machinery',
    options: [
      {
        id: 'bio-q1-a',
        letter: 'A',
        text: 'Non-cyclic photophosphorylation in the thylakoid membrane',
        isCorrect: true,
      },
      {
        id: 'bio-q1-b',
        letter: 'B',
        text: 'Carbon fixation catalyzed by RuBisCO in the stroma',
        isCorrect: false,
      },
      {
        id: 'bio-q1-c',
        letter: 'C',
        text: 'Substrate-level phosphorylation during glycolysis',
        isCorrect: false,
      },
      {
        id: 'bio-q1-d',
        letter: 'D',
        text: 'Lactic acid fermentation in the cytoplasm',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Light-dependent reactions in the thylakoid membranes capture solar photons via chlorophyll pigments and synthesize ATP and NADPH through photophosphorylation.',
      whyCorrect:
        'Option A is correct because non-cyclic electron flow through Photosystems II and I converts radiant light energy directly into chemical potential (ATP and NADPH).',
      conceptAnchor: 'Concept 1: Light-Dependent Reactions & Photophosphorylation',
      conceptIndex: 1,
    },
  },
  {
    id: 'bio-q2',
    questionNumber: 2,
    conceptTag: 'Water Photolysis Mechanism',
    conceptIndex: 1,
    prompt:
      'During light-dependent reactions, what provides the steady replacement electrons to Photosystem II (P680) after solar excitation?',
    contextFormula: '2H₂O ➔ 4H⁺ + 4e⁻ + O₂ ↑',
    options: [
      {
        id: 'bio-q2-a',
        letter: 'A',
        text: 'The catalytic splitting of water molecules (photolysis)',
        isCorrect: true,
      },
      {
        id: 'bio-q2-b',
        letter: 'B',
        text: 'Direct electron donation from cytoplasmic glucose',
        isCorrect: false,
      },
      {
        id: 'bio-q2-c',
        letter: 'C',
        text: 'Reduction of molecular carbon dioxide in the stroma',
        isCorrect: false,
      },
      {
        id: 'bio-q2-d',
        letter: 'D',
        text: 'Reverse proton flux through ATP Synthase channels',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The oxygen-evolving manganese complex on the lumenal face of Photosystem II splits water into protons, oxygen gas, and electrons.',
      whyCorrect:
        'Water photolysis is the sole evolutionary electron donor replenishing the oxidized P680 reaction center.',
      conceptAnchor: 'Concept 1: Light-Dependent Reactions & Photophosphorylation',
      conceptIndex: 1,
    },
  },
  {
    id: 'bio-q3',
    questionNumber: 3,
    conceptTag: 'Calvin Cycle Stoichiometry',
    conceptIndex: 2,
    prompt:
      'How many turns of the Calvin cycle and net carbon dioxide molecules are required to export ONE 3-carbon G3P molecule for sugar synthesis?',
    contextSnippet: 'Concept · Dark Reactions & Carbon Fixation',
    options: [
      {
        id: 'bio-q3-a',
        letter: 'A',
        text: '1 turn fixing 1 CO₂ molecule',
        isCorrect: false,
      },
      {
        id: 'bio-q3-b',
        letter: 'B',
        text: '3 turns fixing 3 CO₂ molecules',
        isCorrect: true,
      },
      {
        id: 'bio-q3-c',
        letter: 'C',
        text: '6 turns fixing 6 CO₂ molecules',
        isCorrect: false,
      },
      {
        id: 'bio-q3-d',
        letter: 'D',
        text: '12 turns fixing 12 CO₂ molecules',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Each turn of the Calvin cycle fixes one single-carbon CO₂ molecule onto a five-carbon RuBP acceptor. Three turns produce six 3-carbon molecules (G3P), five of which are recycled to regenerate RuBP, leaving one net exported G3P.',
      whyCorrect:
        'Option B is correct: 3 CO₂ fixed across 3 complete turns yield 1 net G3P triose (requiring 9 ATP and 6 NADPH).',
      conceptAnchor: 'Concept 2: Calvin Cycle: Carbon Fixation & Glucose Synthesis',
      conceptIndex: 2,
    },
  },
  {
    id: 'bio-q4',
    questionNumber: 4,
    conceptTag: 'RuBisCO Enzyme Function',
    conceptIndex: 2,
    prompt:
      'Which crucial enzyme catalyzes the initial attachment of atmospheric CO₂ to Ribulose-1,5-bisphosphate (RuBP) in the stroma?',
    options: [
      {
        id: 'bio-q4-a',
        letter: 'A',
        text: 'Phosphofructokinase-1 (PFK-1)',
        isCorrect: false,
      },
      {
        id: 'bio-q4-b',
        letter: 'B',
        text: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase)',
        isCorrect: true,
      },
      {
        id: 'bio-q4-c',
        letter: 'C',
        text: 'Pyruvate Dehydrogenase Complex',
        isCorrect: false,
      },
      {
        id: 'bio-q4-d',
        letter: 'D',
        text: 'Cytochrome c Oxidase',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'RuBisCO is the primary carbon-fixing enzyme on Earth, responsible for capturing inorganic gaseous CO₂ and integrating it into organic biosphere carbon.',
      whyCorrect:
        'RuBisCO catalyzes the carboxylation of RuBP into an unstable 6-carbon intermediate that immediately splits into two 3-PGA molecules.',
      conceptAnchor: 'Concept 2: Calvin Cycle: Carbon Fixation & Glucose Synthesis',
      conceptIndex: 2,
    },
  },
  {
    id: 'bio-q5',
    questionNumber: 5,
    conceptTag: 'Glycolysis Net Energy Balance',
    conceptIndex: 3,
    prompt:
      'What is the NET yield of ATP generated per molecule of glucose during cytoplasmic glycolysis?',
    contextFormula: 'Glucose (6C) + 2 NAD⁺ + 2 ADP + 2 Pi ➔ 2 Pyruvate + 2 NADH + 2 ATP (net)',
    options: [
      {
        id: 'bio-q5-a',
        letter: 'A',
        text: '2 net ATP (4 produced minus 2 invested)',
        isCorrect: true,
      },
      {
        id: 'bio-q5-b',
        letter: 'B',
        text: '4 net ATP (no preparatory investment required)',
        isCorrect: false,
      },
      {
        id: 'bio-q5-c',
        letter: 'C',
        text: '32 net ATP produced via substrate phosphorylation',
        isCorrect: false,
      },
      {
        id: 'bio-q5-d',
        letter: 'D',
        text: '0 net ATP (glycolysis only produces NADH)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The preparatory phase of glycolysis invests 2 ATP (via hexokinase and PFK-1) to activate glucose. The payoff phase generates 4 ATP, yielding a net balance of +2 ATP.',
      whyCorrect:
        'Option A is correct: gross yield is 4 ATP, but net gain is 2 ATP and 2 NADH.',
      conceptAnchor: 'Concept 3: Cellular Respiration & Glycolytic Pathway',
      conceptIndex: 3,
    },
  },
  {
    id: 'bio-q6',
    questionNumber: 6,
    conceptTag: 'Mitochondrial Terminal Electron Acceptor',
    conceptIndex: 4,
    prompt:
      'Which molecule serves as the terminal electron acceptor at Complex IV of the mitochondrial electron transport chain?',
    contextSnippet: 'Concept · Aerobic Respiration',
    options: [
      {
        id: 'bio-q6-a',
        letter: 'A',
        text: 'Molecular Oxygen (O₂)',
        isCorrect: true,
      },
      {
        id: 'bio-q6-b',
        letter: 'B',
        text: 'Carbon Dioxide (CO₂)',
        isCorrect: false,
      },
      {
        id: 'bio-q6-c',
        letter: 'C',
        text: 'Pyruvate ion',
        isCorrect: false,
      },
      {
        id: 'bio-q6-d',
        letter: 'D',
        text: 'Inorganic Phosphate (Pi)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Molecular oxygen has the highest electronegativity in the electron transport chain, pulling electrons down the redox gradient and combining with protons to create water.',
      whyCorrect:
        'Without O₂ acting as the final sink, electron flow backs up and oxidative phosphorylation halts entirely.',
      conceptAnchor: 'Concept 4: Oxidative Phosphorylation & ATP Yields',
      conceptIndex: 4,
    },
  },
  {
    id: 'bio-q7',
    questionNumber: 7,
    conceptTag: 'Chemiosmotic Mechanism',
    conceptIndex: 4,
    prompt:
      'According to Mitchell’s Chemiosmotic Hypothesis, what directly powers the mechanical rotation of ATP Synthase to forge ATP?',
    contextSnippet: 'Concept · Proton Motive Force',
    options: [
      {
        id: 'bio-q7-a',
        letter: 'A',
        text: 'Electrochemical proton gradient across the inner membrane',
        isCorrect: true,
      },
      {
        id: 'bio-q7-b',
        letter: 'B',
        text: 'Direct heat dissipation from glucose cleavage',
        isCorrect: false,
      },
      {
        id: 'bio-q7-c',
        letter: 'C',
        text: 'Active sodium (Na⁺) ion transport into cristae',
        isCorrect: false,
      },
      {
        id: 'bio-q7-d',
        letter: 'D',
        text: 'Hydrolysis of cyclic AMP in the matrix',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Protons pumped into the intermembrane space create a high concentration and electrical potential (PMF). When protons rush through the F₀ subunit back into the matrix, the rotor physically spins.',
      whyCorrect:
        'Option A is correct: the proton motive force provides the mechanical torque required for rotary catalysis.',
      conceptAnchor: 'Concept 4: Oxidative Phosphorylation & ATP Yields',
      conceptIndex: 4,
    },
  },
  {
    id: 'bio-q8',
    questionNumber: 8,
    conceptTag: 'Anaerobic Fermentation',
    conceptIndex: 3,
    prompt:
      'What is the vital primary purpose of converting pyruvate to lactate or ethanol during anaerobic fermentation?',
    options: [
      {
        id: 'bio-q8-a',
        letter: 'A',
        text: 'To regenerate NAD⁺ so glycolysis can continue generating ATP',
        isCorrect: true,
      },
      {
        id: 'bio-q8-b',
        letter: 'B',
        text: 'To generate 30 additional ATP in the absence of oxygen',
        isCorrect: false,
      },
      {
        id: 'bio-q8-c',
        letter: 'C',
        text: 'To break down mitochondrial inner membranes',
        isCorrect: false,
      },
      {
        id: 'bio-q8-d',
        letter: 'D',
        text: 'To neutralize carbon dioxide toxicity in muscle fibers',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Glycolysis requires oxidized NAD⁺ to accept electrons at step 6 (GAPDH). Without oxygen, NADH cannot donate electrons to the ETC, so fermentation oxidizes NADH back to NAD⁺.',
      whyCorrect:
        'Fermentation generates no additional ATP; its sole purpose is restoring NAD⁺ pools to prevent glycolysis from freezing.',
      conceptAnchor: 'Concept 3: Cellular Respiration & Glycolytic Pathway',
      conceptIndex: 3,
    },
  },
  {
    id: 'bio-q9',
    questionNumber: 9,
    conceptTag: 'Krebs Cycle Decarboxylation',
    conceptIndex: 3,
    prompt:
      'In eukaryotic cells, where do the oxidative decarboxylation of pyruvate and the citric acid (Krebs) cycle take place?',
    options: [
      {
        id: 'bio-q9-a',
        letter: 'A',
        text: 'Mitochondrial Matrix',
        isCorrect: true,
      },
      {
        id: 'bio-q9-b',
        letter: 'B',
        text: 'Intermembrane Space',
        isCorrect: false,
      },
      {
        id: 'bio-q9-c',
        letter: 'C',
        text: 'Outer Mitochondrial Membrane',
        isCorrect: false,
      },
      {
        id: 'bio-q9-d',
        letter: 'D',
        text: 'Nuclear Envelope Cisternae',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Pyruvate is transported across the inner membrane into the mitochondrial matrix, where pyruvate dehydrogenase and the soluble enzymes of the citric acid cycle reside.',
      whyCorrect:
        'Option A is correct: the matrix houses the soluble Krebs enzymes, producing CO₂, NADH, FADH₂, and GTP/ATP.',
      conceptAnchor: 'Concept 3: Cellular Respiration & Glycolytic Pathway',
      conceptIndex: 3,
    },
  },
  {
    id: 'bio-q10',
    questionNumber: 10,
    conceptTag: 'Total Aerobic Theoretical Yield',
    conceptIndex: 4,
    prompt:
      'What is the approximate theoretical total yield of ATP generated per glucose molecule in complete aerobic cellular respiration?',
    options: [
      {
        id: 'bio-q10-a',
        letter: 'A',
        text: '30 to 32 ATP',
        isCorrect: true,
      },
      {
        id: 'bio-q10-b',
        letter: 'B',
        text: '2 to 4 ATP',
        isCorrect: false,
      },
      {
        id: 'bio-q10-c',
        letter: 'C',
        text: '80 to 90 ATP',
        isCorrect: false,
      },
      {
        id: 'bio-q10-d',
        letter: 'D',
        text: '120 ATP',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Aerobic respiration yields ~2 ATP from glycolysis, ~2 ATP from Krebs, and ~26–28 ATP from oxidative phosphorylation, yielding an overall theoretical yield of 30–32 ATP.',
      whyCorrect:
        'Modern stoichiometric measurements account for H⁺ leak and shuttle mechanisms, arriving at roughly 30–32 ATP per glucose.',
      conceptAnchor: 'Concept 4: Oxidative Phosphorylation & ATP Yields',
      conceptIndex: 4,
    },
  },
];

// Mathematics / Calculus & Algebra Quiz (10 Questions, Exactly 4 Options Each)
export const MATH_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'math-q1',
    questionNumber: 1,
    conceptTag: 'Chain Rule Differentiation',
    conceptIndex: 1,
    prompt:
      'If f(x) = (3x² - 4)³, what is the exact expression for the first derivative f\'(x)?',
    contextFormula: 'd/dx [ g(h(x)) ] = g\'(h(x)) · h\'(x)',
    options: [
      {
        id: 'math-q1-a',
        letter: 'A',
        text: '18x(3x² - 4)²',
        isCorrect: true,
      },
      {
        id: 'math-q1-b',
        letter: 'B',
        text: '3(3x² - 4)²',
        isCorrect: false,
      },
      {
        id: 'math-q1-c',
        letter: 'C',
        text: '6x(3x² - 4)²',
        isCorrect: false,
      },
      {
        id: 'math-q1-d',
        letter: 'D',
        text: '9x²(3x² - 4)³',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'By the Chain Rule, d/dx[u³] = 3u² · (du/dx). With u = 3x² - 4, du/dx = 6x.',
      whyCorrect:
        'f\'(x) = 3(3x² - 4)² · 6x = 18x(3x² - 4)²',
      conceptAnchor: 'Concept 1: Differential Calculus & Chain Rule',
      conceptIndex: 1,
    },
  },
  {
    id: 'math-q2',
    questionNumber: 2,
    conceptTag: 'Second Derivative Test',
    conceptIndex: 2,
    prompt:
      'Let c be a critical point of f(x) where f\'(c) = 0. If f\'\'(c) > 0, what does this indicate about the graph at x = c?',
    contextSnippet: 'Concept · Concavity & Extreme Values',
    options: [
      {
        id: 'math-q2-a',
        letter: 'A',
        text: 'f has a local minimum at x = c because the curve is concave upward',
        isCorrect: true,
      },
      {
        id: 'math-q2-b',
        letter: 'B',
        text: 'f has a local maximum at x = c because the curve is concave downward',
        isCorrect: false,
      },
      {
        id: 'math-q2-c',
        letter: 'C',
        text: 'The function has a vertical asymptote at x = c',
        isCorrect: false,
      },
      {
        id: 'math-q2-d',
        letter: 'D',
        text: 'The test is inconclusive and requires examining f\'\'\'(c)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'A positive second derivative means the tangent slopes are increasing, curling the curve upwards like a cup.',
      whyCorrect:
        'When f\'(c) = 0 and f\'\'(c) > 0, the horizontal tangent line lies strictly below the curve, defining a local minimum.',
      conceptAnchor: 'Concept 2: Optimization & Critical Points',
      conceptIndex: 2,
    },
  },
  {
    id: 'math-q3',
    questionNumber: 3,
    conceptTag: 'Integration by Substitution',
    conceptIndex: 3,
    prompt:
      'Evaluate the indefinite integral: ∫ 2x · e^(x²) dx',
    contextFormula: 'Let u = x², du = 2x dx',
    options: [
      {
        id: 'math-q3-a',
        letter: 'A',
        text: 'e^(x²) + C',
        isCorrect: true,
      },
      {
        id: 'math-q3-b',
        letter: 'B',
        text: '2e^(x²) + C',
        isCorrect: false,
      },
      {
        id: 'math-q3-c',
        letter: 'C',
        text: '(x²) · e^(x²) + C',
        isCorrect: false,
      },
      {
        id: 'math-q3-d',
        letter: 'D',
        text: '0.5 e^(2x) + C',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Let u = x², then du = 2x dx. The integral transforms directly into ∫ e^u du = e^u + C.',
      whyCorrect:
        'Substituting back u = x² gives e^(x²) + C.',
      conceptAnchor: 'Concept 3: Integral Calculus',
      conceptIndex: 3,
    },
  },
  {
    id: 'math-q4',
    questionNumber: 4,
    conceptTag: 'Fundamental Theorem of Calculus',
    conceptIndex: 3,
    prompt:
      'If F(x) = ∫[0 to x] sin(t²) dt, what is the derivative dF/dx?',
    options: [
      {
        id: 'math-q4-a',
        letter: 'A',
        text: 'sin(x²)',
        isCorrect: true,
      },
      {
        id: 'math-q4-b',
        letter: 'B',
        text: '2x · cos(x²)',
        isCorrect: false,
      },
      {
        id: 'math-q4-c',
        letter: 'C',
        text: '-cos(x²) + C',
        isCorrect: false,
      },
      {
        id: 'math-q4-d',
        letter: 'D',
        text: 'cos(x²)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Part 1 of the Fundamental Theorem of Calculus states that d/dx [ ∫[a to x] f(t) dt ] = f(x).',
      whyCorrect:
        'Direct application yields sin(x²).',
      conceptAnchor: 'Concept 3: Integral Calculus',
      conceptIndex: 3,
    },
  },
  {
    id: 'math-q5',
    questionNumber: 5,
    conceptTag: 'Matrix Determinants',
    conceptIndex: 4,
    prompt:
      'What is the determinant of the 2×2 matrix A = [[3, 2], [1, 4]]?',
    contextFormula: 'det([[a, b], [c, d]]) = ad - bc',
    options: [
      {
        id: 'math-q5-a',
        letter: 'A',
        text: '10',
        isCorrect: true,
      },
      {
        id: 'math-q5-b',
        letter: 'B',
        text: '14',
        isCorrect: false,
      },
      {
        id: 'math-q5-c',
        letter: 'C',
        text: '7',
        isCorrect: false,
      },
      {
        id: 'math-q5-d',
        letter: 'D',
        text: '-2',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'det(A) = (3 × 4) - (2 × 1) = 12 - 2 = 10.',
      whyCorrect:
        'Option A is correct: the cross-product difference is 10.',
      conceptAnchor: 'Concept 4: Linear Algebra',
      conceptIndex: 4,
    },
  },
  {
    id: 'math-q6',
    questionNumber: 6,
    conceptTag: 'Limits at Infinity',
    conceptIndex: 1,
    prompt:
      'Compute the limit: lim (x ➔ ∞) of (5x³ - 2x) / (2x³ + 7x² + 1).',
    options: [
      {
        id: 'math-q6-a',
        letter: 'A',
        text: '5 / 2',
        isCorrect: true,
      },
      {
        id: 'math-q6-b',
        letter: 'B',
        text: 'Infinity (∞)',
        isCorrect: false,
      },
      {
        id: 'math-q6-c',
        letter: 'C',
        text: '0',
        isCorrect: false,
      },
      {
        id: 'math-q6-d',
        letter: 'D',
        text: '-2 / 7',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Dividing numerator and denominator by the highest degree power x³ yields 5/2 as x approaches infinity.',
      whyCorrect:
        'Lower order terms diminish to 0, leaving the ratio of leading coefficients: 5/2.',
      conceptAnchor: 'Concept 1: Limits & Continuity',
      conceptIndex: 1,
    },
  },
  {
    id: 'math-q7',
    questionNumber: 7,
    conceptTag: 'Eigenvalues & Invertibility',
    conceptIndex: 4,
    prompt:
      'If a square matrix A has an eigenvalue equal to 0, which statement is guaranteed to be true?',
    options: [
      {
        id: 'math-q7-a',
        letter: 'A',
        text: 'Matrix A is singular and not invertible (det(A) = 0)',
        isCorrect: true,
      },
      {
        id: 'math-q7-b',
        letter: 'B',
        text: 'Matrix A is symmetric and positive definite',
        isCorrect: false,
      },
      {
        id: 'math-q7-c',
        letter: 'C',
        text: 'The trace of matrix A must equal zero',
        isCorrect: false,
      },
      {
        id: 'math-q7-d',
        letter: 'D',
        text: 'Matrix A has no eigenvectors',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The determinant of a matrix equals the product of its eigenvalues. If any eigenvalue is 0, det(A) = 0.',
      whyCorrect:
        'A zero determinant implies non-trivial null space, making the matrix non-invertible.',
      conceptAnchor: 'Concept 4: Linear Algebra',
      conceptIndex: 4,
    },
  },
  {
    id: 'math-q8',
    questionNumber: 8,
    conceptTag: 'Mean Value Theorem',
    conceptIndex: 2,
    prompt:
      'What prerequisite conditions must a function f satisfy on [a, b] to guarantee the Mean Value Theorem applies?',
    options: [
      {
        id: 'math-q8-a',
        letter: 'A',
        text: 'Continuous on [a, b] and differentiable on (a, b)',
        isCorrect: true,
      },
      {
        id: 'math-q8-b',
        letter: 'B',
        text: 'Strictly monotonic and non-negative across all real numbers',
        isCorrect: false,
      },
      {
        id: 'math-q8-c',
        letter: 'C',
        text: 'Polynomial with integer coefficients',
        isCorrect: false,
      },
      {
        id: 'math-q8-d',
        letter: 'D',
        text: 'Second derivative must be continuous on [a, b]',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The MVT guarantees a point c in (a, b) where f\'(c) = (f(b) - f(a)) / (b - a).',
      whyCorrect:
        'The standard hypotheses require continuity on the closed interval and differentiability on the open interval.',
      conceptAnchor: 'Concept 2: Optimization & Critical Points',
      conceptIndex: 2,
    },
  },
  {
    id: 'math-q9',
    questionNumber: 9,
    conceptTag: 'Taylor Series Expansion',
    conceptIndex: 3,
    prompt:
      'What is the coefficient of x² in the Maclaurin series expansion of f(x) = e^(2x)?',
    contextFormula: 'f(x) = ∑ [ f^(n)(0) / n! ] · x^n',
    options: [
      {
        id: 'math-q9-a',
        letter: 'A',
        text: '2',
        isCorrect: true,
      },
      {
        id: 'math-q9-b',
        letter: 'B',
        text: '4',
        isCorrect: false,
      },
      {
        id: 'math-q9-c',
        letter: 'C',
        text: '1',
        isCorrect: false,
      },
      {
        id: 'math-q9-d',
        letter: 'D',
        text: '1 / 2',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'e^(u) = 1 + u + u²/2! + ... With u = 2x: (2x)² / 2 = 4x² / 2 = 2x².',
      whyCorrect:
        'The coefficient of x² is 2.',
      conceptAnchor: 'Concept 3: Infinite Series',
      conceptIndex: 3,
    },
  },
  {
    id: 'math-q10',
    questionNumber: 10,
    conceptTag: 'Gradient Vector Properties',
    conceptIndex: 2,
    prompt:
      'In multivariable calculus, what geometric direction does the gradient vector ∇f(x, y) point toward at any point?',
    options: [
      {
        id: 'math-q10-a',
        letter: 'A',
        text: 'Direction of steepest ascent of f',
        isCorrect: true,
      },
      {
        id: 'math-q10-b',
        letter: 'B',
        text: 'Direction tangent to the level curve where f remains constant',
        isCorrect: false,
      },
      {
        id: 'math-q10-c',
        letter: 'C',
        text: 'Direction of minimum rate of change (steepest descent)',
        isCorrect: false,
      },
      {
        id: 'math-q10-d',
        letter: 'D',
        text: 'Directly toward the origin (0, 0)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The directional derivative is maximized when the unit direction aligns with ∇f. Thus ∇f points in the direction of steepest increase.',
      whyCorrect:
        'Option A is correct: the gradient always points in the direction of maximum positive rate of change.',
      conceptAnchor: 'Concept 2: Multivariable Calculus',
      conceptIndex: 2,
    },
  },
];

// Computer Science / Programming & Algorithms Quiz (10 Questions, Exactly 4 Options Each)
export const CODE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cs-q1',
    questionNumber: 1,
    conceptTag: 'Binary Search Algorithm',
    conceptIndex: 1,
    prompt:
      'What is the worst-case asymptotic time complexity of binary search on a sorted array of n elements?',
    options: [
      {
        id: 'cs-q1-a',
        letter: 'A',
        text: 'O(log n)',
        isCorrect: true,
      },
      {
        id: 'cs-q1-b',
        letter: 'B',
        text: 'O(n)',
        isCorrect: false,
      },
      {
        id: 'cs-q1-c',
        letter: 'C',
        text: 'O(n log n)',
        isCorrect: false,
      },
      {
        id: 'cs-q1-d',
        letter: 'D',
        text: 'O(1)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Binary search halves the remaining search range on every comparison step, requiring at most ⌈log₂ n⌉ iterations.',
      whyCorrect:
        'Option A is correct: logarithmic time complexity O(log n).',
      conceptAnchor: 'Concept 1: Algorithms & Searching',
      conceptIndex: 1,
    },
  },
  {
    id: 'cs-q2',
    questionNumber: 2,
    conceptTag: 'Recursion Base Condition',
    conceptIndex: 1,
    prompt:
      'What critical bug exists in the recursive binary search snippet shown below?',
    codeSnippet: {
      language: 'JavaScript',
      code: `function binarySearch(arr, target, low, high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);
  return binarySearch(arr, target, mid + 1, high);
}`,
    },
    options: [
      {
        id: 'cs-q2-a',
        letter: 'A',
        text: 'Missing base condition (low > high), causing infinite recursion if target is absent',
        isCorrect: true,
      },
      {
        id: 'cs-q2-b',
        letter: 'B',
        text: 'Array indexing must start at 1 instead of 0',
        isCorrect: false,
      },
      {
        id: 'cs-q2-c',
        letter: 'C',
        text: 'Math.floor cannot operate on sum of two indices',
        isCorrect: false,
      },
      {
        id: 'cs-q2-d',
        letter: 'D',
        text: 'Recursive calls must pass mid instead of mid - 1',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'When searching for an element not in the array, low eventually exceeds high. Without checking `if (low > high) return -1;`, the function recurses until call stack overflow.',
      whyCorrect:
        'Option A is correct: missing base case triggers RangeError / Stack Overflow.',
      conceptAnchor: 'Concept 1: Recursion & Stack Frames',
      conceptIndex: 1,
    },
  },
  {
    id: 'cs-q3',
    questionNumber: 3,
    conceptTag: 'Hash Table Time Complexity',
    conceptIndex: 2,
    prompt:
      'What is the expected average-case time complexity of lookup, insertion, and deletion in a standard Hash Map?',
    options: [
      {
        id: 'cs-q3-a',
        letter: 'A',
        text: 'O(1) constant time',
        isCorrect: true,
      },
      {
        id: 'cs-q3-b',
        letter: 'B',
        text: 'O(log n) logarithmic time',
        isCorrect: false,
      },
      {
        id: 'cs-q3-c',
        letter: 'C',
        text: 'O(n) linear time',
        isCorrect: false,
      },
      {
        id: 'cs-q3-d',
        letter: 'D',
        text: 'O(n²) quadratic time',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'A uniform hashing function distributes keys uniformly across buckets, providing direct array index calculation in O(1) expected time.',
      whyCorrect:
        'Option A is correct: average-case operations run in O(1).',
      conceptAnchor: 'Concept 2: Hash Tables & Associative Arrays',
      conceptIndex: 2,
    },
  },
  {
    id: 'cs-q4',
    questionNumber: 4,
    conceptTag: 'Nested Loop Complexity',
    conceptIndex: 1,
    prompt:
      'What is the Big-O time complexity of this triangular loop pattern?',
    codeSnippet: {
      language: 'JavaScript',
      code: `for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    process(i, j); // O(1) operation
  }
}`,
    },
    options: [
      {
        id: 'cs-q4-a',
        letter: 'A',
        text: 'O(n²)',
        isCorrect: true,
      },
      {
        id: 'cs-q4-b',
        letter: 'B',
        text: 'O(n log n)',
        isCorrect: false,
      },
      {
        id: 'cs-q4-c',
        letter: 'C',
        text: 'O(n)',
        isCorrect: false,
      },
      {
        id: 'cs-q4-d',
        letter: 'D',
        text: 'O(2^n)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'The inner loop runs 0 + 1 + 2 + ... + (n - 1) times = n(n - 1) / 2 = 0.5n² - 0.5n operations.',
      whyCorrect:
        'Dropping lower-order terms and constant factors yields O(n²).',
      conceptAnchor: 'Concept 1: Asymptotic Analysis',
      conceptIndex: 1,
    },
  },
  {
    id: 'cs-q5',
    questionNumber: 5,
    conceptTag: 'Stack vs Queue Semantics',
    conceptIndex: 2,
    prompt:
      'Which data structure inherently enforces a Last-In, First-Out (LIFO) order of element retrieval?',
    options: [
      {
        id: 'cs-q5-a',
        letter: 'A',
        text: 'Stack',
        isCorrect: true,
      },
      {
        id: 'cs-q5-b',
        letter: 'B',
        text: 'Queue (FIFO)',
        isCorrect: false,
      },
      {
        id: 'cs-q5-c',
        letter: 'C',
        text: 'Binary Min-Heap',
        isCorrect: false,
      },
      {
        id: 'cs-q5-d',
        letter: 'D',
        text: 'Doubly-Linked List',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'A Stack restricts insertion and deletion to the same end (the top), adhering to LIFO semantics (as utilized by execution call stacks).',
      whyCorrect:
        'Option A is correct: Stacks are LIFO.',
      conceptAnchor: 'Concept 2: Core Data Structures',
      conceptIndex: 2,
    },
  },
  {
    id: 'cs-q6',
    questionNumber: 6,
    conceptTag: 'Stable Sorting Algorithms',
    conceptIndex: 3,
    prompt:
      'Which of the following sorting algorithms guarantees worst-case O(n log n) time and is stable?',
    options: [
      {
        id: 'cs-q6-a',
        letter: 'A',
        text: 'Merge Sort',
        isCorrect: true,
      },
      {
        id: 'cs-q6-b',
        letter: 'B',
        text: 'Quick Sort (standard)',
        isCorrect: false,
      },
      {
        id: 'cs-q6-d',
        letter: 'C',
        text: 'Heap Sort',
        isCorrect: false,
      },
      {
        id: 'cs-q6-d2',
        letter: 'D',
        text: 'Selection Sort',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Merge Sort divides the array into halves, recursively sorts them, and merges them in linear time. It maintains relative order of equal keys (stable) and never degrades past O(n log n).',
      whyCorrect:
        'QuickSort can degrade to O(n²) and is unstable; HeapSort is unstable; MergeSort satisfies both criteria.',
      conceptAnchor: 'Concept 3: Sorting Algorithms',
      conceptIndex: 3,
    },
  },
  {
    id: 'cs-q7',
    questionNumber: 7,
    conceptTag: 'Dynamic Programming Principle',
    conceptIndex: 4,
    prompt:
      'What two fundamental properties must an optimization problem exhibit to be suitably solved via Dynamic Programming?',
    options: [
      {
        id: 'cs-q7-a',
        letter: 'A',
        text: 'Optimal Substructure and Overlapping Subproblems',
        isCorrect: true,
      },
      {
        id: 'cs-q7-b',
        letter: 'B',
        text: 'Greedy Choice Property and Linearity',
        isCorrect: false,
      },
      {
        id: 'cs-q7-c',
        letter: 'C',
        text: 'Randomized Pivoting and Quicksort Partitioning',
        isCorrect: false,
      },
      {
        id: 'cs-q7-d',
        letter: 'D',
        text: 'Static Typing and Monadic Encapsulation',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Optimal substructure means global optimal solutions can be constructed from optimal solutions to subproblems; overlapping subproblems means the same subproblems are solved repeatedly.',
      whyCorrect:
        'Option A is correct: memoization or tabulation stores intermediate answers to avoid redundant recomputations.',
      conceptAnchor: 'Concept 4: Dynamic Programming',
      conceptIndex: 4,
    },
  },
  {
    id: 'cs-q8',
    questionNumber: 8,
    conceptTag: 'Graph Traversal Traversal',
    conceptIndex: 4,
    prompt:
      'Which algorithm is best suited for finding the shortest path in an unweighted graph?',
    options: [
      {
        id: 'cs-q8-a',
        letter: 'A',
        text: 'Breadth-First Search (BFS)',
        isCorrect: true,
      },
      {
        id: 'cs-q8-b',
        letter: 'B',
        text: 'Depth-First Search (DFS)',
        isCorrect: false,
      },
      {
        id: 'cs-q8-c',
        letter: 'C',
        text: 'Bellman-Ford Algorithm',
        isCorrect: false,
      },
      {
        id: 'cs-q8-d',
        letter: 'D',
        text: 'Kruskal’s Minimum Spanning Tree',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'BFS explores vertices layer by layer in order of their edge distance from the source root.',
      whyCorrect:
        'In unweighted graphs, the first time BFS reaches a target vertex, it has traversed the minimum number of edges in O(V + E).',
      conceptAnchor: 'Concept 4: Graph Algorithms',
      conceptIndex: 4,
    },
  },
  {
    id: 'cs-q9',
    questionNumber: 9,
    conceptTag: 'Memory & Garbage Collection',
    conceptIndex: 2,
    prompt:
      'In automatic memory management (e.g. JavaScript/V8), what condition allows an allocated object on the heap to be safely garbage-collected?',
    options: [
      {
        id: 'cs-q9-a',
        letter: 'A',
        text: 'When it is no longer reachable from any active root reference',
        isCorrect: true,
      },
      {
        id: 'cs-q9-b',
        letter: 'B',
        text: 'Immediately after the function that instantiated it returns',
        isCorrect: false,
      },
      {
        id: 'cs-q9-c',
        letter: 'C',
        text: 'Only when the entire process shuts down',
        isCorrect: false,
      },
      {
        id: 'cs-q9-d',
        letter: 'D',
        text: 'When its reference counter exceeds 256',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Modern garbage collectors utilize mark-and-sweep or generational tracing. An object unreachable through pointer traversal from roots (global, stack frames) is collected.',
      whyCorrect:
        'Option A is correct: reachability from root determines object liveness.',
      conceptAnchor: 'Concept 2: Memory Models & Runtimes',
      conceptIndex: 2,
    },
  },
  {
    id: 'cs-q10',
    questionNumber: 10,
    conceptTag: 'Balanced Binary Search Trees',
    conceptIndex: 2,
    prompt:
      'What is the maximum height of an AVL or Red-Black Tree containing n nodes?',
    options: [
      {
        id: 'cs-q10-a',
        letter: 'A',
        text: 'O(log n)',
        isCorrect: true,
      },
      {
        id: 'cs-q10-b',
        letter: 'B',
        text: 'O(n)',
        isCorrect: false,
      },
      {
        id: 'cs-q10-c',
        letter: 'C',
        text: 'O(1)',
        isCorrect: false,
      },
      {
        id: 'cs-q10-d',
        letter: 'D',
        text: 'O(n log n)',
        isCorrect: false,
      },
    ],
    explanation: {
      corePrinciple:
        'Self-balancing binary search trees enforce height balancing invariants via tree rotations upon insertions and deletions.',
      whyCorrect:
        'This guarantees lookup, insertion, and deletion retain worst-case O(log n) performance.',
      conceptAnchor: 'Concept 2: Balanced Search Trees',
      conceptIndex: 2,
    },
  },
];

// Default compatibility export
export const QUIZ_QUESTIONS: QuizQuestion[] = BIOLOGY_QUIZ_QUESTIONS;

// Adaptive source-aware quiz questions generator
export function getQuizQuestionsForSource(
  sourceName?: string,
  conceptTitle?: string,
  topic?: string
): QuizQuestion[] {
  const query = `${sourceName || ''} ${conceptTitle || ''} ${topic || ''}`.toLowerCase();

  if (
    query.includes('math') ||
    query.includes('calculus') ||
    query.includes('derivative') ||
    query.includes('algebra') ||
    query.includes('geometry') ||
    query.includes('integral')
  ) {
    return MATH_QUIZ_QUESTIONS;
  }

  if (
    query.includes('code') ||
    query.includes('algorithm') ||
    query.includes('computer') ||
    query.includes('programming') ||
    query.includes('javascript') ||
    query.includes('python') ||
    query.includes('java') ||
    query.includes('software')
  ) {
    return CODE_QUIZ_QUESTIONS;
  }

  return BIOLOGY_QUIZ_QUESTIONS;
}
