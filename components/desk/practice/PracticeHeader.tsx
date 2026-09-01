'use client';

import React from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Target,
  Zap,
} from 'lucide-react';
import { PracticeTask } from './types';

interface PracticeHeaderProps {
  task: PracticeTask;
  taskIndex: number;
  totalTasks: number;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
}

export const PracticeHeader: React.FC<PracticeHeaderProps> = ({
  task,
  taskIndex,
  totalTasks,
  onSwitchToLearn,
  onOpenAskNoevis,
}) => {
  const progressPercentage = Math.round((taskIndex / totalTasks) * 100);

  return (
    <header id="desk-practice-header" className="w-full pb-6 border-b border-[#E5E7EB]/80">
      {/* Top Meta Badges & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Practice Task Index Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937] shadow-2xs">
            <Target className="w-3.5 h-3.5 text-[#111827]" />
            <span>Practice {taskIndex} of {totalTasks}</span>
          </span>

          {/* Task Type Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-xs font-semibold text-[#6D28D9]">
            <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{task.typeBadge}</span>
          </span>

          {/* Time Estimate */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium text-[#667085]">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Est. {task.estimatedTime}</span>
          </span>
        </div>

        {/* Subtle Session Progress Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-[#6B7280]">
            Practice Mastery: <strong className="font-semibold text-[#111827]">{progressPercentage}%</strong>
          </span>
          <div className="w-24 sm:w-28 h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
            <div
              className="h-full bg-[#111827] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            {task.topic} › {task.chapter}
          </span>
        </div>

        <h1
          id="practice-task-title"
          className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111827] tracking-tight leading-tight sm:leading-snug"
        >
          {task.title}
        </h1>

        <p className="text-base sm:text-lg text-[#667085] font-normal max-w-3xl leading-relaxed mt-1">
          {task.instruction}
        </p>
      </div>

      {/* Supporting Concept Context & Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2 border-t border-[#F3F4F6]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#6B7280]">Target Concept:</span>
          <span className="text-xs font-semibold text-[#111827] bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#E5E7EB] shadow-2xs">
            {task.conceptTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwitchToLearn}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#374151] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Review in Learn</span>
          </button>

          <button
            type="button"
            onClick={onOpenAskNoevis}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#374151] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Ask Noevis</span>
          </button>
        </div>
      </div>
    </header>
  );
};
