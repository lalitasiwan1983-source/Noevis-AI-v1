'use client';

import React, { useState } from 'react';
import { ShortAnswerData } from './types';

interface PracticeShortAnswerTaskProps {
  data: ShortAnswerData;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
  onReset?: () => void;
}

export const PracticeShortAnswerTask: React.FC<PracticeShortAnswerTaskProps> = ({
  data,
  isSubmitted,
  onCheckAnswer,
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim() || isSubmitted) return;
    const cleanInput = value.trim().toLowerCase();
    const matches = data.acceptableAnswers.some((ans) =>
      cleanInput.includes(ans.toLowerCase())
    );
    onCheckAnswer(matches);
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="space-y-3">
        <label className="text-[15.5px] font-medium text-[#374151] block leading-relaxed">
          {data.prompt}
        </label>
        <textarea
          rows={3}
          value={value}
          disabled={isSubmitted}
          onChange={(e) => setValue(e.target.value)}
          placeholder={data.placeholder || 'Type your explanation or response here…'}
          className="w-full bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-2 focus:ring-[#4B5BEA]/10 rounded-[12px] p-4 text-[15px] text-[#111827] placeholder-[#9CA3AF] disabled:bg-[#F9FAFB] disabled:text-[#6B7280] outline-none transition-all resize-none font-sans"
        />
      </div>

      {!isSubmitted && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!value.trim()}
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
