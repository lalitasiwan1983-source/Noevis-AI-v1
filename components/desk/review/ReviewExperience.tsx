'use client';

import React, { useState, useMemo } from 'react';
import { ReviewHeader } from './ReviewHeader';
import { ReviewStateOverview } from './ReviewStateOverview';
import { NeedsAttentionSection } from './NeedsAttentionSection';
import { DevelopingSection } from './DevelopingSection';
import { StrongSection } from './StrongSection';
import { NoevisInsightCard } from './NoevisInsightCard';
import { RecoveryConceptView } from './RecoveryConceptView';
import { ReviewEmptyState } from './ReviewEmptyState';
import { REVIEW_CONCEPTS } from './data';
import { ReviewConceptItem, ReviewStateSummary } from './types';
import { DeskWorkspaceMode } from '../types';
import { useToast } from '@/components/design-system/Toast';

interface ReviewExperienceProps {
  topicTitle?: string;
  chapterTitle?: string;
  onSwitchMode?: (mode: DeskWorkspaceMode) => void;
  onSelectConcept?: (conceptIndex: number) => void;
  onOpenAskNoevis?: () => void;
}

export const ReviewExperience: React.FC<ReviewExperienceProps> = ({
  topicTitle = 'Biology',
  chapterTitle = 'Chapter 6: Life Processes',
  onSwitchMode,
  onSelectConcept,
  onOpenAskNoevis,
}) => {
  const { info, success } = useToast();

  // Mode state: 'list' (overview list) | 'recovery' (active recovery view)
  const [activeView, setActiveView] = useState<'list' | 'recovery'>('list');
  const [activeRecoveryConcept, setActiveRecoveryConcept] = useState<ReviewConceptItem | null>(null);

  // Intentional Empty State toggle (to demonstrate new desk state without fake stats)
  const [isEmptyState, setIsEmptyState] = useState(false);

  // Active filter tab: 'all' | 'needs_attention' | 'developing' | 'strong'
  const [filter, setFilter] = useState<'all' | 'needs_attention' | 'developing' | 'strong'>('all');

  // Concepts list state
  const [concepts, setConcepts] = useState<ReviewConceptItem[]>(REVIEW_CONCEPTS);

  // Filtered concepts by category
  const needsAttentionItems = useMemo(
    () => concepts.filter((c) => c.state === 'needs_attention'),
    [concepts]
  );
  const developingItems = useMemo(
    () => concepts.filter((c) => c.state === 'developing'),
    [concepts]
  );
  const strongItems = useMemo(
    () => concepts.filter((c) => c.state === 'strong'),
    [concepts]
  );

  const summary: ReviewStateSummary = useMemo(
    () => ({
      needsAttentionCount: needsAttentionItems.length,
      developingCount: developingItems.length,
      strongCount: strongItems.length,
    }),
    [needsAttentionItems, developingItems, strongItems]
  );

  // Handler: Start Recovery
  const handleStartRecovery = (concept: ReviewConceptItem) => {
    setActiveRecoveryConcept(concept);
    setActiveView('recovery');
  };

  // Handler: Concept recovered
  const handleMarkRecovered = (conceptId: string) => {
    setConcepts((prev) =>
      prev.map((c) =>
        c.id === conceptId
          ? {
              ...c,
              state: 'developing',
              reason: 'Recently refreshed core mechanism — ready for active problem practice.',
            }
          : c
      )
    );
  };

  // Handler: Open in Learn
  const handleOpenLearn = (conceptIndex: number) => {
    if (onSelectConcept) {
      onSelectConcept(conceptIndex);
    }
    if (onSwitchMode) {
      onSwitchMode('learn');
    }
  };

  // Handler: Open in Practice
  const handleStartPractice = (concept: ReviewConceptItem) => {
    if (onSelectConcept) {
      onSelectConcept(concept.conceptIndex);
    }
    if (onSwitchMode) {
      onSwitchMode('practice');
    }
  };

  // 1. RECOVERY VIEW (Active Single Concept Recovery Session)
  if (activeView === 'recovery' && activeRecoveryConcept) {
    return (
      <RecoveryConceptView
        concept={activeRecoveryConcept}
        onBackToReview={() => setActiveView('list')}
        onOpenFullLearn={handleOpenLearn}
        onOpenAskNoevis={onOpenAskNoevis}
        onMarkRecovered={handleMarkRecovered}
      />
    );
  }

  // 2. EMPTY / NEW DESK STATE
  if (isEmptyState) {
    return (
      <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6">
        <ReviewHeader
          topicTitle={topicTitle}
          chapterTitle={chapterTitle}
          isEmptyState={true}
          onToggleEmptyState={() => setIsEmptyState(false)}
        />
        <ReviewEmptyState
          onSwitchMode={(mode) => onSwitchMode?.(mode)}
          onPopulateReview={() => setIsEmptyState(false)}
        />
      </div>
    );
  }

  // 3. MAIN REVIEW EXPERIENCE
  return (
    <div
      id="desk-review-experience"
      className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-7 animate-fade-in"
    >
      {/* Header */}
      <ReviewHeader
        topicTitle={topicTitle}
        chapterTitle={chapterTitle}
        isEmptyState={false}
        onToggleEmptyState={() => setIsEmptyState(true)}
      />

      {/* Learning State Overview Strip */}
      <ReviewStateOverview
        summary={summary}
        selectedFilter={filter}
        onSelectFilter={setFilter}
      />

      {/* Priority 1: Needs Attention (Recovery Area) */}
      {(filter === 'all' || filter === 'needs_attention') && (
        <NeedsAttentionSection
          items={needsAttentionItems}
          onStartRecovery={handleStartRecovery}
          onOpenLearnConcept={handleOpenLearn}
        />
      )}

      {/* Priority 2: Developing (Practice Area) */}
      {(filter === 'all' || filter === 'developing') && (
        <DevelopingSection
          items={developingItems}
          onStartPractice={handleStartPractice}
        />
      )}

      {/* Priority 3: Strong (Secondary Foundation Area) */}
      {(filter === 'all' || filter === 'strong') && (
        <StrongSection
          items={strongItems}
          onOpenConcept={handleOpenLearn}
        />
      )}

      {/* Subtle Noevis Insight */}
      <NoevisInsightCard
        insightText="You understand the core idea. Applying it in unfamiliar situations needs more practice."
        actionText="Practice this"
        onAction={() => {
          if (developingItems.length > 0) {
            handleStartPractice(developingItems[0]);
          } else if (onSwitchMode) {
            onSwitchMode('practice');
          }
        }}
      />
    </div>
  );
};
