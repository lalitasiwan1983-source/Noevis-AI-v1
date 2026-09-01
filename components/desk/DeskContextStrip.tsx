'use client';

import React from 'react';
import { ChevronRight, Bookmark, Layers } from 'lucide-react';

interface DeskContextStripProps {
  topic: string;
  chapter: string;
  concept: string;
  conceptIndex?: number;
  totalConcepts?: number;
  onSelectConceptIndex?: (index: number) => void;
}

export const DeskContextStrip: React.FC<DeskContextStripProps> = ({
  topic,
  chapter,
  concept,
  conceptIndex = 1,
  totalConcepts = 4,
}) => {
  return (
    <div
      id="desk-context-strip"
      className="w-full bg-[#FAFAFB] border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs sm:text-[13.5px] text-[#667085] shrink-0"
    >
      {/* Breadcrumb Context Path */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0 font-medium">
        <span className="inline-flex items-center gap-1.5 text-[#374151] hover:text-[#111827] transition-colors cursor-default">
          <Layers className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[180px]">{topic}</span>
        </span>

        <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />

        <span className="text-[#4B5563] hover:text-[#111827] transition-colors truncate max-w-[140px] sm:max-w-[220px] cursor-default">
          {chapter}
        </span>

        <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />

        <span className="text-[#111827] font-semibold truncate max-w-[160px] sm:max-w-[260px]">
          {concept}
        </span>
      </div>

      {/* Concept Progress Tracker */}
      <div className="hidden md:flex items-center gap-2 shrink-0 pl-4">
        <span className="text-[12px] font-medium text-[#667085] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#E5E7EB] shadow-2xs inline-flex items-center gap-1.5">
          <Bookmark className="w-3 h-3 text-[#667085]" />
          <span>Concept {conceptIndex} of {totalConcepts}</span>
        </span>
      </div>
    </div>
  );
};
