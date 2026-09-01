'use client';

import React from 'react';
import {
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Target,
  Zap,
} from 'lucide-react';
import { QuizQuestion } from './types';

interface QuizHeaderProps {
  currentQuestion: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  onExitQuiz?: () => void;
  onOpenAskNoevis?: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  onExitQuiz,
  onOpenAskNoevis,
}) => {
  const currentNum = currentIndex + 1;
  const progressPercentage = Math.round((currentNum / totalQuestions) * 100);

  return (
    <div id="desk-quiz-header" className="w-full pb-5 border-b border-[#E5E7EB]/80 space-y-4">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Index Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937] shadow-2xs">
            <Target className="w-3.5 h-3.5 text-[#111827]" />
            <span>Question {currentNum} of {totalQuestions}</span>
          </span>

          {/* Type Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-xs font-semibold text-[#6D28D9]">
            <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{currentQuestion.typeBadge}</span>
          </span>

          {/* Concept Anchor Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
            <span>{currentQuestion.conceptTag}</span>
          </span>
        </div>

        {/* Compact Progress Bar */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-[#6B7280]">
            Progress: <strong className="text-[#111827]">{progressPercentage}%</strong>
          </span>
          <div className="w-20 sm:w-28 h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
            <div
              className="h-full bg-[#111827] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
