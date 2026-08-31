'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { useToast } from '@/components/design-system/Toast';
import { Menu, X, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface WelcomeScreenProps {
  onStartLearning?: () => void;
  onSeeHowItWorks?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartLearning,
  onSeeHowItWorks,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { info } = useToast();

  const handleStartLearning = () => {
    setIsLoading(true);
    if (onStartLearning) {
      onStartLearning();
    } else {
      info(
        'NOEVIS AI • Start Learning',
        'Connecting to authentication flow (Phase 2). Account setup will open in the next phase.'
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSeeHowItWorks = () => {
    if (onSeeHowItWorks) {
      onSeeHowItWorks();
    } else {
      setIsModalOpen(true);
    }
  };

  // Entrance animation configuration (~450-650ms)
  const transitionConfig = shouldReduceMotion
    ? { duration: 0.2 }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      id="noevis-welcome-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* 1. Header Navigation Bar (Matches Reference Pixel-for-Pixel) */}
      <header className="w-full h-[68px] sm:h-[72px] bg-[#FFFFFF] border-b border-[#E5E7EB]/80 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between shrink-0 z-30">
        {/* Left: Official NOEVIS AI Logo */}
        <motion.div
          id="welcome-logo-container"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.05 }}
          className="flex items-center"
        >
          <Logo size="header" variant="full" showBadge={false} />
        </motion.div>

        {/* Right: Clean Hamburger Menu Icon */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.08 }}
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 stroke-[2]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2]" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Slide-out Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] sm:top-[72px] left-0 right-0 bg-white border-b border-[#E5E7EB] shadow-lg z-20 px-6 py-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3 max-w-5xl mx-auto w-full">
              <span className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
                NOEVIS AI Navigation
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleStartLearning();
                }}
                className="flex items-center justify-between py-2 text-left font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSeeHowItWorks();
                }}
                className="flex items-center justify-between py-2 text-left font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors"
              >
                <span>See How It Works</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Hero Section (Optically Centered in Viewport) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 my-auto">
        <div className="w-full max-w-[620px] md:max-w-[680px] flex flex-col items-center text-center -translate-y-4 sm:-translate-y-6 md:-translate-y-8 lg:-translate-y-10">
          {/* Main Headline */}
          <motion.h1
            id="welcome-headline"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.12 }}
            className="text-[34px] sm:text-[44px] md:text-[54px] lg:text-[60px] font-bold text-[#111827] tracking-[-0.038em] leading-[1.04] mb-4 sm:mb-5 md:mb-6 max-w-[580px] md:max-w-[660px]"
          >
            Learn with context.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            id="welcome-supporting-text"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.2 }}
            className="text-[15.5px] sm:text-[16.5px] md:text-[17.5px] lg:text-[18px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.6] max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[620px] mb-8 sm:mb-9 md:mb-10"
          >
            Turn anything you’re learning into a focused space to understand, practice, and master it.
          </motion.p>

          {/* Action Buttons: Left "See how it works", Right "Start learning" (Matches Reference) */}
          <motion.div
            id="welcome-cta-container"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.28 }}
            className="w-full sm:w-auto flex flex-col-reverse sm:flex-row items-center justify-center gap-3.5 sm:gap-4 md:gap-4.5"
          >
            {/* Secondary CTA: See how it works */}
            <button
              id="welcome-cta-see-how-it-works"
              type="button"
              onClick={handleSeeHowItWorks}
              className="w-full sm:w-[200px] md:w-[210px] h-[50px] sm:h-[52px] px-6 rounded-full bg-[#FFFFFF] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] text-[15px] sm:text-[16px] font-semibold tracking-[-0.01em] border-2 border-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center select-none"
            >
              See how it works
            </button>

            {/* Primary CTA: Start learning */}
            <button
              id="welcome-cta-start-learning"
              type="button"
              onClick={handleStartLearning}
              disabled={isLoading}
              className="w-full sm:w-[210px] md:w-[220px] h-[50px] sm:h-[52px] px-6 rounded-full bg-[#111827] hover:bg-[#1F2937] active:bg-[#030712] active:translate-y-[1px] text-[#FFFFFF] text-[15px] sm:text-[16px] font-semibold tracking-[-0.01em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-80"
              aria-label="Start learning with NOEVIS AI"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Connecting...</span>
                </div>
              ) : (
                <span>Start learning</span>
              )}
            </button>
          </motion.div>
        </div>
      </main>

      {/* 3. Footer Spacer (Clean Whitespace Maintenance) */}
      <footer className="w-full pb-6 sm:pb-8 px-5 shrink-0" aria-hidden="true" />

      {/* "See How It Works" Context Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-[#E5E7EB] text-left relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-[#9CA3AF] hover:text-[#111827] transition-colors p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-wider text-[#4B5BEA] uppercase bg-[#EEF0FF] px-2.5 py-1 rounded-full border border-[#DCE1FD]">
                  NOEVIS Methodology
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3">
                How Noevis Works
              </h3>

              <p className="text-sm sm:text-base text-[#667085] leading-relaxed mb-6">
                Noevis replaces fragmented study tools with a unified context space tailored to your learning material.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F3F4F6] text-[#111827] shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#111827]">1. Connect Context</h4>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Upload papers, codebases, notes, or lecture slides to build a dedicated context graph.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F3F4F6] text-[#111827] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#111827]">2. Interactive Practice</h4>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Test your understanding through adaptive problem sets, diagnostic questions, and guided loops.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#F3F4F6] text-[#111827] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#111827]">3. Verified Mastery</h4>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Track conceptual retention with precision feedback and structured mastery milestones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#667085] hover:text-[#111827] transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    handleStartLearning();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#111827] text-white text-sm font-semibold hover:bg-[#1F2937] transition-colors"
                >
                  Start learning now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
