import { LearnConceptData } from './types';

export const LEARN_CONCEPTS: LearnConceptData[] = [
  {
    id: 'concept-1',
    index: 1,
    title: 'Light-Dependent Reactions & Photophosphorylation',
    subtitle: 'Harnessing photon energy to split water and generate chemical energy (ATP & NADPH).',
    topic: 'Biology',
    chapter: 'Chapter 6: Life Processes',
    estimatedTime: '7 min',
    difficulty: 'Foundation',
    whyItMatters: {
      headline: 'The origin of nearly all biological energy and breathable oxygen on Earth.',
      description:
        'Every calorie of food you eat and breath of oxygen you take traces back to this exact biochemical reaction in plant thylakoid membranes.',
      keyMetric: '21%',
      metricLabel: 'Atmospheric O₂ supplied by photolysis',
    },
    simpleExplanation: {
      coreIntuition:
        'Think of the light reaction as a solar-powered hydroelectric dam. Sunlight strikes chlorophyll pigments, boosting electrons into high-energy states. As these electrons flow down a molecular wire (the Electron Transport Chain), they pump protons into a reservoir (thylakoid lumen). When protons rush back out through a turbine (ATP Synthase), cellular batteries (ATP) are charged.',
      analogyTitle: 'The Hydroelectric Solar Dam Analogy',
      analogyText:
        'Solar panels (Chlorophyll) absorb sunlight to power water pumps (Proton Pumps) that fill an elevated reservoir (Thylakoid lumen). Water flowing downhill through a turbine generator (ATP Synthase) turns mechanical motion into electricity (ATP).',
      scientificEquation: '2H₂O + 2NADP⁺ + 3ADP + 3Pi + Light ➔ O₂ + 2NADPH + 3ATP + 2H⁺',
    },
    diagram: {
      title: 'Thylakoid Membrane Photochemical Machinery',
      subtitle: 'Click through each stage to trace the flow of photons, electrons, and protons.',
      steps: [
        {
          id: 'step-1',
          number: 1,
          title: 'Photon Absorption at PS II',
          subtitle: 'Light hits P680 reaction center',
          detail:
            'Photons strike the antenna pigment complex in Photosystem II. Energy is resonance-transferred to the P680 reaction center, exciting a pair of electrons to a higher energy orbital (excited state).',
          highlightKey: 'ps2',
          analogy: 'Sunlight hits a solar panel, instantly energizing electric charges.',
        },
        {
          id: 'step-2',
          number: 2,
          title: 'Photolysis (Water Splitting)',
          subtitle: 'Replenishing electrons & releasing O₂',
          detail:
            'An oxygen-evolving complex at PS II splits H₂O molecules into oxygen gas, protons (H⁺), and replacement electrons. This is the sole source of atmospheric oxygen produced by plants.',
          highlightKey: 'photolysis',
          analogy: 'Harvesting water to extract hydrogen fuel and venting harmless oxygen steam.',
        },
        {
          id: 'step-3',
          number: 3,
          title: 'Electron Transport & H⁺ Pumping',
          subtitle: 'Building the electrochemical gradient',
          detail:
            'Excited electrons travel through Plastoquinone (PQ), the Cytochrome b₆f complex, and Plastocyanin (PC). This movement pumps H⁺ protons from the stroma into the thylakoid lumen, generating a steep proton gradient.',
          highlightKey: 'etc',
          analogy: 'Water pumps driven by electrical current filling an elevated dam reservoir.',
        },
        {
          id: 'step-4',
          number: 4,
          title: 'PS I Activation & NADPH Formation',
          subtitle: 'Re-excitation at P700',
          detail:
            'Electrons reach Photosystem I and receive a second photon boost (P700). Ferredoxin and NADP⁺ reductase transfer these high-energy electrons to produce NADPH, a potent reducing agent.',
          highlightKey: 'ps1',
          analogy: 'Secondary booster pack charging high-capacity mobile power banks (NADPH).',
        },
        {
          id: 'step-5',
          number: 5,
          title: 'Chemiosmosis via ATP Synthase',
          subtitle: 'Rotary catalysis producing ATP',
          detail:
            'Protons in the acidic lumen rush down their concentration gradient through the rotary channel of ATP Synthase, driving phosphorylation of ADP into ATP in the stroma.',
          highlightKey: 'atp',
          analogy: 'Water gushing through a dam turbine to spin the dynamo generator.',
        },
      ],
    },
    keyTakeaways: [
      'Light reactions occur strictly in the thylakoid membranes of chloroplasts.',
      'Water (H₂O) is the initial electron donor; Oxygen (O₂) is released as a byproduct.',
      'Solar energy is converted into two chemical carriers: ATP (energy) and NADPH (reducing power).',
      'ATP and NADPH will be transferred directly to the stroma to power the Calvin Cycle (Dark Reaction).',
    ],
    examTip:
      'Frequent exam trap: Water is split at Photosystem II (P680), NOT Photosystem I (P700). Remember: PS II acts first in non-cyclic photophosphorylation.',
    quickCheck: {
      question: 'What is the immediate source of electrons that replaces those excited in Photosystem II (PS II)?',
      prompt: 'Test your understanding of the photolysis mechanism:',
      hint: 'Think about what molecule is split in the presence of light inside the thylakoid lumen.',
      options: [
        {
          id: 'opt-a',
          text: 'Carbon dioxide (CO₂) absorbed from stomata',
          isCorrect: false,
          explanation: 'CO₂ is utilized later in the Calvin cycle to build glucose, not during the light reactions.',
        },
        {
          id: 'opt-b',
          text: 'Water molecules (H₂O) split by the oxygen-evolving complex',
          isCorrect: true,
          explanation: 'Correct! Photolysis splits 2H₂O into 4H⁺, 4e⁻, and O₂. These 4e⁻ continuously replenish PS II.',
        },
        {
          id: 'opt-c',
          text: 'Glucose molecules stored in the plant roots',
          isCorrect: false,
          explanation: 'Glucose is the final product created later in the dark reactions.',
        },
        {
          id: 'opt-d',
          text: 'ATP molecules generated in the mitochondria',
          isCorrect: false,
          explanation: 'ATP is a product of this reaction, not an electron donor for PS II.',
        },
      ],
    },
  },
  {
    id: 'concept-2',
    index: 2,
    title: 'Calvin Cycle: Carbon Fixation & Glucose Synthesis',
    subtitle: 'Utilizing ATP & NADPH in the stroma to convert inorganic CO₂ into organic sugars.',
    topic: 'Biology',
    chapter: 'Chapter 6: Life Processes',
    estimatedTime: '8 min',
    difficulty: 'Intermediate',
    whyItMatters: {
      headline: 'The fundamental bridge converting inorganic carbon into the building blocks of life.',
      description:
        'Without the enzyme RuBisCO and the Calvin cycle, atmospheric carbon dioxide could never enter the biological food web.',
      keyMetric: '400B',
      metricLabel: 'Tons of CO₂ converted into biomass annually',
    },
    simpleExplanation: {
      coreIntuition:
        'Think of the Calvin Cycle as a molecular sugar factory. It takes 1-carbon gas molecules (CO₂) from the air and stitches them together with 5-carbon acceptor molecules (RuBP) using the chemical batteries (ATP & NADPH) made in the light reactions. For every 3 turns of the cycle, one net 3-carbon sugar (G3P) is exported.',
      analogyTitle: 'The Molecular Assembly Line',
      analogyText:
        'Raw material (CO₂) is captured by a specialized robotic gripper (RuBisCO) onto a conveyor chassis (RuBP). High-energy toolkits (ATP & NADPH) modify the chassis into finished sugar products (G3P) before resetting the assembly belt for the next batch.',
      scientificEquation: '3 CO₂ + 9 ATP + 6 NADPH ➔ 1 G3P (Sugar) + 9 ADP + 8 Pi + 6 NADP⁺',
    },
    diagram: {
      title: 'Tri-Phase Stroma Carbon Fixation Cycle',
      subtitle: 'The cyclical regeneration of ribulose-1,5-bisphosphate and export of triose phosphates.',
      steps: [
        {
          id: 'step-1',
          number: 1,
          title: 'Phase 1: Carbon Fixation (RuBisCO)',
          subtitle: 'CO₂ attached to 5C RuBP',
          detail:
            'Atmospheric CO₂ is fixed onto a 5-carbon sugar (RuBP) by the enzyme RuBisCO, forming an unstable 6-carbon intermediate that immediately splits into two 3-phosphoglycerate (3-PGA) molecules.',
          highlightKey: 'fixation',
          analogy: 'Catching floating carbon atoms and welding them onto a structural frame.',
        },
        {
          id: 'step-2',
          number: 2,
          title: 'Phase 2: Reduction & Energy Input',
          subtitle: 'ATP & NADPH convert 3-PGA into G3P',
          detail:
            'Each 3-PGA receives a phosphate group from ATP and is reduced by electrons from NADPH to form high-energy glyceraldehyde-3-phosphate (G3P).',
          highlightKey: 'reduction',
          analogy: 'Using stored battery packs to energize and sculpt the raw metal frame into a finished component.',
        },
        {
          id: 'step-3',
          number: 3,
          title: 'Phase 3: Sugar Export & RuBP Regeneration',
          subtitle: 'Exporting 1 G3P and resetting the cycle',
          detail:
            'One net G3P molecule exits the cycle to form glucose and starch. The remaining five G3P molecules are rearranged using ATP to regenerate three RuBP acceptor molecules, keeping the cycle continuous.',
          highlightKey: 'regeneration',
          analogy: 'Outputting 1 unit of product while cycling remaining parts back to the start of the conveyor line.',
        },
      ],
    },
    keyTakeaways: [
      'Occurs in the stroma (fluid matrix) of the chloroplast.',
      'Often called the "Light-Independent Reaction" or "Dark Reaction", but relies on products (ATP, NADPH) from light reactions.',
      'RuBisCO is the most abundant enzyme on planet Earth.',
      'Six full turns of the cycle (6 CO₂) are required to produce one 6-carbon glucose molecule (C₆H₁₂O₆).',
    ],
    examTip:
      'Exam insight: The direct product of the Calvin cycle is NOT glucose directly, but a 3-carbon sugar called G3P (Glyceraldehyde-3-phosphate). Two G3Ps combine in the cytoplasm to form glucose.',
    quickCheck: {
      question: 'Which enzyme catalyzes the initial fixation of carbon dioxide to RuBP in the stroma?',
      prompt: 'Check your mastery of the rate-limiting step:',
      hint: 'It is considered the most abundant enzyme on Earth.',
      options: [
        {
          id: 'opt-a',
          text: 'ATP Synthase',
          isCorrect: false,
          explanation: 'ATP Synthase synthesizes ATP during photophosphorylation and respiration.',
        },
        {
          id: 'opt-b',
          text: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase)',
          isCorrect: true,
          explanation: 'Correct! RuBisCO catalyzes the addition of CO₂ to RuBP to initiate carbon fixation.',
        },
        {
          id: 'opt-c',
          text: 'DNA Polymerase III',
          isCorrect: false,
          explanation: 'DNA Polymerase is involved in DNA replication, not photosynthesis.',
        },
        {
          id: 'opt-d',
          text: 'Cytochrome Oxidase',
          isCorrect: false,
          explanation: 'Cytochrome Oxidase is part of mitochondrial cellular respiration.',
        },
      ],
    },
  },
  {
    id: 'concept-3',
    index: 3,
    title: 'Cellular Respiration & Glycolytic Pathway',
    subtitle: 'Anaerobic cytoplasmic breakdown of glucose into pyruvate with initial ATP yield.',
    topic: 'Biology',
    chapter: 'Chapter 6: Life Processes',
    estimatedTime: '6 min',
    difficulty: 'Foundation',
    whyItMatters: {
      headline: 'The ancient universal pathway for extracting usable energy from food.',
      description:
        'Shared across nearly all living organisms—from primitive anaerobic bacteria to complex human neurons.',
      keyMetric: '10',
      metricLabel: 'Enzyme-catalyzed steps in cytoplasm',
    },
    simpleExplanation: {
      coreIntuition:
        'Glycolysis is like splitting a $100 bill into smaller change. One 6-carbon glucose molecule is cleaved into two 3-carbon pyruvate molecules in the cell cytoplasm. The cell invests 2 ATP upfront as priming energy, and reaps 4 ATP plus 2 NADH, netting a profit of +2 ATP.',
      analogyTitle: 'The Business Investment Model',
      analogyText:
        'You invest $2 to start a manufacturing process. By the time raw materials are split and refined, you generate $4 in cash plus 2 valuable vouchers (NADH). Net immediate profit: +$2 cash.',
      scientificEquation: 'Glucose (6C) + 2 NAD⁺ + 2 ADP + 2 Pi ➔ 2 Pyruvate (3C) + 2 NADH + 2 ATP + 2 H₂O',
    },
    diagram: {
      title: 'Cytoplasmic Glycolysis Phases',
      subtitle: 'Energy investment followed by energy payoff.',
      steps: [
        {
          id: 'step-1',
          number: 1,
          title: 'Energy Investment Phase',
          subtitle: 'Spending 2 ATP to destabilize glucose',
          detail:
            'Two ATP molecules donate phosphate groups to glucose, forming Fructose-1,6-bisphosphate. This traps glucose inside the cell and primes it for splitting.',
          highlightKey: 'investment',
          analogy: 'Paying upfront fuel costs to ignite a controlled furnace fire.',
        },
        {
          id: 'step-2',
          number: 2,
          title: 'Cleavage Phase',
          subtitle: 'Splitting into two 3-carbon sugars',
          detail:
            'The 6-carbon ring is cleaved into two distinct 3-carbon isomers: DHAP and G3P. An isomerase rapidly converts all DHAP into G3P.',
          highlightKey: 'cleavage',
          analogy: 'Slicing a dual-core raw log into two identical combustion rods.',
        },
        {
          id: 'step-3',
          number: 3,
          title: 'Energy Payoff Phase',
          subtitle: 'Yielding 4 ATP and 2 NADH',
          detail:
            'Enzymatic substrate-level phosphorylation creates 4 ATP molecules while NAD⁺ is reduced to 2 NADH. The final products are two 3-carbon pyruvate molecules.',
          highlightKey: 'payoff',
          analogy: 'Harvesting double the invested energy output plus high-value vouchers.',
        },
      ],
    },
    keyTakeaways: [
      'Occurs in the cytoplasm (cytosol), requiring NO oxygen (strictly anaerobic).',
      'Net energy yield per glucose: 2 ATP (net) + 2 NADH + 2 Pyruvate.',
      'If oxygen is present, pyruvate moves into the mitochondria for the Krebs Cycle.',
      'If oxygen is absent, pyruvate enters fermentation (lactic acid or ethanol).',
    ],
    examTip:
      'Common question: Does glycolysis require oxygen? Answer: No! Glycolysis is anaerobic and occurs in both aerobic respiration and fermentation.',
    quickCheck: {
      question: 'What is the NET gain of ATP molecules produced directly from one molecule of glucose during glycolysis?',
      prompt: 'Calculate the energy accounting:',
      hint: 'Remember that 2 ATP are consumed in the investment phase and 4 ATP are generated in the payoff phase.',
      options: [
        {
          id: 'opt-a',
          text: '4 ATP',
          isCorrect: false,
          explanation: 'Gross production is 4 ATP, but 2 ATP were invested upfront, so net gain is less.',
        },
        {
          id: 'opt-b',
          text: '2 ATP',
          isCorrect: true,
          explanation: 'Correct! Gross yield (4 ATP) minus Investment (2 ATP) = 2 net ATP per glucose.',
        },
        {
          id: 'opt-c',
          text: '36 ATP',
          isCorrect: false,
          explanation: '36–38 ATP is the estimated total yield of complete aerobic cellular respiration, not glycolysis alone.',
        },
        {
          id: 'opt-d',
          text: '0 ATP',
          isCorrect: false,
          explanation: 'Glycolysis yields a positive net gain of usable cellular energy.',
        },
      ],
    },
  },
  {
    id: 'concept-4',
    index: 4,
    title: 'Oxidative Phosphorylation & ATP Yields',
    subtitle: 'Mitochondrial inner membrane electron transport chain and chemiosmotic ATP synthesis.',
    topic: 'Biology',
    chapter: 'Chapter 6: Life Processes',
    estimatedTime: '8 min',
    difficulty: 'Advanced',
    whyItMatters: {
      headline: 'The biochemical powerhouse that produces over 90% of cellular energy in aerobic life.',
      description:
        'Harnesses electrons carried by NADH and FADH₂ to generate massive ATP quantities needed for muscle contraction, brain activity, and cellular repair.',
      keyMetric: '30–32',
      metricLabel: 'Total ATP generated per glucose molecule',
    },
    simpleExplanation: {
      coreIntuition:
        'All the NADH and FADH₂ electron carrier vouchers collected from glycolysis and the Krebs cycle are cashed in here. Electrons pass through Complexes I–IV on the mitochondrial cristae, pumping protons into the intermembrane space. Oxygen serves as the final vacuum cleaner (terminal electron acceptor), combining with electrons and protons to form clean water (H₂O).',
      analogyTitle: 'The Hydro-Turbine Power Plant',
      analogyText:
        'Electron carriers deliver coal fuel to steam pumps that push water into an upper reservoir. Oxygen acts as the chimney exhaust valve. The water rushes down through ATP Synthase turbines, illuminating the entire cell with energy.',
      scientificEquation: '10 NADH + 2 FADH₂ + 6 O₂ + ~28 ADP + 28 Pi ➔ 10 NAD⁺ + 2 FAD + 12 H₂O + ~28 ATP',
    },
    diagram: {
      title: 'Mitochondrial Cristae Electron Transport Chain',
      subtitle: 'Complexes I, II, III, IV and the F₀F₁ ATP Synthase rotor.',
      steps: [
        {
          id: 'step-1',
          number: 1,
          title: 'Electron Delivery (Complex I & II)',
          subtitle: 'NADH & FADH₂ oxidation',
          detail:
            'NADH drops high-energy electrons at Complex I (NADH dehydrogenase), while FADH₂ transfers electrons at Complex II (Succinate dehydrogenase). Both transfer electrons to Coenzyme Q (Ubiquinone).',
          highlightKey: 'complex1_2',
          analogy: 'Fuel trucks unloading high-octane energy to central pumping stations.',
        },
        {
          id: 'step-2',
          number: 2,
          title: 'Proton Pumping across Inner Membrane',
          subtitle: 'Creating the mitochondrial proton gradient',
          detail:
            'As electrons flow through Complex I, III, and IV, H⁺ protons are pumped from the mitochondrial matrix into the intermembrane space, building strong positive charge and low pH.',
          highlightKey: 'proton_pumping',
          analogy: 'Water pumps creating immense water pressure behind a massive hydro dam wall.',
        },
        {
          id: 'step-3',
          number: 3,
          title: 'Terminal Electron Acceptance by O₂',
          subtitle: 'Oxygen reduced to H₂O',
          detail:
            'At Complex IV (Cytochrome c oxidase), depleted electrons combine with molecular oxygen (O₂) and matrix protons (H⁺) to form harmless metabolic water (H₂O).',
          highlightKey: 'oxygen',
          analogy: 'The exhaust condenser safely neutralizing hot combustion gases into pure water.',
        },
        {
          id: 'step-4',
          number: 4,
          title: 'ATP Synthase Rotary Dynamo',
          subtitle: 'Chemiosmotic ATP manufacturing',
          detail:
            'Protons stream back into the matrix through the F₀ subunit rotor of ATP Synthase, rotating the catalytic F₁ head to synthesize ~26–28 ATP molecules per original glucose.',
          highlightKey: 'atp_rotor',
          analogy: 'High-pressure water rotating turbine shafts to generate thousands of kilowatt hours.',
        },
      ],
    },
    keyTakeaways: [
      'Located on the inner mitochondrial membrane (cristae).',
      'Oxygen is the terminal electron acceptor; without O₂, the entire chain jams and ATP production halts.',
      'NADH yields approximately ~2.5 ATP, while FADH₂ yields ~1.5 ATP.',
      'Cyanide and Carbon Monoxide are lethal because they inhibit Complex IV.',
    ],
    examTip:
      'High-yield distinction: Substrate-level phosphorylation happens in glycolysis and Krebs cycle; Oxidative phosphorylation happens at ATP Synthase via proton gradients and electron transport chains.',
    quickCheck: {
      question: 'What is the final (terminal) electron acceptor in the mitochondrial electron transport chain during aerobic respiration?',
      prompt: 'Identify the crucial element in aerobic metabolism:',
      hint: 'Without this inhaled gas, the electron transport chain backs up and ceases functioning.',
      options: [
        {
          id: 'opt-a',
          text: 'Carbon dioxide (CO₂)',
          isCorrect: false,
          explanation: 'CO₂ is a waste product of the Krebs cycle, not an electron acceptor in the ETC.',
        },
        {
          id: 'opt-b',
          text: 'Molecular Oxygen (O₂)',
          isCorrect: true,
          explanation: 'Correct! Oxygen accepts 4 electrons and 4 protons at Complex IV to form two water (H₂O) molecules.',
        },
        {
          id: 'opt-c',
          text: 'Pyruvate',
          isCorrect: false,
          explanation: 'Pyruvate acts as an electron acceptor only in anaerobic lactic acid fermentation.',
        },
        {
          id: 'opt-d',
          text: 'NAD⁺',
          isCorrect: false,
          explanation: 'NAD⁺ is an electron carrier that delivers electrons, not the terminal acceptor.',
        },
      ],
    },
  },
];
