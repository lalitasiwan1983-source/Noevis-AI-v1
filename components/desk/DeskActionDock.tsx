'use client';

import React from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  BookOpen,
  Eye,
  ArrowRight,
} from 'lucide-react';

interface DeskActionDockProps {
  conceptIndex: number;
  totalConcepts: number;
  onPrevConcept: () => void;
  onNextConcept: () => void;
  onOpenAskNoevis: () => void;
  onQuickAction?: (actionName: string) => void;
}

export const DeskActionDock: React.FC<DeskActionDockProps> = ({
  conceptIndex,
  totalConcepts,
  onPrevConcept,
  onNextConcept,
  onOpenAskNoevis,
  onQuickAction,
}) => {
  const hasPrev = conceptIndex > 1;
  const hasNext = conceptIndex < totalConcepts;

  return (
    <div
      id="desk-action-dock"
      className="sticky bottom-0 left-0 right-0 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E7EB] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 z-20 shrink-0 transition-all shadow-[0_-4px_16px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Concept Step Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            id="desk-dock-prev-btn"
            onClick={onPrevConcept}
            disabled={!hasPrev}
            className={`min-h-[44px] sm:min-h-[40px] px-2.5 sm:px-3.5 rounded-xl border flex items-center gap-1.5 text-xs sm:text-[13.5px] font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
              hasPrev
                ? 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] text-[#374151] active:bg-[#F3F4F6] shadow-2xs'
                : 'border-[#F3F4F6] bg-[#F9FAFB] text-[#D1D5DB] cursor-not-allowed opacity-60'
            }`}
            title="Previous Concept"
            aria-label="Previous concept"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-xs font-semibold text-[#667085] px-1 sm:px-2 select-none">
            {conceptIndex} / {totalConcepts}
          </span>

          <button
            type="button"
            id="desk-dock-next-btn"
            onClick={onNextConcept}
            disabled={!hasNext}
            className={`min-h-[44px] sm:min-h-[40px] px-2.5 sm:px-3.5 rounded-xl border flex items-center gap-1.5 text-xs sm:text-[13.5px] font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
              hasNext
                ? 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] text-[#374151] active:bg-[#F3F4F6] shadow-2xs'
                : 'border-[#F3F4F6] bg-[#F9FAFB] text-[#D1D5DB] cursor-not-allowed opacity-60'
            }`}
            title="Next Concept"
            aria-label="Next concept"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Quick Context Actions (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickAction?.('simpler')}
            className="h-9 px-3 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Explain simpler</span>
          </button>

          <button
            type="button"
            onClick={() => onQuickAction?.('example')}
            className="h-9 px-3 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Give an example</span>
          </button>

          <button
            type="button"
            onClick={() => onQuickAction?.('visual')}
            className="h-9 px-3 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#4B5563] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Show visually</span>
          </button>
        </div>

        {/* Primary Action: Ask Noevis Prompt Bar */}
        <div className="flex-1 max-w-[280px] sm:max-w-[360px] lg:max-w-[420px]">
          <button
            type="button"
            id="desk-dock-ask-noevis"
            onClick={onOpenAskNoevis}
            className="w-full min-h-[44px] sm:h-11 px-3 sm:px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] active:bg-[#000000] text-white flex items-center justify-between text-xs sm:text-[14px] font-medium transition-all cursor-pointer shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#FBBF24] shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="truncate text-white font-semibold">Ask Noevis</span>
            </div>
            <span className="text-[11px] font-semibold bg-white/15 px-2 py-0.5 rounded text-white/90 shrink-0 ml-1.5 hidden sm:inline">
              ⌘J
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
