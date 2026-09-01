'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Info,
} from 'lucide-react';
import { PracticeTask } from './types';

interface PracticeFeedbackCardProps {
  task: PracticeTask;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  showHint: boolean;
  onToggleHint: () => void;
  onRetry: () => void;
  onContinue: () => void;
  onOpenAskNoevis?: () => void;
  onSwitchToLearn?: () => void;
  hasNextTask: boolean;
}

export const PracticeFeedbackCard: React.FC<PracticeFeedbackCardProps> = ({
  task,
  isSubmitted,
  isCorrect,
  showHint,
  onToggleHint,
  onRetry,
  onContinue,
  onOpenAskNoevis,
  onSwitchToLearn,
  hasNextTask,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* 1. Subtle Hint Drawer (Accessible before or after submitting) */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={onToggleHint}
          className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-[#FAFAFB] transition-colors cursor-pointer"
          aria-expanded={showHint}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#111827]">
              {showHint ? 'Hide Hint' : 'Need a hint?'}
            </span>
          </div>

          <span className="text-xs text-[#6B7280]">
            {showHint ? 'Tap to collapse' : 'Subtle clue'}
          </span>
        </button>

        {showHint && (
          <div className="p-4 sm:p-5 pt-0 border-t border-[#F3F4F6] text-xs sm:text-sm text-[#4B5563] leading-relaxed bg-[#FFFDF5]">
            <p className="mt-3 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span>{task.hint}</span>
            </p>
          </div>
        )}
      </div>

      {/* 2. Calm Post-Submission Feedback Card */}
      {isSubmitted && (
        <div
          id="practice-feedback-state"
          className={`p-5 sm:p-6 rounded-2xl border transition-all ${
            isCorrect
              ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
              : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
          }`}
        >
          {/* Header Status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <div className="w-8 h-8 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                  <Info className="w-5 h-5" />
                </div>
              )}

              <div>
                <h4 className="text-base sm:text-lg font-bold text-inherit">
                  {isCorrect ? 'Excellent understanding!' : 'Good try — review the mechanism below'}
                </h4>
                <p className="text-xs sm:text-sm opacity-90">
                  {isCorrect
                    ? 'You have successfully applied this molecular concept.'
                    : 'A common misconception in cellular energetics. Here is how it connects.'}
                </p>
              </div>
            </div>
          </div>

          {/* "Why?" Explanation section connecting Practice back to Learn */}
          <div className="mt-4 pt-4 border-t border-inherit/20 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider">
                Why does this work? (Connected to Learn)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-inherit font-medium leading-relaxed">
              {task.whyExplanation.coreInsight}
            </p>

            <div className="p-3.5 rounded-xl bg-[#FFFFFF]/80 border border-inherit/30 text-xs text-[#374151] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#6B7280]">
                <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Concept Anchor</span>
              </div>
              <p className="leading-relaxed">
                {task.whyExplanation.connectionToLearn}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-3 border-t border-inherit/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {!isCorrect && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="min-h-[42px] px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#D1D5DB] text-xs sm:text-sm font-semibold text-[#111827] flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
                >
                  <RotateCcw className="w-4 h-4 text-[#6B7280]" />
                  <span>Try Again</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenAskNoevis}
                className="min-h-[42px] px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#D1D5DB] text-xs sm:text-sm font-semibold text-[#111827] flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Ask Noevis</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="min-h-[42px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
            >
              <span>{hasNextTask ? 'Continue to Next Task' : 'Complete Practice'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
