'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DeskHeader } from './DeskHeader';
import { DeskContextStrip } from './DeskContextStrip';
import { DeskWorkspaceNav } from './DeskWorkspaceNav';
import { DeskLearningSurface } from './DeskLearningSurface';
import { DeskActionDock } from './DeskActionDock';
import { ReferenceDrawer } from './ReferenceDrawer';
import { AskNoevisDrawer } from './AskNoevisDrawer';
import { DeskMoreMenu } from './DeskMoreMenu';
import { DeskSearchModal } from './DeskSearchModal';
import { DeskWorkspaceMode, DeskContextData } from './types';
import { useToast } from '@/components/design-system/Toast';

interface DeskShellProps {
  deskTitle?: string;
  sourceType?: string;
  onBackToHome?: () => void;
  userEmail?: string;
  onResetOnboarding?: () => void;
}

export const DeskShell: React.FC<DeskShellProps> = ({
  deskTitle = 'Biology: Cellular Energetics & Respiration',
  sourceType = 'document',
  onBackToHome,
  userEmail = 'learner@noevis.ai',
}) => {
  const { info, success } = useToast();

  // Active Workspace Navigation Mode
  const [activeMode, setActiveMode] = useState<DeskWorkspaceMode>('learn');

  // Concept Index and Context State
  const [conceptIndex, setConceptIndex] = useState(1);
  const totalConcepts = 4;

  const conceptList = [
    'Light-Dependent Reactions & Photophosphorylation',
    'Calvin Cycle: Carbon Fixation & Glucose Synthesis',
    'Cellular Respiration & Glycolytic Pathway',
    'Oxidative Phosphorylation & ATP Yields',
  ];

  const currentConcept = conceptList[conceptIndex - 1] || conceptList[0];

  const contextData: DeskContextData = {
    deskTitle,
    topic: 'Biology',
    chapter: 'Chapter 6: Life Processes',
    currentConcept,
    conceptIndex,
    totalConcepts,
    sourceName: sourceType === 'youtube' ? 'YouTube Lecture: Cellular Energetics' : 'NCERT Class 10 Biology — Chapter 6',
    sourceType,
  };

  // Overlay Modals / Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isAskNoevisOpen, setIsAskNoevisOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

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
      // Escape closes everything
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsReferenceOpen(false);
        setIsAskNoevisOpen(false);
        setIsMoreMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMoreAction = (actionId: string) => {
    if (actionId === 'export') {
      info('Export Desk', 'Exporting formatted summary is scheduled for Phase 2.');
    } else if (actionId === 'share') {
      info('Share Workspace', 'Collaborative link copied to clipboard preview.');
    } else if (actionId === 'reset') {
      setConceptIndex(1);
      setActiveMode('learn');
      success('Progress Reset', 'Returned to Concept 1 in Learn mode.');
    } else if (actionId === 'source') {
      setIsReferenceOpen(true);
    } else if (actionId === 'preferences') {
      info('Desk Preferences', 'Visual typography and contrast settings preview.');
    }
  };

  const handleQuickAction = (actionName: string) => {
    if (actionName === 'simpler') {
      setIsAskNoevisOpen(true);
    } else if (actionName === 'example') {
      setIsAskNoevisOpen(true);
    } else if (actionName === 'visual') {
      // scroll to diagram section
      const diagramEl = document.getElementById('learn-visual-diagram-section');
      if (diagramEl) {
        diagramEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsAskNoevisOpen(true);
      }
    } else if (actionName === 'note') {
      setActiveMode('notes');
    }
  };

  return (
    <div
      id="noevis-desk-shell"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111827] flex flex-col justify-between overflow-x-hidden font-sans select-none"
    >
      {/* 1. TOP HEADER */}
      <DeskHeader
        deskTitle={deskTitle}
        onBack={onBackToHome || (() => {})}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenReference={() => setIsReferenceOpen((prev) => !prev)}
        onOpenAskNoevis={() => setIsAskNoevisOpen(true)}
        onToggleMoreMenu={() => setIsMoreMenuOpen((prev) => !prev)}
        isMoreMenuOpen={isMoreMenuOpen}
        isReferenceOpen={isReferenceOpen}
        isAskNoevisOpen={isAskNoevisOpen}
      />

      {/* Top Header More Menu Popover */}
      <DeskMoreMenu
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onAction={handleMoreAction}
      />

      {/* 2. CONTEXT STRIP */}
      <DeskContextStrip
        topic={contextData.topic}
        chapter={contextData.chapter}
        concept={contextData.currentConcept}
        conceptIndex={conceptIndex}
        totalConcepts={totalConcepts}
      />

      {/* 3. WORKSPACE NAVIGATION */}
      <DeskWorkspaceNav
        activeMode={activeMode}
        onChangeMode={setActiveMode}
      />

      {/* 4. MAIN LEARNING SURFACE CONTAINER */}
      <main className="w-full flex-1 flex flex-col justify-start pb-6">
        <DeskLearningSurface
          activeMode={activeMode}
          contextData={contextData}
          onOpenAskNoevis={() => setIsAskNoevisOpen(true)}
          onOpenReference={() => setIsReferenceOpen(true)}
          onChangeMode={setActiveMode}
          onNextConcept={handleNextConcept}
          onPrevConcept={handlePrevConcept}
        />
      </main>

      {/* 5. ACTION DOCK */}
      <DeskActionDock
        conceptIndex={conceptIndex}
        totalConcepts={totalConcepts}
        onPrevConcept={handlePrevConcept}
        onNextConcept={handleNextConcept}
        onOpenAskNoevis={() => setIsAskNoevisOpen(true)}
        onQuickAction={handleQuickAction}
      />

      {/* Contextual Drawers & Modals */}
      <ReferenceDrawer
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
        contextData={contextData}
      />

      <AskNoevisDrawer
        isOpen={isAskNoevisOpen}
        onClose={() => setIsAskNoevisOpen(false)}
        contextData={contextData}
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
