'use client';

import React from 'react';
import { AlertCircle, ArrowRight, Sparkles, BookOpen, RefreshCw } from 'lucide-react';
import { ReviewConceptItem } from './types';

interface NeedsAttentionSectionProps {
  items: ReviewConceptItem[];
  onStartRecovery: (concept: ReviewConceptItem) => void;
  onOpenLearnConcept?: (conceptIndex: number) => void;
}

export const NeedsAttentionSection: React.FC<NeedsAttentionSectionProps> = ({
  items,
  onStartRecovery,
  onOpenLearnConcept,
}) => {
  if (items.length === 0) return null;

  return (
    <section id="review-needs-attention-section" className="w-full space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <h2 className="text-sm sm:text-base font-bold text-[#111827] uppercase tracking-wider">
            Needs Attention (Priority Recovery)
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#D97706] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
          {items.length} {items.length === 1 ? 'Concept' : 'Concepts'}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#FDE68A] shadow-xs space-y-4 transition-all hover:border-[#F59E0B] text-left"
          >
            {/* Top Row: Concept Title + Tag */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#92400E] uppercase tracking-wider block">
                  Concept {item.conceptIndex} • {item.chapterTitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111827] leading-snug">
                  {item.conceptName}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-bold text-[#92400E] shrink-0 self-start">
                <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Needs Attention</span>
              </span>
            </div>

            {/* Reason Diagnostic Callout */}
            {item.reason && (
              <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
                <strong className="text-[#111827] font-semibold">Diagnosis: </strong>
                {item.reason}
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6]">
              <span className="text-xs text-[#6B7280]">
                Quick 2-minute conceptual refresher with targeted check.
              </span>

              <button
                type="button"
                onClick={() => onStartRecovery(item)}
                className="min-h-[42px] px-5 rounded-xl bg-[#111827] hover:bg-[#1F2937] active:bg-[#000000] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
              >
                <span>Review this concept</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
