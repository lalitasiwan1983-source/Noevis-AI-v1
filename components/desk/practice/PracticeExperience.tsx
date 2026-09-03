'use client';

import React, { useState, useMemo } from 'react';
import { PracticeTask } from './types';
import { getPracticeTasksForSource } from './data';
import { PracticeEmptyState } from './PracticeEmptyState';
import { PracticeGenerationState } from './PracticeGenerationState';
import { PracticeReadyCard } from './PracticeReadyCard';
import { PracticeSession } from './PracticeSession';
import { PracticeCompletion } from './PracticeCompletion';
import { PracticeErrorState } from './PracticeErrorState';
import { DeskWorkspaceMode } from '../types';

export type PracticeStateStep = 'generating' | 'ready' | 'session' | 'completion' | 'error';

interface PracticeExperienceProps {
  currentConceptIndex?: number;
  hasSourceContext?: boolean;
  conceptTitle?: string;
  sourceName?: string;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
  onGenerateNewPractice?: () => void;
}

export const PracticeExperience: React.FC<PracticeExperienceProps> = ({
  currentConceptIndex = 1,
  hasSourceContext = true,
  conceptTitle = 'Cellular Energetics & Enzymes',
  sourceName,
  onSwitchToLearn,
  onOpenAskNoevis,
  onChangeMode,
  onGenerateNewPractice,
}) => {
  // Practice Flow Step state: 'generating' -> 'ready' -> 'session' -> 'completion'
  const [step, setStep] = useState<PracticeStateStep>('generating');

  // Compute adaptive tasks based on active learning material/source
  const activeTasks = useMemo(() => {
    return getPracticeTasksForSource(sourceName, conceptTitle);
  }, [sourceName, conceptTitle]);

  // Completion results
  const [completionData, setCompletionData] = useState<{
    score: number;
    handledWell: string[];
    needsMorePractice: string[];
  }>({ score: 0, handledWell: [], needsMorePractice: [] });

  // If no source material is available
  if (!hasSourceContext) {
    return <PracticeEmptyState onSwitchToLearn={onSwitchToLearn} />;
  }

  // Error State
  if (step === 'error') {
    return (
      <PracticeErrorState
        onRetry={() => setStep('generating')}
      />
    );
  }

  // 1. Generation State (3s animated loading)
  if (step === 'generating') {
    return (
      <PracticeGenerationState
        conceptTitle={conceptTitle}
        onComplete={() => setStep('ready')}
      />
    );
  }

  // 2. Ready State (Horizontal Ready Card)
  if (step === 'ready') {
    return (
      <PracticeReadyCard
        onOpenPractice={() => setStep('session')}
      />
    );
  }

  // 3. Active Practice Session
  if (step === 'session') {
    return (
      <PracticeSession
        tasks={activeTasks}
        onSwitchToLearn={onSwitchToLearn}
        onComplete={(score, handledWell, needsMorePractice) => {
          setCompletionData({ score, handledWell, needsMorePractice });
          setStep('completion');
        }}
      />
    );
  }

  // 4. Completion State
  if (step === 'completion') {
    return (
      <PracticeCompletion
        score={completionData.score}
        total={activeTasks.length}
        handledWell={
          completionData.handledWell.length > 0
            ? completionData.handledWell
            : ['Core Concepts', 'Applied Analysis']
        }
        needsMorePractice={completionData.needsMorePractice}
        onPracticeAgain={() => setStep('session')}
        onGenerateNew={() => {
          if (onGenerateNewPractice) {
            onGenerateNewPractice();
          } else {
            setStep('generating');
          }
        }}
      />
    );
  }

  return null;
};
