'use client';

import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Square,
  CheckSquare,
  Circle,
  HelpCircle,
  Sparkles,
  FlaskConical,
  Atom,
} from 'lucide-react';
import { QuizQuestion, QuizOption } from './types';

interface QuizQuestionViewProps {
  question: QuizQuestion;
  selectedOptionIds: string[];
  isSubmitted: boolean;
  onToggleOption: (optionId: string) => void;
  onSubmitAnswer: () => void;
}

export const QuizQuestionView: React.FC<QuizQuestionViewProps> = ({
  question,
  selectedOptionIds,
  isSubmitted,
  onToggleOption,
  onSubmitAnswer,
}) => {
  const isMultiSelect = question.type === 'multi-select';

  // Calculate if answer is ready to submit
  const canSubmit = selectedOptionIds.length > 0 && !isSubmitted;

  return (
    <div className="w-full space-y-6">
      {/* 1. Primary Question Prompt */}
      <div className="space-y-3">
        <h2
          id="quiz-question-prompt"
          className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#111827] tracking-tight leading-snug"
        >
          {question.prompt}
        </h2>

        {/* Optional Context Formula / Callout */}
        {question.contextFormula && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shrink-0 shadow-2xs">
              <Atom className="w-4 h-4 text-[#111827]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                Chemical Formula Context
              </span>
              <code className="text-xs sm:text-[13.5px] font-mono font-bold text-[#111827]">
                {question.contextFormula}
              </code>
            </div>
          </div>
        )}

        {question.contextSnippet && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#92400E] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>{question.contextSnippet}</span>
          </div>
        )}
      </div>

      {/* 2. Answer Selection List */}
      <div className="space-y-3" role="group" aria-label="Quiz Answer Choices">
        {question.options.map((option: QuizOption) => {
          const isSelected = selectedOptionIds.includes(option.id);
          const isOptionCorrect = option.isCorrect;

          let cardStyle =
            'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFB] hover:border-[#D1D5DB] text-[#374151] shadow-2xs';

          if (isSubmitted) {
            if (isOptionCorrect && isSelected) {
              cardStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534] ring-1 ring-[#86EFAC]';
            } else if (isOptionCorrect && !isSelected) {
              cardStyle = 'border-[#86EFAC] bg-[#F0FDF4]/60 text-[#166534] border-dashed';
            } else if (!isOptionCorrect && isSelected) {
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
              onClick={() => onToggleOption(option.id)}
              className={`w-full min-h-[58px] p-4 sm:p-5 rounded-2xl border text-left flex items-start justify-between gap-3.5 transition-all cursor-pointer ${cardStyle}`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Letter or check indicator */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSubmitted && isOptionCorrect
                      ? 'bg-[#16A34A] text-white'
                      : isSubmitted && isSelected && !isOptionCorrect
                      ? 'bg-[#DC2626] text-white'
                      : isSelected
                      ? 'bg-[#111827] text-white'
                      : 'bg-[#F3F4F6] text-[#374151]'
                  }`}
                >
                  {isMultiSelect ? (
                    isSelected ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 opacity-40" />
                    )
                  ) : (
                    <span>{option.letter}</span>
                  )}
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-sm sm:text-[15.5px] font-bold leading-snug block">
                    {option.text}
                  </span>
                  {option.detail && (
                    <p className="text-xs sm:text-[13px] opacity-80 leading-relaxed">
                      {option.detail}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Icons */}
              {isSubmitted && (
                <div className="shrink-0 mt-0.5">
                  {isOptionCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-[#DC2626]" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Check Answer CTA (when not submitted) */}
      {!isSubmitted && (
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-[#6B7280]">
            {isMultiSelect
              ? 'Select all correct options, then submit.'
              : 'Choose the best answer, then submit.'}
          </span>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={onSubmitAnswer}
            className={`min-h-[46px] px-7 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              canSubmit
                ? 'bg-[#111827] hover:bg-[#1F2937] active:bg-[#000000] text-white cursor-pointer shadow-sm hover:translate-x-0.5'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <span>Check Answer</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
