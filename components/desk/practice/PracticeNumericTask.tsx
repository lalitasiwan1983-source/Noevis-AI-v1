'use client';

import React, { useState } from 'react';
import { NumericData } from './types';

interface PracticeNumericTaskProps {
  data: NumericData;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
}

export const PracticeNumericTask: React.FC<PracticeNumericTaskProps> = ({
  data,
  isSubmitted,
  onCheckAnswer,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isSubmitted) return;
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      onCheckAnswer(false);
      return;
    }
    const diff = Math.abs(val - data.correctValue);
    onCheckAnswer(diff <= data.tolerance);
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[14px] p-5 space-y-3">
        <h3 className="text-[16px] font-semibold text-[#111827] leading-relaxed">
          {data.problemStatement}
        </h3>
        {data.formulaHint && (
          <p className="text-[13.5px] text-[#6B7280]">
            Formula reference: <code className="bg-[#E5E7EB] px-2 py-0.5 rounded text-[#111827] font-mono">{data.formulaHint}</code>
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          step="any"
          disabled={isSubmitted}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter numeric result..."
          className="w-full max-w-xs h-[46px] px-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-2 focus:ring-[#4B5BEA]/10 rounded-[12px] text-[16px] font-semibold text-[#111827] placeholder-[#9CA3AF] disabled:bg-[#F9FAFB] outline-none transition-all"
        />
        <span className="text-[15px] font-medium text-[#4B5563]">{data.unit}</span>
      </div>

      {!isSubmitted && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!inputValue.trim()}
            onClick={() => handleSubmit()}
            className="h-[46px] px-6 bg-[#4B5BEA] hover:bg-[#3B4BD8] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] text-white rounded-[12px] font-semibold text-[15px] transition-all cursor-pointer shadow-xs"
          >
            Check Answer →
          </button>
        </div>
      )}
    </div>
  );
};
