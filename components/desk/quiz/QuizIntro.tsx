'use client';

import React from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  ShieldCheck,
} from 'lucide-react';

interface QuizIntroProps {
  topicTitle: string;
  chapterTitle: string;
  totalQuestions: number;
  estimatedTime: string;
  onStartQuiz: () => void;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({
  topicTitle,
  chapterTitle,
  totalQuestions,
  estimatedTime,
  onStartQuiz,
  onSwitchToLearn,
  onOpenAskNoevis,
}) => {
  return (
    <div
      id="desk-quiz-intro"
      className="w-full max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6 sm:space-y-8 animate-fade-in"
    >
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-5 text-left">
        {/* Meta Pill Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-semibold text-[#111827]">
            <HelpCircle className="w-3.5 h-3.5 text-[#111827]" />
            <span>Chapter Knowledge Check</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium text-[#667085]">
            <Target className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>{totalQuestions} Diagnostic Questions</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium text-[#667085]">
            <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>~{estimatedTime}</span>
          </span>
        </div>

        {/* Title & Introduction */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            {topicTitle} › {chapterTitle}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111827] tracking-tight leading-tight">
            Cellular Energetics Concept Quiz
          </h1>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl font-normal">
            Validate what you actually understand across photosynthesis and cellular respiration. We test core principles, biochemical stoichiometry, and molecular mechanisms without unnecessary trick questions.
          </p>
        </div>

        {/* What’s evaluated bullet overview */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3">
          <span className="text-xs font-bold text-[#111827] uppercase tracking-wider block">
            What is evaluated in this check
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#374151]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Light reactions & water photolysis (PS II)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Calvin cycle 9 ATP / 6 NADPH balance</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Glycolysis energy investment vs. payoff</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Chemiosmotic ATP synthase rotary motor</span>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            {onSwitchToLearn && (
              <button
                type="button"
                onClick={onSwitchToLearn}
                className="min-h-[44px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-[#6B7280]" />
                <span>Review Learn First</span>
              </button>
            )}

            {onOpenAskNoevis && (
              <button
                type="button"
                onClick={onOpenAskNoevis}
                className="min-h-[44px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Ask Noevis</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onStartQuiz}
            className="min-h-[46px] px-7 rounded-xl bg-[#111827] hover:bg-[#1F2937] active:bg-[#000000] text-white text-sm sm:text-base font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
          >
            <span>Start Quiz</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
