'use client';

import React from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';

interface ReferenceEmptyStateProps {
  onAddSource?: () => void;
}

export const ReferenceEmptyState: React.FC<ReferenceEmptyStateProps> = ({
  onAddSource,
}) => {
  return (
    <div
      id="reference-empty-state"
      className="w-full py-12 px-6 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex flex-col items-center justify-center text-center space-y-4 shadow-2xs"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] shadow-2xs">
        <BookOpen className="w-6 h-6 stroke-[1.8]" />
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h4 className="text-base font-bold text-[#111827]">
          No reference available yet
        </h4>
        <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
          Reference material for this learning context will appear here.
        </p>
      </div>

      {onAddSource && (
        <button
          type="button"
          onClick={onAddSource}
          className="mt-2 h-9 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>Attach Source</span>
        </button>
      )}
    </div>
  );
};
