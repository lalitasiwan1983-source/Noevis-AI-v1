'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { ReviewConceptItem } from './types';
import { useToast } from '@/components/design-system/Toast';

interface RecoveryConceptViewProps {
  concept: ReviewConceptItem;
  onBackToReview: () => void;
  onOpenFullLearn?: (conceptIndex: number) => void;
  onOpenAskNoevis?: () => void;
  onMarkRecovered?: (conceptId: string) => void;
}

export const RecoveryConceptView: React.FC<RecoveryConceptViewProps> = ({
  concept,
  onBackToReview,
  onOpenFullLearn,
  onOpenAskNoevis,
  onMarkRecovered,
}) => {
  const { success, info } = useToast();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = Boolean(
    selectedOptionId &&
    concept.quickCheckQuestion.options.find((opt) => opt.id === selectedOptionId)?.isCorrect
  );

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (isCorrect) {
      success('Concept Clarified!', 'You accurately identified the key mechanism.');
      if (onMarkRecovered) {
        onMarkRecovered(concept.id);
      }
    } else {
      info('Review the Mechanism', 'Check the explanation below to reinforce the idea.');
    }
  };

  return (
    <div
      id="recovery-concept-view"
      className="w-full max-w-3xl mx-auto py-4 sm:py-6 px-4 space-y-6 animate-fade-in"
    >
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={onBackToReview}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#374151] hover:text-[#111827] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Review List</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-bold text-[#92400E]">
          <Zap className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Active Recovery Session</span>
        </span>
      </div>

      {/* Main Concept Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-6 text-left">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            Concept {concept.conceptIndex} • {concept.chapterTitle}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#111827] tracking-tight">
            {concept.conceptName}
          </h2>
        </div>

        {/* Step 1: Simpler Explanation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2.5">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Simplified Core Idea
            </span>
          </div>
          <p className="text-xs sm:text-[14.5px] text-[#374151] leading-relaxed font-normal">
            {concept.simplifiedSummary}
          </p>
        </div>

        {/* Step 2: Key Mechanism Anchor */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">
              High-Yield Rule to Remember
            </span>
          </div>
          <p className="text-xs sm:text-[14px] text-[#166534] font-medium leading-relaxed">
            {concept.coreMechanismTip}
          </p>
        </div>

        {/* Step 3: Quick Reinforcement Check */}
        <div className="pt-4 border-t border-[#F3F4F6] space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Quick Recovery Check
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#111827]">
              {concept.quickCheckQuestion.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {concept.quickCheckQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let style = 'bg-[#FFFFFF] border-[#E5E7EB] hover:bg-[#FAFAFB] text-[#374151]';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  style = 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534] ring-1 ring-[#86EFAC]';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]';
                } else {
                  style = 'bg-[#FFFFFF] border-[#E5E7EB] opacity-50 text-[#9CA3AF]';
                }
              } else if (isSelected) {
                style = 'bg-[#F9FAFB] border-[#111827] text-[#111827] ring-1 ring-[#111827]';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between gap-3 text-xs sm:text-[14px] font-medium transition-all cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#F3F4F6] text-[#111827] font-bold text-xs flex items-center justify-center shrink-0">
                      {opt.letter}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Check CTA */}
          {!isSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmit}
                className={`min-h-[42px] px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  selectedOptionId
                    ? 'bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer shadow-sm'
                    : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                <span>Verify Understanding</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Explanation Banner after submit */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border space-y-2 animate-fade-in ${
                isCorrect
                  ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]'
                  : 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isCorrect ? 'Recovery Successful' : 'Explanation'}
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] leading-relaxed">
                {concept.quickCheckQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenAskNoevis && (
              <button
                type="button"
                onClick={onOpenAskNoevis}
                className="min-h-[42px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Ask Noevis</span>
              </button>
            )}

            {onOpenFullLearn && (
              <button
                type="button"
                onClick={() => onOpenFullLearn(concept.conceptIndex)}
                className="min-h-[42px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-[#6B7280]" />
                <span>Open Full Learn</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onBackToReview}
            className="min-h-[42px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
          >
            <span>Continue Review</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
