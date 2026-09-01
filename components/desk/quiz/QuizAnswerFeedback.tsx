'use client';

import React from 'react';
import {
  CheckCircle2,
  Info,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { QuizQuestion } from './types';

interface QuizAnswerFeedbackProps {
  question: QuizQuestion;
  isCorrect: boolean;
  onNextQuestion: () => void;
  onOpenAskNoevis?: () => void;
  onReviewConcept?: (conceptIndex: number) => void;
  isLastQuestion: boolean;
}

export const QuizAnswerFeedback: React.FC<QuizAnswerFeedbackProps> = ({
  question,
  isCorrect,
  onNextQuestion,
  onOpenAskNoevis,
  onReviewConcept,
  isLastQuestion,
}) => {
  return (
    <div
      id="quiz-answer-feedback"
      className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 animate-fade-in ${
        isCorrect
          ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
          : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
      }`}
    >
      {/* 1. Header Banner */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-xs shrink-0 ${
              isCorrect ? 'bg-[#16A34A]' : 'bg-[#D97706]'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-inherit">
              {isCorrect ? 'Correct!' : 'Not quite — review the principle'}
            </h3>
            <p className="text-xs sm:text-sm opacity-90">
              {isCorrect
                ? 'Your understanding of this biological mechanism is solid.'
                : 'Understanding why will strengthen your mental model.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Scientific Explanation Section */}
      <div className="pt-3 border-t border-inherit/20 space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider block">
            Core Scientific Mechanism
          </span>
          <p className="text-xs sm:text-[14.5px] text-inherit leading-relaxed font-medium">
            {question.explanation.corePrinciple}
          </p>
        </div>

        {/* Concept Anchor Card */}
        <div className="p-3.5 rounded-2xl bg-[#FFFFFF]/85 border border-inherit/30 text-xs text-[#374151] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#6B7280] shrink-0" />
            <span className="font-semibold text-[#111827]">
              {question.explanation.conceptAnchor}
            </span>
          </div>

          {onReviewConcept && (
            <button
              type="button"
              onClick={() => onReviewConcept(question.explanation.conceptIndex)}
              className="text-xs font-bold text-[#111827] hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Review this concept</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Action Navigation Row */}
      <div className="pt-3 border-t border-inherit/20 flex flex-wrap items-center justify-between gap-3">
        {onOpenAskNoevis ? (
          <button
            type="button"
            onClick={onOpenAskNoevis}
            className="min-h-[42px] px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#D1D5DB] text-xs sm:text-sm font-semibold text-[#111827] flex items-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Ask Noevis about this</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onNextQuestion}
          className="min-h-[44px] px-7 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
        >
          <span>{isLastQuestion ? 'View Quiz Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
