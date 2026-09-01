'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { QuickCheckQuestion, QuickCheckOption } from './types';

interface QuickCheckProps {
  quickCheck: QuickCheckQuestion;
  conceptIndex: number;
  totalConcepts: number;
  onNextConcept?: () => void;
  onOpenAskNoevis?: () => void;
}

export const QuickCheck: React.FC<QuickCheckProps> = ({
  quickCheck,
  conceptIndex,
  totalConcepts,
  onNextConcept,
  onOpenAskNoevis,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOption = quickCheck.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;
  const hasNext = conceptIndex < totalConcepts;

  const handleSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  return (
    <section
      id="learn-quick-check-section"
      className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] p-5 sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#111827] tracking-tight">
              Quick Check: Got it?
            </h3>
            <p className="text-xs text-[#6B7280]">
              Test your understanding before advancing to the next concept.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563]">
          Concept Checkpoint
        </span>
      </div>

      {/* Question Prompt */}
      <div className="mb-5">
        <p className="text-xs sm:text-sm font-medium text-[#6B7280] mb-1">
          {quickCheck.prompt}
        </p>
        <h4 className="text-base sm:text-lg font-bold text-[#111827] leading-snug">
          {quickCheck.question}
        </h4>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5 mb-6">
        {quickCheck.options.map((option: QuickCheckOption, idx: number) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx);

          let optionStyle =
            'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFB] hover:border-[#D1D5DB] text-[#374151]';

          if (isSubmitted) {
            if (option.isCorrect) {
              optionStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534] font-medium';
            } else if (isSelected && !option.isCorrect) {
              optionStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B]';
            } else {
              optionStyle = 'border-[#E5E7EB] bg-[#FFFFFF] opacity-50 text-[#9CA3AF]';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              disabled={isSubmitted}
              className={`w-full min-h-[48px] sm:min-h-[52px] p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSubmitted && option.isCorrect
                      ? 'bg-[#16A34A] text-white'
                      : isSubmitted && isSelected && !option.isCorrect
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-[#F3F4F6] text-[#4B5563]'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-xs sm:text-[14.5px] leading-snug">
                  {option.text}
                </span>
              </div>

              {isSubmitted && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
              )}
              {isSubmitted && isSelected && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-[#DC2626] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Visual Feedback */}
      {isSubmitted && selectedOption && (
        <div
          className={`p-4 sm:p-5 rounded-xl border mb-6 transition-all ${
            isCorrect
              ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
              : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h5 className="text-xs sm:text-sm font-bold">
                {isCorrect ? 'Well done! That is correct.' : 'Not quite right.'}
              </h5>
              <p className="text-xs sm:text-sm leading-relaxed">
                {selectedOption.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {isSubmitted && !isCorrect ? (
          <button
            type="button"
            onClick={handleReset}
            className="h-10 px-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenAskNoevis}
            className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Need clarification? Ask Noevis</span>
          </button>
        )}

        {isSubmitted && isCorrect && hasNext && (
          <button
            type="button"
            onClick={onNextConcept}
            className="h-11 px-5 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
          >
            <span>Continue to Next Concept</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
