'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { QuizQuestion, QuizOption } from './types';

interface QuizQuestionViewProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  isTransitioning?: boolean;
}

export const QuizQuestionView: React.FC<QuizQuestionViewProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
  isTransitioning = false,
}) => {
  const isAnswerSelected = Boolean(selectedOptionId);

  return (
    <div
      id={`quiz-question-workspace-${question.id}`}
      className={`w-full flex-1 flex flex-col justify-between transition-all duration-200 ease-out ${
        isTransitioning
          ? 'opacity-0 -translate-y-1.5'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* 1. TOP QUESTION AREA */}
      <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
        {/* Subtle source / context pill */}
        {question.contextSnippet && (
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-medium text-[#667085] tracking-normal">
              {question.contextSnippet}
            </span>
          </div>
        )}

        {/* Question Prompt (Visual Focus) */}
        <h2
          id="quiz-active-question-prompt"
          className="text-[19px] sm:text-[21px] lg:text-[23px] font-semibold text-[#111827] leading-[1.38] tracking-tight"
        >
          {question.prompt}
        </h2>

        {/* Optional Math / Chemical Formula Display */}
        {question.contextFormula && (
          <div
            id="quiz-math-formula-box"
            className="py-2.5 px-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] inline-flex items-center gap-2 max-w-full"
          >
            <code className="text-[13.5px] sm:text-[14.5px] font-mono font-medium text-[#111827] tracking-wide">
              {question.contextFormula}
            </code>
          </div>
        )}

        {/* Optional Code Block */}
        {question.codeSnippet && (
          <div
            id="quiz-code-block"
            className="w-full rounded-xl bg-[#1E293B] border border-[#334155] p-3 sm:p-3.5 text-left font-mono text-[12.5px] sm:text-[13px] leading-relaxed text-[#F8FAFC] max-h-[140px] overflow-y-auto"
          >
            <pre className="m-0 whitespace-pre-wrap font-mono">
              <code>{question.codeSnippet.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* 2. FOUR HORIZONTAL ANSWER OPTIONS */}
      <div
        className="my-4 sm:my-5 space-y-2.5 sm:space-y-3"
        role="radiogroup"
        aria-label="Answer options"
      >
        {question.options.map((option: QuizOption) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              id={`quiz-option-${option.letter.toLowerCase()}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(option.id)}
              className={`w-full min-h-[56px] sm:min-h-[58px] py-3 px-3.5 sm:px-4 rounded-[13px] border text-left flex items-center justify-between gap-3.5 transition-all duration-150 ease-out cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#F4F5FF] border-[#4B5BEA] ring-1 ring-[#4B5BEA] shadow-2xs'
                  : 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#FAFBFC] hover:border-[#D1D5DB] hover:-translate-y-[1px]'
              }`}
            >
              {/* Left: Option Letter Pill + Text */}
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                {/* Option Letter indicator */}
                <div
                  className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isSelected
                      ? 'bg-[#4B5BEA] text-white scale-100'
                      : 'bg-[#F3F4F6] text-[#4B5563] scale-95'
                  }`}
                  aria-hidden="true"
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{option.letter}</span>
                  )}
                </div>

                {/* Option Label */}
                <span className="text-[14px] sm:text-[15px] font-medium text-[#111827] leading-snug">
                  {option.text}
                </span>
              </div>

              {/* Right: Selected Status Dot (Subtle visual indication) */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 transition-opacity duration-150 ${
                  isSelected ? 'bg-[#4B5BEA] opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {/* 3. PRIMARY ACTION ROW (Bottom-Right [Next →]) */}
      <div className="shrink-0 flex items-center justify-end pt-2 pb-1">
        <button
          id="quiz-primary-action-btn"
          type="button"
          disabled={!isAnswerSelected}
          onClick={onNextQuestion}
          className={`h-[46px] w-[124px] rounded-[12px] text-[14.5px] font-semibold flex items-center justify-center gap-2 transition-all duration-180 select-none ${
            isAnswerSelected
              ? 'bg-[#4B5BEA] hover:bg-[#3D4CD8] active:bg-[#323FB8] text-white shadow-2xs hover:translate-x-0.5 cursor-pointer'
              : 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed opacity-75'
          }`}
        >
          <span>{isLastQuestion ? 'Finish Quiz' : 'Next'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
