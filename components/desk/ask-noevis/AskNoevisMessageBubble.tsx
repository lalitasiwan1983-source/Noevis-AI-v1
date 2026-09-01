'use client';

import React from 'react';
import {
  Sparkles,
  User,
  FilePlus2,
  HelpCircle,
  Eye,
  Zap,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { AskNoevisMessage } from './types';

interface AskNoevisMessageBubbleProps {
  message: AskNoevisMessage;
  onFollowUpAction?: (action: string) => void;
  onAddToNotes?: (text: string) => void;
}

export const AskNoevisMessageBubble: React.FC<AskNoevisMessageBubbleProps> = ({
  message,
  onFollowUpAction,
  onAddToNotes,
}) => {
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end items-end gap-2 text-left">
        <div className="max-w-[85%] sm:max-w-[78%] bg-[#111827] text-white rounded-2xl rounded-tr-xs px-4 py-3 text-xs sm:text-[13.5px] leading-relaxed shadow-2xs">
          <p className="font-medium">{message.text}</p>
          <span className="text-[10px] text-[#9CA3AF] block text-right mt-1">
            {message.timestamp}
          </span>
        </div>
        <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] shrink-0">
          <User className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  // Noevis Structured Response
  const formattedNoteContent = [
    `### Key Takeaway: ${message.text}`,
    message.explanation ? message.explanation : '',
    message.keyRule ? `**Rule:** ${message.keyRule}` : '',
    message.steps ? message.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  return (
    <div className="flex items-start gap-2.5 sm:gap-3 text-left">
      <div className="w-8 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
        <Sparkles className="w-4 h-4 text-[#F59E0B]" />
      </div>

      <div className="flex-1 space-y-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-2xs">
        {/* Header line */}
        <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2.5">
          <div>
            <span className="text-xs font-bold text-[#111827]">
              Noevis Assistant
            </span>
            <span className="text-[10.5px] text-[#6B7280] block">
              Contextual pedagogical reasoning
            </span>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">
            {message.timestamp}
          </span>
        </div>

        {/* 1. Direct Conceptual Summary */}
        <div className="text-xs sm:text-[13.5px] text-[#1F2937] leading-relaxed">
          {message.explanation || message.text}
        </div>

        {/* 2. Key Rule / Golden Principle Callout */}
        {message.keyRule && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] border-l-4 border-l-[#111827] space-y-1">
            <span className="text-[10.5px] font-bold text-[#4B5563] uppercase tracking-wider block">
              Core Principle
            </span>
            <p className="text-xs sm:text-[13px] font-medium text-[#111827] leading-snug">
              {message.keyRule}
            </p>
          </div>
        )}

        {/* 3. Step-by-Step Breakdown */}
        {message.steps && message.steps.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10.5px] font-bold text-[#6B7280] uppercase tracking-wider block">
              Step-by-Step Breakdown
            </span>
            <div className="space-y-1.5">
              {message.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#FAFAFB] border border-[#E5E7EB] flex items-start gap-2 text-xs text-[#374151]"
                >
                  <span className="w-4 h-4 rounded-full bg-[#E5E7EB] text-[#111827] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Concrete Example Box */}
        {message.example && (
          <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
            <span className="text-[10.5px] font-bold text-[#6B7280] uppercase tracking-wider block">
              Applied Example
            </span>
            <p className="text-xs text-[#374151] leading-relaxed">
              {message.example}
            </p>
          </div>
        )}

        {/* 5. Contextual Follow-Up Action Chips */}
        <div className="pt-2 border-t border-[#F3F4F6] space-y-2">
          <span className="text-[10.5px] font-semibold text-[#9CA3AF] block">
            Suggested Next Action:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => onFollowUpAction?.('Explain simpler')}
              className="h-7 px-2.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[11px] font-semibold text-[#374151] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#6B7280]" />
              <span>Explain simpler</span>
            </button>

            <button
              type="button"
              onClick={() => onFollowUpAction?.('Give another example')}
              className="h-7 px-2.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[11px] font-semibold text-[#374151] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#6B7280]" />
              <span>Another example</span>
            </button>

            {onAddToNotes && (
              <button
                type="button"
                onClick={() => onAddToNotes(formattedNoteContent)}
                className="h-7 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#111827]/20 text-[11px] font-semibold text-[#111827] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              >
                <FilePlus2 className="w-3 h-3 text-[#111827]" />
                <span>Add to Notes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
