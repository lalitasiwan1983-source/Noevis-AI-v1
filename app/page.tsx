'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { AuthScreen } from '@/components/screens/AuthScreen';
import { useToast } from '@/components/design-system/Toast';
import { Logo } from '@/components/design-system/Logo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type ScreenType = 'splash' | 'welcome' | 'auth' | 'onboarding';

export default function NoevisApp() {
  const [screen, setScreen] = useState<ScreenType>('welcome');
  const [userEmail, setUserEmail] = useState<string>('');
  const { info } = useToast();

  const handleStartLearning = () => {
    setScreen('auth');
  };

  const handleAuthSuccess = (userInfo: { email: string; method: 'google' | 'email' }) => {
    setUserEmail(userInfo.email);
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
          <motion.div
            key="onboarding-placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="min-h-[100dvh] w-full flex flex-col justify-between px-6 py-10 items-center bg-[#F7F8FA]"
          >
            <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center my-auto pt-12">
              <Logo size="welcome" variant="full" className="mb-8" />
              <div className="w-12 h-12 rounded-full bg-[#EEF0FF] text-[#4B5BEA] flex items-center justify-center mb-6 border border-[#DCE1FD]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
                Authentication Successful
              </h2>
              <p className="text-[#667085] text-base sm:text-lg mb-2 max-w-md">
                Connected as <span className="font-semibold text-[#111827]">{userEmail || 'learner@noevis.ai'}</span>.
              </p>
              <p className="text-[#9CA3AF] text-sm mb-8 max-w-sm">
                Next phase: Personalized learning space onboarding flow.
              </p>
              <button
                type="button"
                onClick={() => {
                  info('NOEVIS AI Onboarding', 'Onboarding workspace setup will open in Phase 3.');
                }}
                className="h-[52px] px-8 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white text-base font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Continue to Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-[#9CA3AF] text-center">
              NOEVIS AI • Learning Flow Stage 3 (Auth Complete)
            </div>
          </motion.div>
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

