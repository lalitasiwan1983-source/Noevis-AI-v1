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

interface DeskLearningSurfaceProps {
  activeMode: DeskWorkspaceMode;
  contextData: DeskContextData;
  onOpenAskNoevis: () => void;
  onOpenReference: () => void;
  onChangeMode: (mode: DeskWorkspaceMode) => void;
  onNextConcept: () => void;
  onPrevConcept: () => void;
}

export const DeskLearningSurface: React.FC<DeskLearningSurfaceProps> = ({
  activeMode,
  contextData,
  onOpenAskNoevis,
  onOpenReference,
  onChangeMode,
  onNextConcept,
  onPrevConcept,
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

        {/* MODE: REVIEW */}
        {activeMode === 'review' && (
          <motion.div
            key="desk-surface-review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col items-stretch"
          >
            <div className="w-full pb-6 border-b border-[#E5E7EB] mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#374151] shadow-2xs mb-3">
                <RotateCcw className="w-3.5 h-3.5 text-[#111827]" />
                <span>Spaced Review</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Review & Summary
              </h2>
              <p className="text-base text-[#667085] mt-1.5">
                Consolidated key takeaways, high-yield cheat sheet, and diagram summaries.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-8 sm:p-12 flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mb-5">
                <RotateCcw className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">Review Workspace</h3>
              <p className="text-[15px] text-[#667085] max-w-md mb-6 leading-relaxed">
                Synthesized concept highlights and spaced repetition reminders will be displayed here.
              </p>
              <button
                type="button"
                onClick={() => onChangeMode('learn')}
                className="h-10 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] text-sm font-semibold transition-colors cursor-pointer"
              >
                ← Return to Learn Mode
              </button>
            </div>
          </motion.div>
        )}

        {/* MODE: NOTES */}
        {activeMode === 'notes' && (
          <motion.div
            key="desk-surface-notes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col items-stretch"
          >
            <div className="w-full pb-6 border-b border-[#E5E7EB] mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#374151] shadow-2xs mb-3">
                <FileEdit className="w-3.5 h-3.5 text-[#111827]" />
                <span>Personal Scratchpad</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Desk Notes
              </h2>
              <p className="text-base text-[#667085] mt-1.5">
                Your annotations, bookmarked excerpts, and handwritten notes for this topic.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-8 sm:p-12 flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mb-5">
                <FileEdit className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">Notes Workspace</h3>
              <p className="text-[15px] text-[#667085] max-w-md mb-6 leading-relaxed">
                Markdown note-taking canvas and highlighted source clips will appear here.
              </p>
              <button
                type="button"
                onClick={() => onChangeMode('learn')}
                className="h-10 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] text-sm font-semibold transition-colors cursor-pointer"
              >
                ← Return to Learn Mode
              </button>
            </div>
          </motion.div>
        )}

        {/* MODE: MORE / EXTENDED */}
        {activeMode === 'more' && (
          <motion.div
            key="desk-surface-more"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col items-stretch"
          >
            <div className="w-full pb-6 border-b border-[#E5E7EB] mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#374151] shadow-2xs mb-3">
                <Layers className="w-3.5 h-3.5 text-[#111827]" />
                <span>Extended Learning Suite</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                Extended Tools
              </h2>
              <p className="text-base text-[#667085] mt-1.5">
                Flashcard generator, concept graph, and vocabulary glossary.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-8 sm:p-12 flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mb-5">
                <Layers className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">Extended Workspace Tools</h3>
              <p className="text-[15px] text-[#667085] max-w-md mb-6 leading-relaxed">
                Additional multi-modal learning representations will be hosted here.
              </p>
              <button
                type="button"
                onClick={() => onChangeMode('learn')}
                className="h-10 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] text-sm font-semibold transition-colors cursor-pointer"
              >
                ← Return to Learn Mode
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
