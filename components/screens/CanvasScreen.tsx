'use client';

import React from 'react';
import { DeskShell } from '@/components/desk';
import { OnboardingData } from './OnboardingScreen';

interface CanvasScreenProps {
  userEmail?: string;
  onboardingData?: Partial<OnboardingData>;
  onResetOnboarding?: () => void;
  onBackToHome?: () => void;
  deskTitle?: string;
  sourceType?: string;
}

export const CanvasScreen: React.FC<CanvasScreenProps> = ({
  userEmail = 'learner@noevis.ai',
  onboardingData,
  onResetOnboarding,
  onBackToHome,
  deskTitle = 'Biology: Photosynthesis & Cellular Respiration',
  sourceType = 'document',
}) => {
  return (
    <DeskShell
      deskTitle={deskTitle}
      sourceType={sourceType}
      userEmail={userEmail}
      onBackToHome={onBackToHome}
      onResetOnboarding={onResetOnboarding}
    />
  );
};
