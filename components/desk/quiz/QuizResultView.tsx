'use client';

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { QuizResultSummary } from './types';
import { DeskWorkspaceMode } from '../types';

interface QuizResultViewProps {
  summary: QuizResultSummary;
  onRetakeQuiz: () => void;
  onReviewConcept: (conceptIndex: number) => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  summary,
  onRetakeQuiz,
  onReviewConcept,
  onChangeMode,
}) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const toggleExpand = (qId: string) => {
    setExpandedQuestionId((prev) => (prev === qId ? null : qId));
  };

  return (
    <div
      id="desk-quiz-result-view"
      className="w-full max-w-[800px] mx-auto py-5 sm:py-7 px-4 sm:px-6 space-y-5 sm:space-y-6 overflow-y-auto"
    >
      {/* 1. PRIMARY RESULT SUMMARY CARD */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-5">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F5FF] border border-[#E0E7FF] text-[#4B5BEA] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 stroke-[2]" />
            </div>

            <div>
              <span className="text-[12px] font-medium text-[#667085] block">
                Assessment Completed
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#111827] tracking-tight">
                {summary.score} of {summary.totalQuestions} Questions Correct
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold text-[#111827] tabular-nums">
              {summary.percentage}%
            </span>
            <span className="text-[12px] font-medium text-[#667085] block">
              Mastery Score
            </span>
          </div>
        </div>

        {/* 2. Noevis Diagnostic Insight */}
        <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[12px] font-semibold text-[#111827]">
              Noevis Diagnostic Insight
            </span>
          </div>
          <p className="text-[13px] sm:text-[13.5px] text-[#374151] leading-relaxed">
            {summary.noevisInsight}
          </p>
        </div>

        {/* 3. Concept Mastery Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Mastered Concepts */}
          <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span className="text-[12px] font-semibold text-[#111827]">
                Mastered Concepts ({summary.masteredConcepts.length})
              </span>
            </div>
            {summary.masteredConcepts.length > 0 ? (
              <ul className="space-y-1.5">
                {summary.masteredConcepts.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[12px] sm:text-[12.5px] text-[#374151] flex items-center gap-2 bg-[#FFFFFF] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-[#667085]">
                Review the core concepts in Learn to establish mastery.
              </p>
            )}
          </div>

          {/* Concepts to Review */}
          <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
              <span className="text-[12px] font-semibold text-[#111827]">
                Needs Attention ({summary.reviewConcepts.length})
              </span>
            </div>
            {summary.reviewConcepts.length > 0 ? (
              <ul className="space-y-1.5">
                {summary.reviewConcepts.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[12px] sm:text-[12.5px] text-[#374151] flex items-center justify-between gap-2 bg-[#FFFFFF] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB]"
                  >
                    <span className="truncate">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => onReviewConcept(item.conceptIndex)}
                      className="text-[11px] font-semibold text-[#4B5BEA] hover:underline shrink-0 cursor-pointer"
                    >
                      Review
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[12px] text-[#166534] font-medium bg-[#F0FDF4] p-2 rounded-lg border border-[#DCFCE7]">
                Flawless! All assessed concepts grasped accurately.
              </p>
            )}
          </div>
        </div>

        {/* 4. Action Row */}
        <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onRetakeQuiz}
            className="h-[42px] px-4 rounded-[10px] bg-[#FFFFFF] hover:bg-[#FAFBFC] border border-[#E5E7EB] text-[13.5px] font-medium text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-[#667085]" />
            <span>Retake Quiz</span>
          </button>

          {summary.reviewConcepts.length > 0 ? (
            <button
              type="button"
              onClick={() => onReviewConcept(summary.reviewConcepts[0].conceptIndex)}
              className="h-[42px] px-5 rounded-[10px] bg-[#4B5BEA] hover:bg-[#3D4CD8] text-white text-[13.5px] font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <span>Review in Learn</span>
              <BookOpen className="w-4 h-4" />
            </button>
          ) : onChangeMode ? (
            <button
              type="button"
              onClick={() => onChangeMode('learn')}
              className="h-[42px] px-5 rounded-[10px] bg-[#4B5BEA] hover:bg-[#3D4CD8] text-white text-[13.5px] font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <span>Continue Learning</span>
              <BookOpen className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* 5. QUESTION-BY-QUESTION REVIEW LIST */}
      <div className="space-y-3">
        <h3 className="text-[14px] font-semibold text-[#111827] px-1">
          Question Review & Explanations
        </h3>

        <div className="space-y-2.5">
          {summary.questions.map((question, index) => {
            const userChoiceId = summary.userAnswers[question.id];
            const correctOption = question.options.find((opt) => opt.isCorrect);
            const userOption = question.options.find((opt) => opt.id === userChoiceId);
            const isCorrect = userOption?.isCorrect === true;
            const isExpanded = expandedQuestionId === question.id;

            return (
              <div
                key={question.id}
                className="rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] overflow-hidden transition-colors"
              >
                {/* Header item button */}
                <button
                  type="button"
                  onClick={() => toggleExpand(question.id)}
                  className="w-full py-3 px-4 text-left flex items-center justify-between gap-3 hover:bg-[#FAFBFC] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                        isCorrect
                          ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
                          : 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <span className="text-[13.5px] font-medium text-[#111827] truncate">
                      {question.prompt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`text-[12px] font-medium ${
                        isCorrect ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#667085]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#667085]" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-[#F3F4F6] space-y-3 text-[13px] bg-[#FAFBFC]/60">
                    {/* Your Choice vs Correct Option */}
                    <div className="space-y-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#667085] w-24 shrink-0">Your Answer:</span>
                        <span
                          className={`font-medium ${
                            isCorrect ? 'text-[#16A34A]' : 'text-[#DC2626]'
                          }`}
                        >
                          {userOption
                            ? `${userOption.letter}. ${userOption.text}`
                            : 'No answer selected'}
                        </span>
                      </div>

                      {!isCorrect && correctOption && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#667085] w-24 shrink-0">Correct Answer:</span>
                          <span className="font-medium text-[#16A34A]">
                            {correctOption.letter}. {correctOption.text}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
                        Core Principle
                      </span>
                      <p className="text-[12.5px] text-[#374151] leading-relaxed">
                        {question.explanation.corePrinciple}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
