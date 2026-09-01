'use client';

import React from 'react';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { ReviewStateSummary } from './types';

interface ReviewStateOverviewProps {
  summary: ReviewStateSummary;
  selectedFilter?: 'all' | 'needs_attention' | 'developing' | 'strong';
  onSelectFilter?: (filter: 'all' | 'needs_attention' | 'developing' | 'strong') => void;
}

export const ReviewStateOverview: React.FC<ReviewStateOverviewProps> = ({
  summary,
  selectedFilter = 'all',
  onSelectFilter,
}) => {
  return (
    <div
      id="review-state-overview"
      className="w-full p-4 sm:p-5 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Current Conceptual Grasp
        </span>
        <span className="text-xs text-[#6B7280]">
          {summary.needsAttentionCount + summary.developingCount + summary.strongCount} Topics Monitored
        </span>
      </div>

      {/* 3 Conceptual States - Calm, lightweight row without loud full-bleed colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Needs Attention */}
        <button
          type="button"
          onClick={() => onSelectFilter && onSelectFilter(selectedFilter === 'needs_attention' ? 'all' : 'needs_attention')}
          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
            selectedFilter === 'needs_attention'
              ? 'bg-[#FFFFFF] border-[#D97706] ring-1 ring-[#D97706] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#D1D5DB] shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shrink-0" />
            <div>
              <span className="text-xs sm:text-[13px] font-bold text-[#111827] block leading-tight">
                Needs Attention
              </span>
              <span className="text-[11px] text-[#6B7280]">High recovery priority</span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-[#111827] px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]">
            {summary.needsAttentionCount}
          </span>
        </button>

        {/* Developing */}
        <button
          type="button"
          onClick={() => onSelectFilter && onSelectFilter(selectedFilter === 'developing' ? 'all' : 'developing')}
          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
            selectedFilter === 'developing'
              ? 'bg-[#FFFFFF] border-[#4F46E5] ring-1 ring-[#4F46E5] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#D1D5DB] shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1] shrink-0" />
            <div>
              <span className="text-xs sm:text-[13px] font-bold text-[#111827] block leading-tight">
                Developing
              </span>
              <span className="text-[11px] text-[#6B7280]">Partial understanding</span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-[#111827] px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#4338CA] border border-[#E0E7FF]">
            {summary.developingCount}
          </span>
        </button>

        {/* Strong */}
        <button
          type="button"
          onClick={() => onSelectFilter && onSelectFilter(selectedFilter === 'strong' ? 'all' : 'strong')}
          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
            selectedFilter === 'strong'
              ? 'bg-[#FFFFFF] border-[#16A34A] ring-1 ring-[#16A34A] shadow-xs'
              : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#D1D5DB] shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shrink-0" />
            <div>
              <span className="text-xs sm:text-[13px] font-bold text-[#111827] block leading-tight">
                Strong
              </span>
              <span className="text-[11px] text-[#6B7280]">Solid foundation</span>
            </div>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-[#111827] px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]">
            {summary.strongCount}
          </span>
        </button>
      </div>
    </div>
  );
};
