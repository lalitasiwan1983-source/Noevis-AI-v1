'use client';

import React from 'react';
import {
  Lightbulb,
  HelpCircle,
  Eye,
  FileCheck,
  Zap,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { DeskWorkspaceMode } from '../types';

interface AskNoevisSuggestionsProps {
  activeMode?: DeskWorkspaceMode;
  onSelectSuggestion: (prompt: string) => void;
  compact?: boolean;
}

export const AskNoevisSuggestions: React.FC<AskNoevisSuggestionsProps> = ({
  activeMode = 'learn',
  onSelectSuggestion,
  compact = false,
}) => {
  const getSuggestionsForMode = (mode: DeskWorkspaceMode) => {
    switch (mode) {
      case 'learn':
        return [
          { label: 'Explain this simply', icon: Lightbulb, desc: 'Intuitive everyday analogy' },
          { label: 'Give me an applied example', icon: Sparkles, desc: 'Real-world scenario' },
          { label: 'Explain visually', icon: Eye, desc: 'Spatial and diagrammatic breakdown' },
          { label: 'Test my understanding', icon: FileCheck, desc: 'Quick concept check question' },
        ];
      case 'practice':
        return [
          { label: 'Give me a hint', icon: Lightbulb, desc: 'Nudge in the right direction' },
          { label: 'Explain the common mistake', icon: RotateCcw, desc: 'Where learners often stumble' },
          { label: 'Show another worked example', icon: Sparkles, desc: 'Parallel problem walkthrough' },
          { label: 'Break down problem steps', icon: Zap, desc: 'Sequential method' },
        ];
      case 'quiz':
        return [
          { label: 'Explain this concept deeply', icon: BookOpen, desc: 'Underlying biological mechanism' },
          { label: 'Give me a hint without the answer', icon: Lightbulb, desc: 'Key clue to look for' },
          { label: 'Why is the correct option right?', icon: HelpCircle, desc: 'Scientific rationale' },
          { label: 'Explain the distractor traps', icon: RotateCcw, desc: 'Why other options fail' },
        ];
      case 'review':
        return [
          { label: 'Explain my weak area', icon: RotateCcw, desc: 'Targeted remediation' },
          { label: 'Help me review the main rules', icon: BookOpen, desc: 'Core axioms & formulas' },
          { label: 'Give me a simpler explanation', icon: Lightbulb, desc: 'Stripped down fundamentals' },
          { label: 'Create a quick memory anchor', icon: Sparkles, desc: 'Mnemonics & mental models' },
        ];
      case 'notes':
        return [
          { label: 'Improve my current note', icon: Sparkles, desc: 'Clarify phrasing & structure' },
          { label: 'Explain this key idea', icon: Lightbulb, desc: 'Expand on the active section' },
          { label: 'Turn this into 3 bullet points', icon: Zap, desc: 'High-yield distillation' },
          { label: 'Add relevant formulas & terms', icon: BookOpen, desc: 'Terminology check' },
        ];
      case 'more':
      default:
        return [
          { label: 'Summarize key ideas', icon: Zap, desc: 'Quick conceptual digest' },
          { label: 'Give real-world application', icon: Sparkles, desc: 'Practical context' },
          { label: 'Explain with an analogy', icon: Lightbulb, desc: 'Simplified mental picture' },
          { label: 'Test my understanding', icon: FileCheck, desc: 'Interactive check' },
        ];
    }
  };

  const suggestions = getSuggestionsForMode(activeMode);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectSuggestion(item.label)}
            className="shrink-0 h-7 px-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <item.icon className="w-3 h-3 text-[#6B7280]" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11.5px] font-bold text-[#9CA3AF] uppercase tracking-wider">
          Suggested Inquiries ({activeMode})
        </span>
        <span className="text-[11px] text-[#9CA3AF]">
          Click to start reasoning
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectSuggestion(item.label)}
              className="p-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F9FAFB] border border-[#E5E7EB] text-left group transition-all cursor-pointer shadow-2xs flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="w-6 h-6 rounded-lg bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] group-hover:text-[#111827] group-hover:bg-[#FFFFFF] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#111827] transition-transform group-hover:translate-x-0.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111827] group-hover:text-[#000000]">
                  {item.label}
                </p>
                <p className="text-[11px] text-[#6B7280] line-clamp-1 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
