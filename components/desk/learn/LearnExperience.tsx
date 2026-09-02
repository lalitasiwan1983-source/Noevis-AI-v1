'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptHeader } from './ConceptHeader';
import { VisualDiagram } from './VisualDiagram';
import { ExplanationFlow } from './ExplanationFlow';
import { QuickCheck } from './QuickCheck';
import { NextBestAction } from './NextBestAction';
import { LEARN_CONCEPTS } from './data';
import { LearnConceptData } from './types';
import { Layers, Sparkles } from 'lucide-react';

interface LearnExperienceProps {
  conceptIndex: number;
  totalConcepts: number;
  onNextConcept: () => void;
  onPrevConcept: () => void;
  onOpenAskNoevis: () => void;
  onOpenReference: () => void;
}

type InternalLearnSection = 'all' | 'objective' | 'explanation' | 'visual' | 'check' | 'next';

export const LearnExperience: React.FC<LearnExperienceProps> = ({
  conceptIndex,
  totalConcepts,
  onNextConcept,
  onPrevConcept,
  onOpenAskNoevis,
  onOpenReference,
}) => {
  const [activeDiagramStep, setActiveDiagramStep] = useState<number>(0);
  const [activeInternalSection, setActiveInternalSection] = useState<InternalLearnSection>('all');

  // Retrieve current concept data (fallback to first if index out of range)
  const currentConcept: LearnConceptData | undefined =
    LEARN_CONCEPTS.find((c) => c.index === conceptIndex) || LEARN_CONCEPTS[0];

  if (!currentConcept) {
    return (
      <div className="w-full max-w-[840px] mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] border border-[#C7D2FE] flex items-center justify-center text-[#4B5BEA] mx-auto">
          <Layers className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#111827]">Learn Workspace Shell Ready</h2>
        <p className="text-sm text-[#667085] max-w-md mx-auto">
          No active concept loaded. Select a concept or load source material to begin adaptive teaching.
        </p>
      </div>
    );
  }

  const sectionsList: Array<{ id: InternalLearnSection; label: string }> = [
    { id: 'all', label: 'All Sections' },
    { id: 'objective', label: 'Objective' },
    { id: 'explanation', label: 'Explanation' },
    { id: 'visual', label: 'Visual Model' },
    { id: 'check', label: 'Quick Check' },
    { id: 'next', label: 'Next Steps' },
  ];

  return (
    <motion.div
      key={`learn-concept-${currentConcept.id}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="w-full flex flex-col max-w-[820px] mx-auto space-y-8 pb-[56px] pt-[32px] px-6 sm:px-8 md:px-[32px] font-sans"
    >
      {/* 1. CONCEPT HEADER & BREADCRUMB (24-28px title area, Source/Chapter/Concept breadcrumb) */}
      <ConceptHeader
        concept={currentConcept}
        totalConcepts={totalConcepts}
        onNextConcept={onNextConcept}
        onPrevConcept={onPrevConcept}
        onOpenReference={onOpenReference}
        onOpenAskNoevis={onOpenAskNoevis}
      />

      {/* 2. INTERNAL LEARN NAVIGATION TABS */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-[#E5E7EB]">
        {sectionsList.map((sec) => {
          const isActive = activeInternalSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveInternalSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#111827] text-white shadow-2xs font-semibold'
                  : 'text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
            >
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* 3. STRUCTURAL CONTAINERS SYSTEM FOR EDITORIAL LEARNING SURFACE */}

      {/* SECTION CONTAINER 1 & 2: EXPLANATION & OBJECTIVE */}
      {(activeInternalSection === 'all' || activeInternalSection === 'objective' || activeInternalSection === 'explanation') && (
        <ExplanationFlow
          concept={currentConcept}
          onOpenAskNoevis={onOpenAskNoevis}
        />
      )}

      {/* SECTION CONTAINER 3: VISUAL UNDERSTANDING & MODEL */}
      {(activeInternalSection === 'all' || activeInternalSection === 'visual') && (
        <VisualDiagram
          concept={currentConcept}
          activeStepIndex={activeDiagramStep}
          onStepChange={(stepIdx) => setActiveDiagramStep(stepIdx)}
        />
      )}

      {/* SECTION CONTAINER 4: ADAPTIVE QUICK CHECK */}
      {(activeInternalSection === 'all' || activeInternalSection === 'check') && (
        <QuickCheck
          quickCheck={currentConcept.quickCheck}
          conceptIndex={conceptIndex}
          totalConcepts={totalConcepts}
          onNextConcept={onNextConcept}
          onOpenAskNoevis={onOpenAskNoevis}
        />
      )}

      {/* SECTION CONTAINER 5: NEXT BEST ACTION */}
      {(activeInternalSection === 'all' || activeInternalSection === 'next') && (
        <NextBestAction
          conceptTitle={currentConcept.title}
          onNextConcept={onNextConcept}
          onOpenAskNoevis={onOpenAskNoevis}
          onOpenReference={onOpenReference}
        />
      )}
    </motion.div>
  );
};

