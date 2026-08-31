'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SplashScreenProps {
  onComplete?: () => void;
  autoTransitionDelay?: number; // Duration in ms before auto-transitioning to Welcome
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoTransitionDelay = 2200,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!onComplete) return;
    const timer = setTimeout(() => {
      onComplete();
    }, autoTransitionDelay);

    return () => clearTimeout(timer);
  }, [onComplete, autoTransitionDelay]);

  // Subtle spring/ease transitions
  const transitionConfig = shouldReduceMotion
    ? { duration: 0.3 }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      id="noevis-splash-screen"
      role="region"
      aria-label="NOEVIS AI Splash Screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      onClick={() => onComplete?.()}
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col items-center justify-center p-6 select-none cursor-default overflow-hidden"
    >
      {/* Optically Centered Identity Group */}
      <div className="flex flex-col items-center text-center -translate-y-2 sm:-translate-y-3">
        {/* 1. Official Noevis Logo Mark */}
        <motion.div
          id="splash-logo-mark"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.05 }}
          className="mb-5 sm:mb-6 flex items-center justify-center"
        >
          <svg
            className="w-[84px] h-[64px] sm:w-[116px] sm:h-[88px] text-[#111827]"
            viewBox="0 0 160 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Pillar 1: Base foot + First Ascending Step (Understand) */}
            <path
              d="M 14 96 H 38 C 45 96 50 91 50 84 V 68 C 50 60 56 54 64 54 C 72 54 78 60 78 68 V 96"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner contour of Pillar 1 */}
            <path
              d="M 50 82 C 50 87 54 91 60 91 H 68 C 74 91 78 87 78 82"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Pillar 2: Middle Ascending Step (Practice) */}
            <path
              d="M 78 68 C 78 52 86 40 98 40 C 110 40 118 52 118 68 V 96"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bottom scoop of Pillar 2 */}
            <path
              d="M 88 96 C 96 96 102 91 106 84 L 118 96"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pillar 3: Tallest Step (Master) + Sweeping Base Curve */}
            <path
              d="M 118 42 C 118 22 128 12 142 12 C 152 12 158 19 158 32 V 84 C 158 91 152 96 144 96 H 124"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* 2. Product Name: NOEVIS AI */}
        <motion.h1
          id="splash-product-name"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.22 }}
          className="text-[20px] sm:text-[24px] font-semibold text-[#111827] tracking-[-0.025em] leading-none mb-2 sm:mb-2.5"
        >
          NOEVIS AI
        </motion.h1>

        {/* 3. Official Tagline: Understand. Practice. Master. */}
        <motion.p
          id="splash-product-tagline"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.38 }}
          className="text-[13px] sm:text-[14.5px] font-normal text-[#667085] tracking-[-0.01em] leading-tight"
        >
          Understand. Practice. Master.
        </motion.p>
      </div>

      {/* Discreet accessibility hint for screen readers */}
      <span className="sr-only">
        NOEVIS AI — Understand. Practice. Master. Press anywhere to continue to welcome screen.
      </span>
    </motion.div>
  );
};
