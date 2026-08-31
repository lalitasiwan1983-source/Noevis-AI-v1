'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
  onReplaySplash?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSignIn,
  onReplaySplash,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = shouldReduceMotion
    ? { duration: 0.3 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      id="noevis-welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between overflow-x-hidden"
    >
      {/* Top Bar: Small Noevis Logo / Wordmark */}
      <header className="w-full pt-8 sm:pt-12 md:pt-14 px-5 sm:px-8 max-w-5xl mx-auto flex items-center justify-between shrink-0">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.1 }}
        >
          <Logo size="sm" variant="full" />
        </motion.div>

        {/* Optional subtle replay button for reviewer accessibility */}
        {onReplaySplash && (
          <motion.button
            type="button"
            onClick={onReplaySplash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[13px] text-[#667085] hover:text-[#111827] px-2.5 py-1.5 rounded-[8px] hover:bg-[#EEF0FF]/60 transition-colors cursor-pointer"
            aria-label="Replay Splash Screen"
          >
            Replay Splash
          </motion.button>
        )}
      </header>

      {/* Main Centered Content Column */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-5 sm:px-6 md:px-8 py-8 sm:py-12 my-auto">
        <div className="w-full max-w-[540px] flex flex-col items-center text-center -translate-y-4 sm:-translate-y-6">
          {/* Primary Headline */}
          <motion.h1
            id="welcome-headline"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.15 }}
            className="text-[32px] sm:text-[40px] md:text-[46px] font-semibold text-[#111827] tracking-[-0.03em] leading-[1.14] mb-3.5 sm:mb-4 max-w-[480px]"
          >
            Learn with context.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            id="welcome-supporting-text"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.22 }}
            className="text-[16px] sm:text-[16.5px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.6] max-w-[460px] mb-8 sm:mb-9"
          >
            Noevis turns what you&apos;re learning into a focused space to understand, practice, and master it.
          </motion.p>

          {/* Action Group: Primary CTA + Secondary Sign In */}
          <motion.div
            id="welcome-actions-group"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.28 }}
            className="w-full flex flex-col items-center gap-3 sm:gap-3.5"
          >
            {/* Primary CTA: Get started */}
            <button
              id="welcome-cta-get-started"
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-[200px] h-[48px] px-6 rounded-[12px] bg-[#4B5BEA] hover:bg-[#3E4DD4] active:bg-[#323FB8] text-[#FFFFFF] text-[15px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/30 transition-all cursor-pointer flex items-center justify-center select-none"
            >
              Get started
            </button>

            {/* Secondary Action: Sign in */}
            <button
              id="welcome-action-sign-in"
              type="button"
              onClick={onSignIn}
              className="min-h-[44px] px-4 py-2 text-[14px] font-medium text-[#667085] hover:text-[#111827] transition-colors rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]/20 cursor-pointer flex items-center justify-center select-none"
            >
              Sign in
            </button>
          </motion.div>
        </div>
      </main>

      {/* Bottom Subtle Clearance / Footer Spacer */}
      <footer className="w-full pb-8 sm:pb-10 px-5 text-center shrink-0">
        <p className="text-[12px] text-[#9CA3AF] tracking-tight">
          NOEVIS AI • Understand. Practice. Master.
        </p>
      </footer>
    </motion.div>
  );
};
