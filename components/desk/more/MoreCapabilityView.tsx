'use client';

import React from 'react';
import {
  FileText,
  Lightbulb,
  Split,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { MoreToolId } from './types';

interface MoreCapabilityViewProps {
  toolId: MoreToolId;
  topic: string;
  chapter: string;
  conceptName?: string;
  conceptIndex?: number;
  onBack: () => void;
  onOpenAskNoevis?: () => void;
  onOpenReference?: () => void;
}

export const MoreCapabilityView: React.FC<MoreCapabilityViewProps> = ({
  toolId,
  topic,
  chapter,
  conceptName,
  conceptIndex,
  onBack,
  onOpenAskNoevis,
  onOpenReference,
}) => {
  const getToolMetadata = () => {
    switch (toolId) {
      case 'summary':
        return {
          title: 'Contextual Summary',
          badge: 'Summary',
          icon: FileText,
          description:
            'A synthesized high-yield overview summarizing key takeaways and definitions for the current topic and concept.',
          emptyHeadline: 'Contextual summary will generate here',
          emptySubtext:
            'Noevis synthesizes the active lesson materials, core mechanisms, and chemical/physical processes into a clean, scannable overview.',
          tip: 'Summaries are tightly scoped to the current chapter and active concept.',
        };
      case 'key_ideas':
        return {
          title: 'Key Ideas & Anchors',
          badge: 'Key Ideas',
          icon: Lightbulb,
          description:
            'The core conceptual anchors and fundamental rules extracted from this learning context.',
          emptyHeadline: 'High-yield conceptual anchors',
          emptySubtext:
            'Key principles and mental models will be surfaced here as you work through the lesson steps.',
          tip: 'Focusing on foundational rules builds intuition before problem-solving.',
        };
      case 'examples':
        return {
          title: 'Targeted Examples',
          badge: 'Examples',
          icon: Split,
          description:
            'Step-by-step worked examples and real-world scenarios illustrating this specific mechanism in action.',
          emptyHeadline: 'Contextual examples will appear here',
          emptySubtext:
            'Worked examples demonstrating step-by-step applications of this concept will be presented here.',
          tip: 'Examples show how rules translate to unfamiliar problem setups.',
        };
      case 'study_aid':
      default:
        return {
          title: 'Contextual Study Aid',
          badge: 'Study Aid',
          icon: Sparkles,
          description:
            'Lightweight reinforcement prompts, memory checks, and conceptual scaffolding.',
          emptyHeadline: 'Study aid cues for this concept',
          emptySubtext:
            'Targeted memory cues and diagnostic prompts calibrated to your current grasp will be available here.',
          tip: 'Designed to reinforce mental models without distracting flashcard overload.',
        };
    }
  };

  const meta = getToolMetadata();
  const Icon = meta.icon;

  return (
    <div
      id={`desk-more-capability-${toolId}`}
      className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 animate-fade-in text-left"
    >
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#374151] hover:text-[#111827] cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280] flex-wrap">
          <span className="font-semibold text-[#111827]">{topic}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
          <span className="text-[#4B5563] truncate max-w-[160px] sm:max-w-none">{chapter}</span>
          {conceptName && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
              <span className="text-[#6366F1] font-medium truncate max-w-[200px] sm:max-w-none">
                {conceptIndex ? `Concept ${conceptIndex}` : conceptName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] shadow-2xs">
            <Icon className="w-3.5 h-3.5 text-[#111827]" />
            <span>{meta.badge}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
          {meta.title}
        </h1>
        <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
          {meta.description}
        </p>
      </div>

      {/* Main Calm Container (Authentic Empty State) */}
      <div className="w-full rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs p-6 sm:p-10 space-y-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
          <Icon className="w-6 h-6 stroke-[1.8] text-[#4B5563]" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
            {meta.emptyHeadline}
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
            {meta.emptySubtext}
          </p>
        </div>

        {/* Subtle Guidance Note */}
        <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] text-left max-w-lg mx-auto flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
          <p className="text-xs text-[#6B7280] leading-relaxed">
            <strong className="text-[#374151] font-semibold">Scope: </strong>
            {meta.tip}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[42px] px-5 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
          >
            Return to Learning
          </button>

          {onOpenAskNoevis && (
            <button
              type="button"
              onClick={onOpenAskNoevis}
              className="min-h-[42px] px-5 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Ask Noevis for {meta.badge}</span>
            </button>
          )}

          {onOpenReference && (
            <button
              type="button"
              onClick={onOpenReference}
              className="min-h-[42px] px-4 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-[#6B7280]" />
              <span>Check Source Reference</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
