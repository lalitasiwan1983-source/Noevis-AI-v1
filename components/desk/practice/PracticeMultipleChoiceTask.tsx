'use client';

import React, { useState } from 'react';
import { MultipleChoiceData } from './types';
import { Check } from 'lucide-react';

interface PracticeMultipleChoiceTaskProps {
  data: MultipleChoiceData;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
}

export const PracticeMultipleChoiceTask: React.FC<PracticeMultipleChoiceTaskProps> = ({
  data,
  isSubmitted,
  onCheckAnswer,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedId || isSubmitted) return;
    const selected = data.options.find((opt) => opt.id === selectedId);
    onCheckAnswer(selected?.isCorrect ?? false);
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="space-y-3">
        <h3 className="text-[16px] font-semibold text-[#111827] leading-relaxed">
          {data.question}
        </h3>
        <div className="space-y-2.5">
          {data.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            let containerStyle = 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151]';

            if (isSelected) {
              containerStyle = 'bg-[#F4F5FF] border-[#4B5BEA] text-[#111827] ring-1 ring-[#4B5BEA]';
            }

            if (isSubmitted) {
              if (opt.isCorrect) {
                containerStyle = 'bg-[#F0FDF4] border-[#16A34A] text-[#15803D] font-medium';
              } else if (isSelected && !opt.isCorrect) {
                containerStyle = 'bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]';
              } else {
                containerStyle = 'bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF] opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => setSelectedId(opt.id)}
                className={`w-full p-4 rounded-[12px] border text-left flex items-start gap-3 transition-all cursor-pointer ${containerStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-semibold ${
                    isSelected
                      ? 'bg-[#4B5BEA] text-white border-[#4B5BEA]'
                      : 'border-[#D1D5DB] text-[#6B7280]'
                  }`}
                >
                  {isSubmitted && opt.isCorrect ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    opt.label
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-[14.5px] font-medium leading-snug">{opt.text}</div>
                  {isSubmitted && isSelected && (
                    <div className="text-[13px] text-[#6B7280] leading-normal pt-1">
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!isSubmitted && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!selectedId}
            onClick={handleSubmit}
            className="h-[46px] px-6 bg-[#4B5BEA] hover:bg-[#3B4BD8] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] text-white rounded-[12px] font-semibold text-[15px] transition-all cursor-pointer shadow-xs"
          >
            Check Answer →
          </button>
        </div>
      )}
    </div>
  );
};
