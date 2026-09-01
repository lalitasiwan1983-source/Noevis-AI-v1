'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NotesHeader } from './NotesHeader';
import { NotesEditor } from './NotesEditor';
import { SaveStatus, DeskNote } from './types';
import { useToast } from '@/components/design-system/Toast';

interface NotesExperienceProps {
  topicTitle?: string;
  chapterTitle?: string;
  conceptName?: string;
  conceptIndex?: number;
  initialNote?: DeskNote;
  onNoteChange?: (note: DeskNote) => void;
  onOpenAskNoevis?: () => void;
}

export const NotesExperience: React.FC<NotesExperienceProps> = ({
  topicTitle = 'Biology',
  chapterTitle = 'Chapter 6: Life Processes',
  conceptName = 'Light-Dependent Reactions & Photophosphorylation',
  conceptIndex = 1,
  initialNote,
  onNoteChange,
  onOpenAskNoevis,
}) => {
  const { info, success } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Note Title & Content State
  const [title, setTitle] = useState(initialNote?.title ?? '');
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoSave = (newTitle: string, newContent: string) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      setSaveStatus('saved');
      if (onNoteChange) {
        onNoteChange({
          id: initialNote?.id || 'current-desk-note',
          title: newTitle,
          content: newContent,
          topic: topicTitle,
          chapter: chapterTitle,
          conceptName,
          conceptIndex,
        });
      }
    }, 600);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    triggerAutoSave(newTitle, content);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    triggerAutoSave(title, newContent);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Insert helper to append or wrap selection in textarea
  const insertTextAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      const updated = content + before + after;
      setContent(updated);
      triggerAutoSave(title, updated);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const replacement = before + (selectedText || '') + after;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    triggerAutoSave(title, newContent);

    // Reset cursor position smoothly
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Formatting tool dispatcher
  const handleFormat = (formatType: string) => {
    switch (formatType) {
      case 'bold':
        insertTextAtCursor('**', '**');
        break;
      case 'italic':
        insertTextAtCursor('*', '*');
        break;
      case 'h1':
        insertTextAtCursor('\n# ');
        break;
      case 'h2':
        insertTextAtCursor('\n## ');
        break;
      case 'bullet':
        insertTextAtCursor('\n- ');
        break;
      case 'number':
        insertTextAtCursor('\n1. ');
        break;
      case 'quote':
        insertTextAtCursor('\n> ');
        break;
      case 'highlight':
        insertTextAtCursor('==', '==');
        break;
      default:
        break;
    }
  };

  // Contextual Learning Insert Handlers
  const handleInsertConceptNote = () => {
    const headingSnippet = `\n\n### Concept ${conceptIndex}: ${conceptName}\n`;
    if (!title) {
      setTitle(`${topicTitle}: ${chapterTitle}`);
    }
    insertTextAtCursor(headingSnippet);
    info('Concept Added', `Inserted heading for Concept ${conceptIndex}.`);
  };

  const handleInsertExplanation = () => {
    const explanationSnippet = `\n> **Core Explanation (${conceptName})**:\n> Photosystem II absorbs light photons, transferring energy to drive photolysis (H₂O → 2H⁺ + 2e⁻ + ½O₂), establishing an electrochemical proton gradient across the thylakoid membrane.\n`;
    if (!title) {
      setTitle(`${topicTitle}: ${chapterTitle}`);
    }
    insertTextAtCursor(explanationSnippet);
    info('Explanation Saved', 'Inserted core explanation snippet.');
  };

  const handleInsertTakeaway = () => {
    const takeawaySnippet = `\n✦ **Key Takeaway**: ATP synthase photophosphorylates ADP to ATP driven by the proton gradient (chemiosmosis), yielding energy for subsequent Calvin cycle glucose synthesis.\n`;
    if (!title) {
      setTitle(`${topicTitle}: ${chapterTitle}`);
    }
    insertTextAtCursor(takeawaySnippet);
    info('Takeaway Saved', 'Inserted high-yield rule into notes.');
  };

  return (
    <div
      id="desk-notes-experience"
      className="w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-7 animate-fade-in pb-16"
    >
      {/* Header with Title, Context Breadcrumb, and Auto-save status */}
      <NotesHeader
        topic={topicTitle}
        chapter={chapterTitle}
        conceptName={conceptName}
        conceptIndex={conceptIndex}
        saveStatus={saveStatus}
      />

      {/* Spacious, Premium Writing Editor Surface */}
      <NotesEditor
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        onFormat={handleFormat}
        onInsertConceptNote={handleInsertConceptNote}
        onInsertExplanation={handleInsertExplanation}
        onInsertTakeaway={handleInsertTakeaway}
        currentConceptName={conceptName}
        textareaRef={textareaRef}
      />
    </div>
  );
};
