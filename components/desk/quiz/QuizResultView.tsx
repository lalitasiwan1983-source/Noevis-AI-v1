'use client';

import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
  Layers,
} from 'lucide-react';
import { QuizResultSummary } from './types';
import { DeskWorkspaceMode } from '../types';

interface QuizResultViewProps {
  summary: QuizResultSummary;
  onRetakeQuiz: () => void;
  onReviewConcept: (conceptIndex: number) => void;
  onOpenAskNoevis?: () => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  summary,
  onRetakeQuiz,
  onReviewConcept,
  onOpenAskNoevis,
  onChangeMode,
}) => {
  const isHighMastery = summary.percentage >= 80;

  return (
    <div
      id="desk-quiz-result-view"
      className="w-full max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6 sm:space-y-8 animate-fade-in"
    >
      {/* 1. Primary Result Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-6 text-left">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
                isHighMastery
                  ? 'bg-[#F0FDF4] border border-[#86EFAC] text-[#16A34A]'
                  : 'bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706]'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Knowledge Check Completed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                {summary.score} of {summary.totalQuestions} Questions Correct
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {summary.percentage}%
            </span>
            <span className="text-xs font-medium text-[#6B7280] block">Mastery Score</span>
          </div>
        </div>

        {/* 2. Noevis Intelligence Diagnostic Insight */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Noevis Diagnostic Insight
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
            {summary.noevisInsight}
          </p>
        </div>

        {/* 3. Breakdown: You Understood vs. Needs Attention */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mastered Concepts */}
          <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                You Understood ({summary.masteredConcepts.length})
              </span>
            </div>

            {summary.masteredConcepts.length > 0 ? (
              <ul className="space-y-2">
                {summary.masteredConcepts.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-[13px] text-[#374151] flex items-start gap-2 bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E5E7EB]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0 mt-1.5" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#6B7280]">
                Review the chapter concepts in Learn to solidify foundations.
              </p>
            )}
          </div>

          {/* Needs Attention */}
          <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Needs Attention ({summary.reviewConcepts.length})
              </span>
            </div>

            {summary.reviewConcepts.length > 0 ? (
              <ul className="space-y-2">
                {summary.reviewConcepts.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-[13px] text-[#374151] flex flex-col gap-1.5 bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E5E7EB]"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold">{item.name}</span>
                      <button
                        type="button"
                        onClick={() => onReviewConcept(item.conceptIndex)}
                        className="text-[11px] font-bold text-[#111827] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#166534] font-medium bg-[#F0FDF4] p-3 rounded-xl border border-[#DCFCE7]">
                Flawless! You demonstrated solid mastery across all tested areas.
              </p>
            )}
          </div>
        </div>

        {/* 4. Action Row */}
        <div className="pt-3 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRetakeQuiz}
              className="min-h-[44px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4 text-[#6B7280]" />
              <span>Retake Quiz</span>
            </button>

            {onOpenAskNoevis && (
              <button
                type="button"
                onClick={onOpenAskNoevis}
                className="min-h-[44px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Ask Noevis</span>
              </button>
            )}
          </div>

          {summary.reviewConcepts.length > 0 ? (
            <button
              type="button"
              onClick={() => onReviewConcept(summary.reviewConcepts[0].conceptIndex)}
              className="min-h-[44px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
            >
              <span>Review {summary.reviewConcepts[0].name.split(':')[0]}</span>
              <BookOpen className="w-4 h-4" />
            </button>
          ) : onChangeMode ? (
            <button
              type="button"
              onClick={() => onChangeMode('review')}
              className="min-h-[44px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
            >
              <span>Continue to Chapter Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
