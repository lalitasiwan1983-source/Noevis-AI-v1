'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { ScenarioOption } from './types';

interface PracticeScenarioTaskProps {
  story: string;
  question: string;
  options: ScenarioOption[];
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean, selectedOptionId: string) => void;
  onReset: () => void;
}

export const PracticeScenarioTask: React.FC<PracticeScenarioTaskProps> = ({
  story,
  question,
  options,
  isSubmitted,
  onCheckAnswer,
  onReset,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (option: ScenarioOption) => {
    if (isSubmitted) return;
    setSelectedOptionId(option.id);
  };

  const handleConfirm = () => {
    if (!selectedOptionId) return;
    const opt = options.find((o) => o.id === selectedOptionId);
    if (opt) {
      onCheckAnswer(opt.isCorrect, opt.id);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Laboratory Case Study Story Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
            <FlaskConical className="w-4 h-4 text-[#111827]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Experimental Laboratory Scenario
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
          {story}
        </p>
      </div>

      {/* Core Question Prompt */}
      <div>
        <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
          Diagnostic Question
        </span>
        <h3 className="text-base sm:text-lg font-bold text-[#111827] mt-1 leading-snug">
          {question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;

          let cardStyle =
            'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFB] hover:border-[#D1D5DB] text-[#374151] shadow-2xs';

          if (isSubmitted) {
            if (isCorrect) {
              cardStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534] ring-1 ring-[#86EFAC]';
            } else if (isSelected && !isCorrect) {
              cardStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B]';
            } else {
              cardStyle = 'border-[#E5E7EB] bg-[#FFFFFF] opacity-50 text-[#9CA3AF]';
            }
          } else if (isSelected) {
            cardStyle = 'border-[#111827] bg-[#F9FAFB] text-[#111827] ring-1 ring-[#111827] shadow-xs';
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelect(option)}
              className={`w-full min-h-[58px] p-4 sm:p-5 rounded-2xl border text-left flex items-start justify-between gap-3.5 transition-all cursor-pointer ${cardStyle}`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isSubmitted && isCorrect
                      ? 'bg-[#16A34A] text-white'
                      : isSubmitted && isSelected && !isCorrect
                      ? 'bg-[#DC2626] text-white'
                      : isSelected
                      ? 'bg-[#111827] text-white'
                      : 'bg-[#F3F4F6] text-[#374151]'
                  }`}
                >
                  {option.letter}
                </span>

                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm sm:text-[15px] font-bold leading-snug">
                    {option.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] opacity-80 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>

              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Validate Choice Button */}
      {!isSubmitted && (
        <div className="pt-2 flex items-center justify-end">
          <button
            type="button"
            disabled={!selectedOptionId}
            onClick={handleConfirm}
            className={`min-h-[44px] px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              selectedOptionId
                ? 'bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer shadow-sm hover:translate-x-0.5'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <span>Submit Diagnosis</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
