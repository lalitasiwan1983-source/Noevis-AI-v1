'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';

interface QuizHeaderProps {
  currentIndex: number; // 0-based
  totalQuestions: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentIndex,
  totalQuestions,
}) => {
  const currentNum = currentIndex + 1;
  const progressRatio = totalQuestions > 0 ? (currentNum / totalQuestions) * 100 : 0;

  return (
    <header id="quiz-header" className="w-full shrink-0 space-y-3">
      {/* Top Meta Row */}
      <div className="flex items-center justify-between">
        {/* Left: Soft pastel orange/amber Quiz Icon + Title */}
        <div className="flex items-center gap-2.5">
          <div
            id="quiz-icon-badge"
            className="w-6 h-6 rounded-[6px] bg-[#FFF7ED] border border-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0 shadow-2xs"
            aria-hidden="true"
          >
            <CheckSquare className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h1 className="text-[15px] font-semibold text-[#111827] tracking-tight">
            Quiz
          </h1>
        </div>

        {/* Right: Question progress text */}
        <div className="text-[13px] sm:text-[14px] font-medium text-[#667085] tabular-nums">
          <span id="quiz-progress-text">{currentNum} of {totalQuestions}</span>
        </div>
      </div>

      {/* Subtle thin progress bar (3px) */}
      <div
        className="w-full h-[3px] rounded-full bg-[#EEF0F3] overflow-hidden"
        role="progressbar"
        aria-valuenow={currentNum}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${currentNum} of ${totalQuestions}`}
      >
        <div
          id="quiz-progress-indicator"
          className="h-full bg-[#4B5BEA] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressRatio}%` }}
        />
      </div>
    </header>
  );
};
