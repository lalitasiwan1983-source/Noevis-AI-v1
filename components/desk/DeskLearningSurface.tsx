'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Sparkles,
  HelpCircle,
  RotateCcw,
  FileEdit,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DeskWorkspaceMode, DeskContextData } from './types';
import { LearnExperience } from './learn';
import { PracticeExperience } from './practice';
import { QuizExperience } from './quiz';
import { ReviewExperience } from './review';
import { NotesExperience, DeskNote } from './notes';
import { MoreCapabilityView, MoreToolId } from './more';

interface DeskLearningSurfaceProps {
  activeMode: DeskWorkspaceMode;
  contextData: DeskContextData;
  activeMoreTool?: MoreToolId;
  onOpenAskNoevis: () => void;
  onOpenReference: () => void;
  onChangeMode: (mode: DeskWorkspaceMode) => void;
  onNextConcept: () => void;
  onPrevConcept: () => void;
  onSelectConcept?: (conceptIndex: number) => void;
  note?: DeskNote;
  onNoteChange?: (note: DeskNote) => void;
}

export const DeskLearningSurface: React.FC<DeskLearningSurfaceProps> = ({
  activeMode,
  contextData,
  activeMoreTool = 'summary',
  onOpenAskNoevis,
  onOpenReference,
  onChangeMode,
  onNextConcept,
  onPrevConcept,
  onSelectConcept,
  note,
  onNoteChange,
}) => {
  return (
    <div
      id="desk-main-learning-surface"
      className="w-full flex-1 flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8"
    >
      <AnimatePresence mode="wait">
        {/* MODE: LEARN (Rich Phase 2 Experience) */}
        {activeMode === 'learn' && (
          <div key="desk-surface-learn-container" className="w-full">
            <LearnExperience
              conceptIndex={contextData.conceptIndex}
              totalConcepts={contextData.totalConcepts}
              onNextConcept={onNextConcept}
              onPrevConcept={onPrevConcept}
              onOpenAskNoevis={onOpenAskNoevis}
              onOpenReference={onOpenReference}
            />
          </div>
        )}

        {/* MODE: PRACTICE (Rich Phase 3 Experience) */}
        {activeMode === 'practice' && (
          <div key="desk-surface-practice-container" className="w-full">
            <PracticeExperience
              currentConceptIndex={contextData.conceptIndex}
              onSwitchToLearn={() => onChangeMode('learn')}
              onOpenAskNoevis={onOpenAskNoevis}
              onChangeMode={onChangeMode}
            />
          </div>
        )}

        {/* MODE: QUIZ (Rich Phase 4 Experience) */}
        {activeMode === 'quiz' && (
          <div key="desk-surface-quiz-container" className="w-full">
            <QuizExperience
              topicTitle={contextData.topic}
              chapterTitle={contextData.chapter}
              currentConceptIndex={contextData.conceptIndex}
              onSwitchToLearn={() => onChangeMode('learn')}
              onOpenAskNoevis={onOpenAskNoevis}
              onChangeMode={onChangeMode}
            />
          </div>
        )}

        {/* MODE: REVIEW (Rich Phase 5 Experience) */}
        {activeMode === 'review' && (
          <div key="desk-surface-review-container" className="w-full">
            <ReviewExperience
              topicTitle={contextData.topic}
              chapterTitle={contextData.chapter}
              onSwitchMode={onChangeMode}
              onSelectConcept={onSelectConcept}
              onOpenAskNoevis={onOpenAskNoevis}
            />
          </div>
        )}

        {/* MODE: NOTES (Rich Phase 6 Experience) */}
        {activeMode === 'notes' && (
          <div key="desk-surface-notes-container" className="w-full">
            <NotesExperience
              topicTitle={contextData.topic}
              chapterTitle={contextData.chapter}
              conceptName={contextData.currentConcept}
              conceptIndex={contextData.conceptIndex}
              initialNote={note}
              onNoteChange={onNoteChange}
              onOpenAskNoevis={onOpenAskNoevis}
            />
          </div>
        )}

        {/* MODE: MORE / SECONDARY CAPABILITIES (Phase 7 Experience) */}
        {activeMode === 'more' && (
          <div key="desk-surface-more-container" className="w-full">
            <MoreCapabilityView
              toolId={activeMoreTool}
              topic={contextData.topic}
              chapter={contextData.chapter}
              conceptName={contextData.currentConcept}
              conceptIndex={contextData.conceptIndex}
              onBack={() => onChangeMode('learn')}
              onOpenAskNoevis={onOpenAskNoevis}
              onOpenReference={onOpenReference}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

