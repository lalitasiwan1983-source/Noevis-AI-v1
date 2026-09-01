'use client';

import React from 'react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ReviewConceptItem } from './types';

interface StrongSectionProps {
  items: ReviewConceptItem[];
  onOpenConcept?: (conceptIndex: number) => void;
}

export const StrongSection: React.FC<StrongSectionProps> = ({
  items,
  onOpenConcept,
}) => {
  if (items.length === 0) return null;

  return (
    <section id="review-strong-section" className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
          <h2 className="text-sm sm:text-base font-bold text-[#111827] uppercase tracking-wider">
            Strong (Solid Foundations)
          </h2>
        </div>
        <span className="text-xs font-medium text-[#6B7280]">
          {items.length} {items.length === 1 ? 'Concept' : 'Concepts'} Mastered
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-2 text-left hover:border-[#D1D5DB] transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">
                    {item.conceptName}
                  </h4>
                  <span className="text-[11px] text-[#6B7280] block mt-0.5">
                    Concept {item.conceptIndex} • Solid recall
                  </span>
                </div>
              </div>

              {onOpenConcept && (
                <button
                  type="button"
                  onClick={() => onOpenConcept(item.conceptIndex)}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer shrink-0"
                  title="View in Learn mode"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {item.reason && (
              <p className="text-[12px] text-[#6B7280] pl-6 leading-relaxed">
                {item.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
