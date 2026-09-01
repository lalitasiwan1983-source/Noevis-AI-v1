'use client';

import React from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Layers,
} from 'lucide-react';
import { LearnConceptData } from './types';

interface ConceptHeaderProps {
  concept: LearnConceptData;
  totalConcepts: number;
  onOpenReference?: () => void;
  onOpenAskNoevis?: () => void;
}

export const ConceptHeader: React.FC<ConceptHeaderProps> = ({
  concept,
  totalConcepts,
  onOpenReference,
  onOpenAskNoevis,
}) => {
  const progressPercentage = Math.round((concept.index / totalConcepts) * 100);

  return (
    <header id="desk-learn-concept-header" className="w-full pb-6 border-b border-[#E5E7EB]/80">
      {/* Top Meta Badges & Progress Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Concept Index Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937] shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#111827]" />
            <span>Concept {concept.index} of {totalConcepts}</span>
          </span>

          {/* Reading Time */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium text-[#667085]">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Est. {concept.estimatedTime}</span>
          </span>

          {/* Difficulty / Tier */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-xs font-medium text-[#166534]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>{concept.difficulty} Level</span>
          </span>
        </div>

        {/* Subtle Session Progress Bar */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-[#6B7280]">
            Session: <strong className="font-semibold text-[#111827]">{progressPercentage}%</strong>
          </span>
          <div className="w-24 sm:w-28 h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
            <div
              className="h-full bg-[#111827] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Title */}
      <h1
        id="learn-concept-title"
        className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111827] tracking-tight leading-tight sm:leading-snug"
      >
        {concept.title}
      </h1>

      {/* Contextual Subtitle */}
      <p className="text-base sm:text-lg text-[#667085] mt-2.5 font-normal max-w-3xl leading-relaxed">
        {concept.subtitle}
      </p>

      {/* Quick Action Pills */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        <button
          type="button"
          onClick={onOpenAskNoevis}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#374151] transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Ask AI about this</span>
        </button>

        <button
          type="button"
          onClick={onOpenReference}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#374151] transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>View Source Excerpt</span>
        </button>
      </div>
    </header>
  );
};
