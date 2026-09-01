'use client';

import React from 'react';
import { RotateCcw, Sparkles, BookOpen, Layers } from 'lucide-react';

interface ReviewHeaderProps {
  topicTitle: string;
  chapterTitle: string;
  isEmptyState?: boolean;
  onToggleEmptyState?: () => void;
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  topicTitle,
  chapterTitle,
  isEmptyState = false,
  onToggleEmptyState,
}) => {
  return (
    <div id="desk-review-header" className="w-full pb-5 sm:pb-6 border-b border-[#E5E7EB] space-y-3">
      {/* Top Meta Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-2xs">
            <RotateCcw className="w-3.5 h-3.5 text-[#111827]" />
            <span>Spaced Reinforcement</span>
          </span>

          <span className="text-xs font-medium text-[#6B7280]">
            {topicTitle} › {chapterTitle}
          </span>
        </div>

        {/* Demo Switcher for empty vs populated state */}
        {onToggleEmptyState && (
          <button
            type="button"
            onClick={onToggleEmptyState}
            className="text-[11px] font-semibold text-[#6B7280] hover:text-[#111827] px-2.5 py-1 rounded-lg bg-[#FAFAFB] border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            title="Toggle between active review items and new-desk empty state"
          >
            {isEmptyState ? 'Switch to Active Review' : 'Preview New Desk State'}
          </button>
        )}
      </div>

      {/* Main Heading & Clarifying Subtitle */}
      <div className="space-y-1.5 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
          Review
        </h1>
        <p className="text-sm sm:text-base text-[#667085] max-w-2xl leading-relaxed">
          Noevis continuously identifies concepts that need reinforcement, helping you recover weak areas and solidify your mental model without unnecessary repetition.
        </p>
      </div>
    </div>
  );
};
