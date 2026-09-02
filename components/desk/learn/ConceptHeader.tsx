'use client';

import React from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { LearnConceptData } from './types';

interface ConceptHeaderProps {
  concept: LearnConceptData;
  totalConcepts: number;
  onNextConcept?: () => void;
  onPrevConcept?: () => void;
  onOpenReference?: () => void;
  onOpenAskNoevis?: () => void;
}

export const ConceptHeader: React.FC<ConceptHeaderProps> = ({
  concept,
  totalConcepts,
  onNextConcept,
  onPrevConcept,
  onOpenReference,
  onOpenAskNoevis,
}) => {
  return (
    <header id="desk-learn-concept-header" className="w-full pb-6 border-b border-[#E5E7EB]">
      {/* 1. Source / Chapter / Concept Breadcrumb (13-14px font, muted gray, 24-28px height, 18-22px bottom margin) */}
      <div className="flex items-center justify-between h-[26px] mb-[20px]">
        <div className="flex items-center gap-1.5 text-[13.5px] text-[#667085] font-normal truncate">
          <span className="text-[#374151] font-semibold">{concept.topic || 'Laws of Motion'}</span>
          <span className="text-[#9CA3AF] text-xs">›</span>
          <span className="truncate font-medium text-[#111827]">{concept.title}</span>
        </div>

        {/* Previous / Next Subtle Concept Navigation Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            disabled={concept.index <= 1}
            onClick={onPrevConcept}
            className={`text-xs font-semibold flex items-center gap-1 transition-all ${
              concept.index <= 1
                ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]'
                : 'text-[#667085] hover:text-[#111827] cursor-pointer'
            }`}
          >
            ‹ Prev
          </button>
          <span className="text-[#E5E7EB]">|</span>
          <button
            type="button"
            disabled={concept.index >= totalConcepts}
            onClick={onNextConcept}
            className={`text-xs font-semibold flex items-center gap-1 transition-all ${
              concept.index >= totalConcepts
                ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]'
                : 'text-[#4B5BEA] hover:text-[#111827] cursor-pointer font-bold'
            }`}
          >
            Next ›
          </button>
        </div>
      </div>

      {/* 2. Main Title Area (30-34px heading, weight 650-700, leading 1.15-1.25) & Subtitle (16-17px, leading 1.5, max-w 650-700px) */}
      <div className="space-y-2">
        {/* Subtle Progress Label (12-13px, no dashboard metrics) */}
        <span className="text-[12.5px] font-medium text-[#667085] block">
          {concept.index} of {totalConcepts} key ideas
        </span>

        <h1
          id="learn-concept-title"
          className="text-[32px] font-[675] text-[#111827] tracking-tight leading-[1.2]"
        >
          {concept.title}
        </h1>

        <p className="text-[16.5px] leading-[1.5] text-[#667085] max-w-[680px]">
          {concept.subtitle}
        </p>
      </div>

      {/* 3. Est. Time, Difficulty Badge, and Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-1.5">
        <div className="flex items-center gap-2.5 text-[12.5px] text-[#667085]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Est. {concept.estimatedTime}</span>
          </span>
          <span className="text-[#E5E7EB]">·</span>
          <span className="inline-flex items-center gap-1.5 text-[#166534] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>{concept.difficulty}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAskNoevis}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Ask Noevis</span>
          </button>

          <button
            type="button"
            onClick={onOpenReference}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Reference</span>
          </button>
        </div>
      </div>
    </header>
  );
};

