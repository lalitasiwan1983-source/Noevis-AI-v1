'use client';

import React from 'react';
import { PlayCircle, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { ReviewConceptItem } from './types';

interface DevelopingSectionProps {
  items: ReviewConceptItem[];
  onStartPractice: (concept: ReviewConceptItem) => void;
}

export const DevelopingSection: React.FC<DevelopingSectionProps> = ({
  items,
  onStartPractice,
}) => {
  if (items.length === 0) return null;

  return (
    <section id="review-developing-section" className="w-full space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
          <h2 className="text-sm sm:text-base font-bold text-[#111827] uppercase tracking-wider">
            Developing (Partial Understanding)
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#4338CA] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full border border-[#E0E7FF]">
          {items.length} {items.length === 1 ? 'Concept' : 'Concepts'}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-3.5 transition-all hover:border-[#D1D5DB] text-left"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                  Concept {item.conceptIndex} • {item.chapterTitle}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111827] leading-snug">
                  {item.conceptName}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-xs font-semibold text-[#4338CA] shrink-0 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                <span>Developing</span>
              </span>
            </div>

            {/* Diagnostic Reason */}
            {item.reason && (
              <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
                {item.reason}
              </p>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6]">
              <span className="text-xs text-[#6B7280]">
                Strengthen pattern recognition with an interactive scenario.
              </span>

              <button
                type="button"
                onClick={() => onStartPractice(item)}
                className="min-h-[40px] px-4.5 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs sm:text-sm font-semibold text-[#111827] flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:border-[#9CA3AF]"
              >
                <PlayCircle className="w-4 h-4 text-[#4F46E5]" />
                <span>Practice again</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
