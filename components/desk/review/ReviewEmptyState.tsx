'use client';

import React from 'react';
import { RotateCcw, BookOpen, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { DeskWorkspaceMode } from '../types';

interface ReviewEmptyStateProps {
  onSwitchMode: (mode: DeskWorkspaceMode) => void;
  onPopulateReview?: () => void;
}

export const ReviewEmptyState: React.FC<ReviewEmptyStateProps> = ({
  onSwitchMode,
  onPopulateReview,
}) => {
  return (
    <div
      id="review-empty-state"
      className="w-full max-w-2xl mx-auto py-10 sm:py-16 px-4 text-center space-y-6 animate-fade-in"
    >
      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
        <RotateCcw className="w-7 h-7 text-[#6B7280] stroke-[1.8]" />
      </div>

      {/* Main Copy */}
      <div className="space-y-2.5 max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
          Your review will appear here as you learn
        </h2>
        <p className="text-sm text-[#667085] leading-relaxed">
          As you work through concept explanations, solve practice problems, and take quizzes, Noevis dynamically tracks where your mental model is solid and surfaces areas that need recovery.
        </p>
      </div>

      {/* Recommended First Step Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onSwitchMode('learn')}
          className="min-h-[44px] px-5 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-white" />
          <span>Start with Learn</span>
        </button>

        <button
          type="button"
          onClick={() => onSwitchMode('practice')}
          className="min-h-[44px] px-5 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <HelpCircle className="w-4 h-4 text-[#6B7280]" />
          <span>Try Practice</span>
        </button>
      </div>

      {/* Sample Review Data Preview Link for Reviewer */}
      {onPopulateReview && (
        <div className="pt-6 border-t border-[#F3F4F6]">
          <button
            type="button"
            onClick={onPopulateReview}
            className="text-xs text-[#6B7280] hover:text-[#111827] underline transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>Preview Review state with diagnosed concepts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
