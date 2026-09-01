'use client';

import React from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Highlighter,
  Plus,
  Sparkles,
  BookOpen,
  Lightbulb,
} from 'lucide-react';

interface NotesToolbarProps {
  onFormat: (formatType: string) => void;
  onInsertConceptNote?: () => void;
  onInsertExplanation?: () => void;
  onInsertTakeaway?: () => void;
  currentConceptName?: string;
}

export const NotesToolbar: React.FC<NotesToolbarProps> = ({
  onFormat,
  onInsertConceptNote,
  onInsertExplanation,
  onInsertTakeaway,
  currentConceptName,
}) => {
  return (
    <div
      id="notes-toolbar-container"
      className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 pb-2"
    >
      {/* Visual Lightweight Formatting Actions */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          onClick={() => onFormat('bold')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Bold (Ctrl+B / ⌘B)"
          aria-label="Bold text"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onFormat('italic')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Italic (Ctrl+I / ⌘I)"
          aria-label="Italic text"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />

        <button
          type="button"
          onClick={() => onFormat('h1')}
          className="min-h-[36px] px-2.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer"
          title="Heading 1"
          aria-label="Heading 1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onFormat('h2')}
          className="min-h-[36px] px-2.5 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer"
          title="Heading 2"
          aria-label="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />

        <button
          type="button"
          onClick={() => onFormat('bullet')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Bullet List"
          aria-label="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onFormat('number')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Numbered List"
          aria-label="Numbered list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onFormat('quote')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Quote Block"
          aria-label="Quote block"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onFormat('highlight')}
          className="min-h-[36px] w-9 rounded-lg bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] hover:text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors cursor-pointer"
          title="Highlight Text"
          aria-label="Highlight text"
        >
          <Highlighter className="w-3.5 h-3.5 text-[#D97706]" />
        </button>
      </div>

      {/* Learning-Aware Contextual Quick Actions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
        {onInsertConceptNote && (
          <button
            type="button"
            onClick={onInsertConceptNote}
            className="min-h-[36px] px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            title="Add current concept heading to notes"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Add this concept</span>
          </button>
        )}

        {onInsertExplanation && (
          <button
            type="button"
            onClick={onInsertExplanation}
            className="min-h-[36px] px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            title="Insert concept explanation snippet"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Save explanation</span>
          </button>
        )}

        {onInsertTakeaway && (
          <button
            type="button"
            onClick={onInsertTakeaway}
            className="min-h-[36px] px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#FAFAFB] border border-[#E5E7EB] text-xs font-semibold text-[#374151] hover:text-[#111827] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            title="Insert high-yield takeaway rule"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Add key takeaway</span>
          </button>
        )}
      </div>
    </div>
  );
};
