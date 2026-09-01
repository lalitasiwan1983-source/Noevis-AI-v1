'use client';

import React, { useRef, useEffect } from 'react';
import { PenLine, FileText } from 'lucide-react';
import { NotesToolbar } from './NotesToolbar';

interface NotesEditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onFormat: (formatType: string) => void;
  onInsertConceptNote?: () => void;
  onInsertExplanation?: () => void;
  onInsertTakeaway?: () => void;
  currentConceptName?: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onFormat,
  onInsertConceptNote,
  onInsertExplanation,
  onInsertTakeaway,
  currentConceptName,
  textareaRef,
}) => {
  const isFreshNote = !title && !content;

  // Auto-resize textarea smoothly on input
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(340, textareaRef.current.scrollHeight)}px`;
    }
  }, [content, textareaRef]);

  return (
    <div
      id="notes-editor-surface"
      className="w-full rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs p-5 sm:p-8 lg:p-10 space-y-4 text-left transition-all"
    >
      {/* Title Input Area */}
      <div className="w-full border-b border-[#F3F4F6] pb-3">
        <input
          type="text"
          id="notes-title-input"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Note title (e.g. Key Takeaways & Mechanisms)..."
          className="w-full text-xl sm:text-2xl lg:text-[26px] font-bold text-[#111827] placeholder:text-[#9CA3AF] bg-transparent border-0 focus:outline-none focus:ring-0 p-0 leading-tight"
        />
      </div>

      {/* Lightweight Formatting and Contextual Actions Bar */}
      <NotesToolbar
        onFormat={onFormat}
        onInsertConceptNote={onInsertConceptNote}
        onInsertExplanation={onInsertExplanation}
        onInsertTakeaway={onInsertTakeaway}
        currentConceptName={currentConceptName}
      />

      {/* Main Spacious Writing Canvas */}
      <div className="relative w-full min-h-[340px] sm:min-h-[420px] pt-2">
        {/* Soft, calm empty state background hint when completely untouched */}
        {isFreshNote && (
          <div
            className="absolute top-8 left-0 right-0 pointer-events-none flex flex-col items-start gap-1 select-none text-[#9CA3AF] px-1 animate-fade-in"
            aria-hidden="true"
          >
            <span className="text-base sm:text-lg font-semibold text-[#6B7280]">
              Capture what you learn.
            </span>
            <span className="text-xs sm:text-sm text-[#9CA3AF]">
              Your notes for this Desk will appear here. Type your observations, definitions, or use the quick actions above to add concept summaries.
            </span>
          </div>
        )}

        <textarea
          ref={textareaRef}
          id="notes-content-textarea"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder=""
          rows={14}
          className="w-full text-sm sm:text-base text-[#1F2937] leading-relaxed bg-transparent border-0 focus:outline-none focus:ring-0 p-0 resize-none font-normal selection:bg-[#E0E7FF] selection:text-[#3730A3]"
          aria-label="Notes content editor"
        />
      </div>
    </div>
  );
};
