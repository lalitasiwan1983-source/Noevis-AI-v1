'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptHeader } from './ConceptHeader';
import { VisualDiagram } from './VisualDiagram';
import { ExplanationFlow } from './ExplanationFlow';
import { QuickCheck } from './QuickCheck';
import { LEARN_CONCEPTS } from './data';
import { LearnConceptData } from './types';

interface LearnExperienceProps {
  conceptIndex: number;
  totalConcepts: number;
  onNextConcept: () => void;
  onPrevConcept: () => void;
  onOpenAskNoevis: () => void;
  onOpenReference: () => void;
}

export const LearnExperience: React.FC<LearnExperienceProps> = ({
  conceptIndex,
  totalConcepts,
  onNextConcept,
  onPrevConcept,
  onOpenAskNoevis,
  onOpenReference,
}) => {
  const [activeDiagramStep, setActiveDiagramStep] = useState<number>(0);

  // Retrieve current concept data (fallback to first if index out of range)
  const currentConcept: LearnConceptData =
    LEARN_CONCEPTS.find((c) => c.index === conceptIndex) || LEARN_CONCEPTS[0];

  return (
    <motion.div
      key={`learn-concept-${currentConcept.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="w-full flex flex-col items-center max-w-4xl mx-auto space-y-8 sm:space-y-12 pb-12"
    >
      {/* 1. CONCEPT HEADER */}
      <ConceptHeader
        concept={currentConcept}
        totalConcepts={totalConcepts}
        onOpenReference={onOpenReference}
        onOpenAskNoevis={onOpenAskNoevis}
      />

      {/* 2. VISUAL EXPLANATION & INTERACTIVE DIAGRAM */}
      <VisualDiagram
        concept={currentConcept}
        activeStepIndex={activeDiagramStep}
        onStepChange={(stepIdx) => setActiveDiagramStep(stepIdx)}
      />

      {/* 3. EXPLANATION FLOW (Why it matters, simple explanation, analogies, takeaways) */}
      <ExplanationFlow
        concept={currentConcept}
        onOpenAskNoevis={onOpenAskNoevis}
      />

      {/* 4. QUICK CHECK (Mastery checkpoint) */}
      <QuickCheck
        quickCheck={currentConcept.quickCheck}
        conceptIndex={conceptIndex}
        totalConcepts={totalConcepts}
        onNextConcept={onNextConcept}
        onOpenAskNoevis={onOpenAskNoevis}
      />
    </motion.div>
  );
};
