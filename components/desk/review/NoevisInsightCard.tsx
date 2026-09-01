'use client';

import React from 'react';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

interface NoevisInsightCardProps {
  insightText?: string;
  actionText?: string;
  onAction?: () => void;
}

export const NoevisInsightCard: React.FC<NoevisInsightCardProps> = ({
  insightText = 'You understand the core idea. Applying it in unfamiliar situations needs more practice.',
  actionText = 'Practice this',
  onAction,
}) => {
  return (
    <div
      id="review-noevis-insight"
      className="w-full p-4 sm:p-5 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="space-y-0.5 min-w-0">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#6B7280] block">
            ✦ Noevis Insight
          </span>
          <p className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
            “{insightText}”
          </p>
        </div>
      </div>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="min-h-[38px] px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
