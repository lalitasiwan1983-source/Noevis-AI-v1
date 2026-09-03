'use client';

import React from 'react';
import {
  Compass,
  ArrowRight,
  Pencil,
  HelpCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface NextBestActionProps {
  conceptTitle: string;
  onNextConcept?: () => void;
  onOpenAskNoevis?: () => void;
  onOpenReference?: () => void;
}

export const NextBestAction: React.FC<NextBestActionProps> = ({
  conceptTitle,
  onNextConcept,
  onOpenAskNoevis,
  onOpenReference,
}) => {
  return (
    <section id="learn-next-best-action" className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] border border-[#C7D2FE] flex items-center justify-center text-[#4B5BEA]">
          <Compass className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-[#111827] tracking-tight">
          Next Best Action
        </h2>
      </div>

      <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <span className="text-xs font-semibold text-[#4B5BEA] uppercase tracking-wider">
              Adaptive Recommendation
            </span>
            <h3 className="text-base font-bold text-[#111827] mt-0.5">
              Reinforce &ldquo;{conceptTitle}&rdquo;
            </h3>
            <p className="text-xs text-[#667085] mt-0.5">
              Choose how you want to solidify your understanding in Noevis.
            </p>
          </div>

          <button
            type="button"
            onClick={onNextConcept}
            className="h-10 px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            <span>Proceed to Next Concept</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Action 1: Ask Noevis */}
          <button
            type="button"
            onClick={onOpenAskNoevis}
            className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#FFFFFF] hover:border-[#D1D5DB] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-bold text-[#111827] group-hover:text-[#4B5BEA]">
                Deepen with AI
              </span>
            </div>
            <p className="text-[11.5px] text-[#667085] leading-normal">
              Ask Noevis to explain edge cases or generate custom analogies.
            </p>
          </button>

          {/* Action 2: Practice */}
          <button
            type="button"
            onClick={onOpenReference}
            className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#FFFFFF] hover:border-[#D1D5DB] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-xs font-bold text-[#111827] group-hover:text-[#3B82F6]">
                Inspect Source
              </span>
            </div>
            <p className="text-[11.5px] text-[#667085] leading-normal">
              Review original textbook excerpts and primary references.
            </p>
          </button>

          {/* Action 3: Review */}
          <button
            type="button"
            onClick={onNextConcept}
            className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#FFFFFF] hover:border-[#D1D5DB] text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1">
              <RotateCcw className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs font-bold text-[#111827] group-hover:text-[#16A34A]">
                Topic Overview
              </span>
            </div>
            <p className="text-[11.5px] text-[#667085] leading-normal">
              View concept map and chapter milestone summary.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
