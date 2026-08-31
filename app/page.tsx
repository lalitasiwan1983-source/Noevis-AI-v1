'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { useToast } from '@/components/design-system/Toast';

export default function NoevisApp() {
  const [screen, setScreen] = useState<'splash' | 'welcome'>('splash');
  const { info } = useToast();

  // Reset splash if requested
  const handleReplaySplash = () => {
    setScreen('splash');
  };

  const handleSplashComplete = () => {
    setScreen('welcome');
  };

  const handleGetStarted = () => {
    info('NOEVIS AI • V1 Phase 1', 'Welcome to NOEVIS AI. Onboarding & workspace setup will unlock in Phase 2.');
  };

  const handleSignIn = () => {
    info('NOEVIS AI • Sign In', 'Authentication and account recovery will unlock in Phase 2.');
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111827] flex flex-col justify-between overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'splash' ? (
          <SplashScreen
            key="splash-screen"
            onComplete={handleSplashComplete}
            autoTransitionDelay={2200}
          />
        ) : (
          <WelcomeScreen
            key="welcome-screen"
            onGetStarted={handleGetStarted}
            onSignIn={handleSignIn}
            onReplaySplash={handleReplaySplash}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
