'use client';

import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Atom,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LearnConceptData } from './types';

interface ExplanationFlowProps {
  concept: LearnConceptData;
  onOpenAskNoevis?: () => void;
}

export const ExplanationFlow: React.FC<ExplanationFlowProps> = ({
  concept,
  onOpenAskNoevis,
}) => {
  const [isAnalogyExpanded, setIsAnalogyExpanded] = useState(true);

  return (
    <div id="learn-explanation-flow" className="w-full space-y-8 sm:space-y-10">
      {/* SECTION 1: WHY IT MATTERS */}
      <section id="learn-why-it-matters" className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
            Why It Matters
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-[#111827] leading-snug">
              {concept.whyItMatters.headline}
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {concept.whyItMatters.description}
            </p>
          </div>

          {/* Key Metric Badge */}
          <div className="w-full md:w-auto shrink-0 px-5 py-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-mono tracking-tight">
              {concept.whyItMatters.keyMetric}
            </span>
            <span className="text-xs text-[#6B7280] font-medium mt-0.5 max-w-[140px]">
              {concept.whyItMatters.metricLabel}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: SIMPLE EXPLANATION */}
      <section id="learn-simple-explanation" className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
            Simple Explanation
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-5">
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed font-normal">
            {concept.simpleExplanation.coreIntuition}
          </p>

          {/* Scientific Equation Banner */}
          {concept.simpleExplanation.scientificEquation && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-[#4B5563]" />
                <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                  Summary Reaction
                </span>
              </div>
              <span className="font-mono text-xs sm:text-[13.5px] font-semibold text-[#111827] bg-white px-3 py-1.5 rounded-lg border border-[#E5E7EB] shadow-2xs overflow-x-auto">
                {concept.simpleExplanation.scientificEquation}
              </span>
            </div>
          )}

          {/* Interactive Analogy Box */}
          <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAnalogyExpanded(!isAnalogyExpanded)}
              className="w-full px-4 py-3 bg-[#FAFAFB] hover:bg-[#F3F4F6] flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs sm:text-sm font-semibold text-[#111827]">
                  Mental Model: {concept.simpleExplanation.analogyTitle}
                </span>
              </div>
              {isAnalogyExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              )}
            </button>

            {isAnalogyExpanded && (
              <div className="p-4 sm:p-5 bg-[#FFFFFF] border-t border-[#E5E7EB] text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {concept.simpleExplanation.analogyText}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY TAKEAWAYS & EXAM TIPS */}
      <section id="learn-key-takeaways" className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight">
            Key Takeaways
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-5">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {concept.keyTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]"
              >
                <div className="w-5 h-5 rounded-full bg-[#111827] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-[14px] text-[#374151] leading-snug">
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>

          {/* Exam Insight Callout */}
          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#92400E]">
                High-Yield Exam Trap Alert
              </h4>
              <p className="text-xs sm:text-[13.5px] text-[#78350F] leading-relaxed">
                {concept.examTip}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
