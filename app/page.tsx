'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  SplashScreen,
  WelcomeScreen,
  AuthScreen,
  OnboardingScreen,
  CanvasScreen,
} from '@/components/screens';
import { OnboardingData } from '@/components/screens/OnboardingScreen';

type ScreenType = 'splash' | 'welcome' | 'auth' | 'onboarding' | 'canvas';

export default function NoevisApp() {
  const [screen, setScreen] = useState<ScreenType>('welcome');
  const [userEmail, setUserEmail] = useState<string>('');

  // Initialize saved onboarding data lazily
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const savedData = localStorage.getItem('noevis_onboarding_data');
      return savedData ? JSON.parse(savedData) : {};
    } catch {
      return {};
    }
  });

  const handleStartLearning = () => {
    setScreen('auth');
  };

  const handleAuthSuccess = (userInfo: { email: string; method: 'google' | 'email' }) => {
    setUserEmail(userInfo.email);

    // Check if user already completed onboarding
    try {
      const isCompleted = localStorage.getItem('noevis_onboarding_completed') === 'true';
      if (isCompleted) {
        setScreen('canvas');
        return;
      }
    } catch {
      // ignore
    }

    // Default to onboarding flow
    setScreen('onboarding');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setScreen('canvas');
  };

  const handleResetOnboarding = () => {
    try {
      localStorage.removeItem('noevis_onboarding_completed');
      localStorage.removeItem('noevis_onboarding_data');
      localStorage.removeItem('noevis_onboarding_draft');
    } catch {
      // ignore
    }
    setOnboardingData({});
    setScreen('onboarding');
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111827] flex flex-col justify-between overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen
            key="welcome-screen"
            onStartLearning={handleStartLearning}
          />
        )}

        {screen === 'auth' && (
          <AuthScreen
            key="auth-screen"
            onAuthSuccess={handleAuthSuccess}
            onBackToWelcome={() => setScreen('welcome')}
          />
        )}

        {screen === 'onboarding' && (
          <OnboardingScreen
            key="onboarding-screen"
            initialData={onboardingData}
            onComplete={handleOnboardingComplete}
            onBackToAuth={() => setScreen('auth')}
          />
        )}

        {screen === 'canvas' && (
          <CanvasScreen
            key="canvas-screen"
            userEmail={userEmail}
            onboardingData={onboardingData}
            onResetOnboarding={handleResetOnboarding}
          />
        )}

        {screen === 'splash' && (
          <SplashScreen
            key="splash-screen"
            onComplete={() => setScreen('welcome')}
            autoTransitionDelay={2200}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
