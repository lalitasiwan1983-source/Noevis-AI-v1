'use client';

import React, { useState, useEffect } from 'react';
import { DeskSplitWorkspace } from './DeskSplitWorkspace';
import { ReferenceDrawer } from './reference';
import { AskNoevisDrawer } from './ask-noevis';
import { DeskSearchModal } from './DeskSearchModal';
import { DeskWorkspaceMode, DeskContextData } from './types';
import { DeskNote } from './notes';
import { useToast } from '@/components/design-system/Toast';

interface DeskShellProps {
  deskTitle?: string;
  sourceType?: string;
  onBackToHome?: () => void;
  userEmail?: string;
  onResetOnboarding?: () => void;
}

export const DeskShell: React.FC<DeskShellProps> = ({
  deskTitle = 'Biology: Photosynthesis',
  sourceType = 'document',
  onBackToHome,
  userEmail = 'learner@noevis.ai',
}) => {
  const { success } = useToast();

  // Active Workspace Navigation Mode
  const [activeMode, setActiveMode] = useState<DeskWorkspaceMode>('learn');

  // Concept Index and Context State
  const [conceptIndex, setConceptIndex] = useState(1);
  const totalConcepts = 6;

  const conceptList = [
    'Concept 1: Autotrophic Nutrition & Light Capture',
    'Concept 2: Light Reactions & Photolysis of Water',
    'Concept 3: Calvin Cycle & Carbon Fixation',
    'Concept 4: Chloroplast Anatomy & Stomatal Dynamics',
    'Concept 5: Factors Affecting Photosynthetic Rate',
    'Concept 6: CAM & C4 Ecological Adaptations',
  ];

  const currentConcept = conceptList[conceptIndex - 1] || conceptList[0];

  const contextData: DeskContextData = {
    deskTitle,
    topic: 'Biology',
    chapter: 'Biology - Plant Biology',
    currentConcept,
    conceptIndex,
    totalConcepts,
    sourceName: sourceType === 'youtube' ? 'YouTube Lecture: Photosynthesis' : 'NCERT Class 10 Biology — Plant Biology',
    sourceType,
    activeMode,
  };

  // Persistent Desk Note State for current learning context
  const [deskNote, setDeskNote] = useState<DeskNote>({
    id: 'current-desk-note',
    title: 'Photosynthesis Notes',
    content: 'Photosynthesis converts solar photons into chemical glucose bonds.',
    topic: contextData.topic,
    chapter: contextData.chapter,
    conceptName: currentConcept,
    conceptIndex,
  });

  // Overlay Modals / Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isAskNoevisOpen, setIsAskNoevisOpen] = useState(false);

  // Pagination Handlers
  const handlePrevConcept = () => {
    if (conceptIndex > 1) {
      setConceptIndex((prev) => prev - 1);
    }
  };

  const handleNextConcept = () => {
    if (conceptIndex < totalConcepts) {
      setConceptIndex((prev) => prev + 1);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K for Search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      // ⌘J or Ctrl+J for Ask Noevis
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setIsAskNoevisOpen((prev) => !prev);
      }
      // Escape closes overlays
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsReferenceOpen(false);
        setIsAskNoevisOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="noevis-desk-shell" className="relative min-h-[100dvh] w-full bg-[#F8F9FA] text-[#111827] overflow-hidden select-none">
      {/* UNIFIED SPLIT WORKSPACE */}
      <DeskSplitWorkspace
        contextData={contextData}
        activeMode={activeMode}
        onChangeMode={setActiveMode}
        conceptIndex={conceptIndex}
        totalConcepts={totalConcepts}
        onNextConcept={handleNextConcept}
        onPrevConcept={handlePrevConcept}
        onSelectConcept={setConceptIndex}
        onOpenAskNoevis={() => setIsAskNoevisOpen(true)}
        onOpenReference={() => setIsReferenceOpen(true)}
        note={deskNote}
        onNoteChange={setDeskNote}
        onBackToHome={onBackToHome}
        userEmail={userEmail}
      />

      {/* Contextual Drawers & Modals */}
      <ReferenceDrawer
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
        contextData={contextData}
        onAddToNotes={(excerpt) => {
          setDeskNote((prev) => ({
            ...prev,
            content: prev.content
              ? `${prev.content}\n\n> **[Source Excerpt]**\n> "${excerpt}"\n`
              : `> **[Source Excerpt]**\n> "${excerpt}"\n`,
          }));
          success('Added to Notes', 'Source excerpt appended to your Desk notes.');
        }}
      />

      <AskNoevisDrawer
        isOpen={isAskNoevisOpen}
        onClose={() => setIsAskNoevisOpen(false)}
        contextData={contextData}
        onAddToNotes={(text) => {
          setDeskNote((prev) => ({
            ...prev,
            content: prev.content
              ? `${prev.content}\n\n${text}\n`
              : `${text}\n`,
          }));
        }}
      />

      <DeskSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectConcept={(name) => {
          const idx = conceptList.findIndex((c) => c === name);
          if (idx !== -1) {
            setConceptIndex(idx + 1);
          }
          setActiveMode('learn');
        }}
      />
    </div>
  );
};


