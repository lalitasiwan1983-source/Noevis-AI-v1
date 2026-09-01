'use client';

import React from 'react';
import { Check, Loader2, ChevronRight, BookOpen } from 'lucide-react';
import { SaveStatus } from './types';

interface NotesHeaderProps {
  topic: string;
  chapter: string;
  conceptName?: string;
  conceptIndex?: number;
  saveStatus: SaveStatus;
}

export const NotesHeader: React.FC<NotesHeaderProps> = ({
  topic,
  chapter,
  conceptName,
  conceptIndex,
  saveStatus,
}) => {
  return (
    <div id="notes-header-container" className="w-full space-y-3 pb-4 border-b border-[#E5E7EB]">
      {/* Top row: Section Title & Auto-save visual indicator */}
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
            Notes
          </h1>
          <p className="text-sm sm:text-[14.5px] text-[#667085]">
            Notes for the current Desk / topic.
          </p>
        </div>

        {/* Subtle Save Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-medium shrink-0 shadow-2xs select-none">
          {saveStatus === 'saving' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 text-[#6B7280] animate-spin" />
              <span className="text-[#6B7280]">Saving…</span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[2.5]" />
              <span className="text-[#374151]">Saved</span>
            </>
          )}
        </div>
      </div>

      {/* Context Awareness Breadcrumb: Desk › Topic › Chapter › Concept */}
      <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#6B7280] flex-wrap pt-1">
        <span className="font-semibold text-[#111827]">{topic}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
        <span className="text-[#4B5563] truncate max-w-[180px] sm:max-w-none">{chapter}</span>
        {conceptName && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span className="inline-flex items-center gap-1 text-[#6366F1] font-medium truncate max-w-[220px] sm:max-w-none">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>
                {conceptIndex ? `Concept ${conceptIndex}: ` : ''}
                {conceptName}
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
