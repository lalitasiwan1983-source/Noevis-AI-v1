'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { useToast } from '@/components/design-system/Toast';
import { Menu, X, Mail, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess?: (userInfo: { email: string; method: 'google' | 'email' }) => void;
  onBackToWelcome?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthSuccess,
  onBackToWelcome,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const { success, info } = useToast();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Welcome to NOEVIS AI', `Signed in as ${email.trim()}`);
      onAuthSuccess?.({ email: email.trim(), method: 'email' });
    }, 1200);
  };

  const handleGoogleAuth = () => {
    if (isGoogleSubmitting) return;
    setIsGoogleSubmitting(true);

    setTimeout(() => {
      setIsGoogleSubmitting(false);
      const googleUserEmail = 'user@gmail.com';
      success('Google Authentication Successful', 'Connected with Google account');
      onAuthSuccess?.({ email: googleUserEmail, method: 'google' });
    }, 1400);
  };

  // Entrance motion configuration (~300–600ms)
  const transitionConfig = shouldReduceMotion
    ? { duration: 0.2 }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      id="noevis-auth-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* 1. Header Navigation Bar (Identical to Welcome Screen) */}
      <header className="w-full h-[68px] sm:h-[72px] bg-[#FFFFFF] border-b border-[#E5E7EB]/80 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between shrink-0 z-30">
        {/* Left: Official NOEVIS AI Logo */}
        <motion.div
          id="auth-logo-container"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionConfig, delay: 0.05 }}
          className="flex items-center cursor-pointer"
          onClick={onBackToWelcome}
        >
          <Logo size="header" variant="full" showBadge={false} />
        </motion.div>

        {/* Right: Hamburger Menu Icon */}
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
                NOEVIS AI Auth Navigation
              </span>
              {onBackToWelcome && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBackToWelcome();
                  }}
                  className="flex items-center justify-between py-2 text-left font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors"
                >
                  <span>Back to Welcome Screen</span>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  info('NOEVIS AI Help', 'For login assistance, contact support@noevis.ai');
                }}
                className="flex items-center justify-between py-2 text-left font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors"
              >
                <span>Help & Support</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Authentication Content Area (Centered Horizontally & Optically Positioned) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-8 sm:py-12 my-auto">
        <div className="w-full max-w-[500px] sm:max-w-[540px] md:max-w-[560px] flex flex-col items-center text-center -translate-y-3 sm:-translate-y-5 md:-translate-y-7">
          {/* Headline */}
          <motion.h1
            id="auth-headline"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.12 }}
            className="text-[34px] sm:text-[42px] md:text-[50px] lg:text-[54px] font-bold text-[#111111] tracking-[-0.038em] leading-[1.05] mb-2 sm:mb-3"
          >
            Continue to Noevis.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            id="auth-supporting-text"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.18 }}
            className="text-[15.5px] sm:text-[16.5px] md:text-[17.5px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.5] mb-8 sm:mb-9"
          >
            Your learning space is waiting.
          </motion.p>

          {/* Form Container */}
          <motion.div
            id="auth-form-container"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: 0.24 }}
            className="w-full flex flex-col items-stretch"
          >
            {/* Primary Google Auth Button */}
            <button
              id="auth-google-button"
              type="button"
              onClick={handleGoogleAuth}
              disabled={isGoogleSubmitting || isSubmitting}
              className="w-full h-[56px] sm:h-[58px] rounded-[14px] bg-[#FFFFFF] border border-[#D9DDE3] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] text-[15.5px] sm:text-[16px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center select-none disabled:opacity-70"
              aria-label="Continue with Google"
            >
              {isGoogleSubmitting ? (
                <div className="flex items-center gap-2.5">
                  <svg
                    className="animate-spin h-4 w-4 text-[#111827]"
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
                  <span>Connecting Google Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </button>

            {/* Divider "or" */}
            <div className="relative flex items-center justify-center my-6 sm:my-7">
              <div className="w-full border-t border-[#E5E7EB]" />
              <span className="absolute bg-[#F7F8FA] px-4 text-xs font-normal text-[#9CA3AF] tracking-tight">
                or
              </span>
            </div>

            {/* Unified Email Input Form */}
            <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3.5">
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting || isGoogleSubmitting}
                  className="w-full h-[56px] sm:h-[58px] pl-12 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-[15.5px] sm:text-[16px] text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                />
              </div>

              {/* Primary Continue Button */}
              <button
                id="auth-continue-button"
                type="submit"
                disabled={!isValidEmail || isSubmitting || isGoogleSubmitting}
                className="w-full h-[56px] sm:h-[58px] rounded-[14px] bg-[#111111] hover:bg-[#1F2937] active:bg-[#030712] active:translate-y-[1px] text-[#FFFFFF] text-[15.5px] sm:text-[16px] font-semibold tracking-[-0.01em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2.5">
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
                    <span>Continuing...</span>
                  </div>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </form>

            {/* Microcopy & Terms */}
            <p className="text-[12.5px] sm:text-[13px] text-[#667085] text-center mt-5 mb-2">
              By continuing, you agree to Noevis AI’s{' '}
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="underline underline-offset-2 hover:text-[#111827] transition-colors"
              >
                Terms
              </button>{' '}
              &{' '}
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="underline underline-offset-2 hover:text-[#111827] transition-colors"
              >
                Privacy Policy
              </button>
              .
            </p>

            {/* Account Auto-Creation Note */}
            <p className="text-[12.5px] sm:text-[13px] text-[#9CA3AF] text-center">
              New to Noevis? Your account will be created automatically.
            </p>
          </motion.div>
        </div>
      </main>

      {/* 3. Footer Spacer */}
      <footer className="w-full pb-6 sm:pb-8 px-5 shrink-0" aria-hidden="true" />

      {/* Terms / Privacy Legal Modal */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E5E7EB] text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-3 text-[#111827]">
                {legalModal === 'terms' ? (
                  <FileText className="w-5 h-5 text-[#4B5BEA]" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-[#4B5BEA]" />
                )}
                <h3 className="text-lg font-semibold capitalize">
                  {legalModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-6">
                {legalModal === 'terms'
                  ? 'NOEVIS AI provides a focused learning environment. By accessing or using our services, you agree to comply with our academic integrity guidelines and platform usage policies.'
                  : 'Your privacy is paramount. NOEVIS AI protects your uploaded study context and learning history with end-to-end encryption. Your data is never sold or used to train public models.'}
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-lg hover:bg-[#1F2937] transition-colors"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
