'use client';

import React from 'react';
import { QuizOption } from './types';
import { Check } from 'lucide-react';

interface QuizOptionRowProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export const QuizOptionRow: React.FC<QuizOptionRowProps> = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  return (
    <button
      id={`quiz-option-${option.letter.toLowerCase()}`}
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      className={`group w-full min-h-[56px] py-3.5 px-4 sm:px-5 rounded-[12px] border text-left flex items-center justify-between gap-3.5 cursor-pointer outline-none select-none transition-all duration-[170ms] ease-out focus-visible:ring-2 focus-visible:ring-[#4B5BEA]/40 ${
        isSelected
          ? 'bg-[#F4F5FF] border-[#4B5BEA] ring-1 ring-[#4B5BEA]/30 shadow-2xs'
          : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#FAFBFC] hover:border-[#D1D5DB] hover:-translate-y-[1px]'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Option Letter Badge (A, B, C, D) */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold transition-all duration-180 ${
            isSelected
              ? 'bg-[#4B5BEA] text-white shadow-2xs'
              : 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] group-hover:bg-[#EAECEF]'
          }`}
        >
          {option.letter}
        </div>

        {/* Option Text */}
        <div className="text-[15px] font-medium text-[#111827] leading-snug tracking-normal truncate-none">
          {option.text}
        </div>
      </div>

      {/* Selected Indicator Dot / Check */}
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-180 ${
          isSelected
            ? 'border-[#4B5BEA] bg-[#4B5BEA] scale-100 opacity-100'
            : 'border-[#D1D5DB] bg-transparent opacity-30 group-hover:opacity-60 scale-95'
        }`}
      >
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-white transition-transform duration-180 scale-100" />
        )}
      </div>
    </button>
  );
};
