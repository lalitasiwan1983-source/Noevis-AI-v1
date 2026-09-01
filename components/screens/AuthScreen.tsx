'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { useToast } from '@/components/design-system/Toast';
import {
  Menu,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  CheckCircle,
} from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess?: (userInfo: { email: string; method: 'google' | 'email' }) => void;
  onBackToWelcome?: () => void;
}

type AuthMode = 'choice' | 'signin' | 'signup' | 'forgot';

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthSuccess,
  onBackToWelcome,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<AuthMode>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const { success, info } = useToast();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPassword = password.length >= 6;

  const handleGoogleAuth = () => {
    if (isGoogleSubmitting || isSubmitting) return;
    setIsGoogleSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsGoogleSubmitting(false);
      const googleUserEmail = 'user@gmail.com';
      success('Google Authentication Successful', 'Connected with Google account');
      onAuthSuccess?.({ email: googleUserEmail, method: 'google' });
    }, 1200);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Welcome back to NOEVIS AI', `Signed in as ${email.trim()}`);
      onAuthSuccess?.({ email: email.trim(), method: 'email' });
    }, 1200);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isValidEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Account Created', `Welcome to NOEVIS AI, ${email.trim()}`);
      onAuthSuccess?.({ email: email.trim(), method: 'email' });
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isValidEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotSuccess(true);
      info('Password Reset Sent', `Check ${email.trim()} for instructions.`);
    }, 1000);
  };

  const handleSwitchMode = (newMode: AuthMode) => {
    setErrorMessage(null);
    setForgotSuccess(false);
    setMode(newMode);
  };

  const transitionConfig = shouldReduceMotion
    ? { duration: 0.15 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      id="noevis-auth-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* 1. Header Navigation Bar (Matches Welcome screen) */}
      <header className="w-full h-[68px] sm:h-[72px] bg-[#FFFFFF] border-b border-[#E5E7EB]/80 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between shrink-0 z-30">
        {/* Left: NOEVIS AI Logo */}
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

        {/* Right: Menu Icon */}
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

      {/* 2. Main Auth Content Container (Centered spatially and visually) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8 sm:py-12 my-auto">
        <div className="w-full max-w-[420px] sm:max-w-[440px] flex flex-col items-center text-center -translate-y-2 sm:-translate-y-4">
          
          <AnimatePresence mode="wait">
            {/* ========================================================== */}
            {/* CHOICE MODE: Initial Two Options (Google & Email)          */}
            {/* ========================================================== */}
            {mode === 'choice' && (
              <motion.div
                key="choice-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="w-full flex flex-col items-center"
              >
                {/* Heading */}
                <h1
                  id="auth-choice-heading"
                  className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] mb-2"
                >
                  Welcome back
                </h1>

                {/* Supporting Text */}
                <p className="text-[15px] sm:text-[16px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.4] mb-8 sm:mb-9">
                  Continue your learning journey.
                </p>

                {/* Authentication Options (ONLY TWO) */}
                <div className="w-full flex flex-col gap-3.5">
                  {/* Primary: Continue with Google */}
                  <button
                    type="button"
                    id="auth-google-choice-btn"
                    onClick={handleGoogleAuth}
                    disabled={isGoogleSubmitting}
                    className="w-full h-[54px] sm:h-[56px] px-5 rounded-[14px] bg-[#FFFFFF] border border-[#D9DDE3] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] text-[15px] sm:text-[15.5px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center select-none disabled:opacity-70"
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
                        <span>Connecting with Google...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full relative">
                        <svg className="w-5 h-5 absolute left-1" viewBox="0 0 24 24">
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
                        <span className="font-medium text-[#111827]">Continue with Google</span>
                      </div>
                    )}
                  </button>

                  {/* Secondary: Continue with Email */}
                  <button
                    type="button"
                    id="auth-email-choice-btn"
                    onClick={() => handleSwitchMode('signin')}
                    className="w-full h-[54px] sm:h-[56px] px-5 rounded-[14px] bg-[#FFFFFF] border border-[#D9DDE3] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] text-[15px] sm:text-[15.5px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center select-none"
                  >
                    <div className="flex items-center justify-center w-full relative">
                      <Mail className="w-5 h-5 text-[#667085] absolute left-1" />
                      <span className="font-medium text-[#111827]">Continue with email</span>
                    </div>
                  </button>
                </div>

                {/* Bottom Registration Switch */}
                <div className="mt-8 pt-4 text-xs sm:text-sm text-[#667085]">
                  <span>New to Noevis? </span>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signup')}
                    className="font-semibold text-[#111827] hover:text-[#4B5BEA] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* SIGN IN MODE: Email & Password Form                        */}
            {/* ========================================================== */}
            {mode === 'signin' && (
              <motion.div
                key="signin-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="w-full flex flex-col items-center"
              >
                {/* Heading */}
                <h1
                  id="auth-signin-heading"
                  className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] mb-2"
                >
                  Welcome back
                </h1>

                {/* Supporting Text */}
                <p className="text-[15px] sm:text-[16px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.4] mb-6 sm:mb-8">
                  Continue your learning journey.
                </p>

                {/* Inline Error Message */}
                {errorMessage && (
                  <div className="w-full mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs font-medium text-[#B91C1C] text-left">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignInSubmit} className="w-full flex flex-col gap-4 text-left">
                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signin-email-input" className="text-xs font-semibold text-[#374151]">
                      Email address
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                      <input
                        id="signin-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                        className="w-full h-[52px] sm:h-[54px] pl-11 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="signin-password-input" className="text-xs font-semibold text-[#374151]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('forgot')}
                        className="text-xs font-medium text-[#667085] hover:text-[#4B5BEA] transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                      <input
                        id="signin-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        disabled={isSubmitting}
                        className="w-full h-[52px] sm:h-[54px] pl-11 pr-11 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 p-1 text-[#9CA3AF] hover:text-[#111827] transition-colors cursor-pointer rounded-lg"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Primary Action */}
                  <button
                    type="submit"
                    id="signin-submit-btn"
                    disabled={isSubmitting}
                    className="w-full h-[52px] sm:h-[54px] mt-2 rounded-[14px] bg-[#111827] hover:bg-[#1F2937] active:bg-[#030712] text-white text-sm font-semibold tracking-[-0.01em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
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
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </button>
                </form>

                {/* Back to choices button */}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('choice')}
                  className="mt-5 text-xs text-[#667085] hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Other sign in options</span>
                </button>

                {/* Switch to Sign Up */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]/70 w-full text-xs sm:text-sm text-[#667085] text-center">
                  <span>New to Noevis? </span>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signup')}
                    className="font-semibold text-[#111827] hover:text-[#4B5BEA] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* SIGN UP MODE: Registration Form                            */}
            {/* ========================================================== */}
            {mode === 'signup' && (
              <motion.div
                key="signup-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="w-full flex flex-col items-center"
              >
                {/* Heading */}
                <h1
                  id="auth-signup-heading"
                  className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] mb-2"
                >
                  Create an account
                </h1>

                {/* Supporting Text */}
                <p className="text-[15px] sm:text-[16px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.4] mb-6 sm:mb-8">
                  Start your learning journey.
                </p>

                {/* Primary Google Auth Option */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isGoogleSubmitting}
                  className="w-full h-[52px] sm:h-[54px] px-5 rounded-[14px] bg-[#FFFFFF] border border-[#D9DDE3] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#111827] text-sm font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] transition-all duration-150 cursor-pointer flex items-center justify-center select-none disabled:opacity-70 mb-5"
                >
                  {isGoogleSubmitting ? (
                    <div className="flex items-center gap-2">
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
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full relative">
                      <svg className="w-5 h-5 absolute left-1" viewBox="0 0 24 24">
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

                {/* Divider */}
                <div className="relative flex items-center justify-center w-full mb-5">
                  <div className="w-full border-t border-[#E5E7EB]" />
                  <span className="absolute bg-[#F7F8FA] px-3 text-xs font-normal text-[#9CA3AF]">
                    or
                  </span>
                </div>

                {/* Inline Error Message */}
                {errorMessage && (
                  <div className="w-full mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs font-medium text-[#B91C1C] text-left">
                    {errorMessage}
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSignUpSubmit} className="w-full flex flex-col gap-4 text-left">
                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-email-input" className="text-xs font-semibold text-[#374151]">
                      Email address
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                      <input
                        id="signup-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={isSubmitting}
                        className="w-full h-[52px] sm:h-[54px] pl-11 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-password-input" className="text-xs font-semibold text-[#374151]">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                      <input
                        id="signup-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        disabled={isSubmitting}
                        className="w-full h-[52px] sm:h-[54px] pl-11 pr-11 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 p-1 text-[#9CA3AF] hover:text-[#111827] transition-colors cursor-pointer rounded-lg"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="signup-submit-btn"
                    disabled={isSubmitting}
                    className="w-full h-[52px] sm:h-[54px] mt-2 rounded-[14px] bg-[#111827] hover:bg-[#1F2937] active:bg-[#030712] text-white text-sm font-semibold tracking-[-0.01em] shadow-[0_2px_4px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] focus-visible:ring-offset-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 select-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
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
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <span>Create account</span>
                    )}
                  </button>
                </form>

                {/* Switch to Sign In */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]/70 w-full text-xs sm:text-sm text-[#667085] text-center">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('signin')}
                    className="font-semibold text-[#111827] hover:text-[#4B5BEA] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* FORGOT PASSWORD MODE                                       */}
            {/* ========================================================== */}
            {mode === 'forgot' && (
              <motion.div
                key="forgot-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionConfig}
                className="w-full flex flex-col items-center text-center"
              >
                <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] mb-2">
                  Reset password
                </h1>
                <p className="text-xs sm:text-sm font-normal text-[#667085] tracking-[-0.01em] leading-[1.4] mb-6">
                  Enter your email address and we&apos;ll send you a password recovery link.
                </p>

                {forgotSuccess ? (
                  <div className="w-full p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs flex flex-col items-center text-center">
                    <CheckCircle className="w-8 h-8 text-[#10B981] mb-2" />
                    <h3 className="text-sm font-semibold text-[#111827]">Check your inbox</h3>
                    <p className="text-xs text-[#667085] mt-1 mb-4 leading-relaxed">
                      If an account exists for <span className="font-semibold text-[#111827]">{email}</span>, you will receive password reset instructions shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('signin')}
                      className="w-full py-2.5 rounded-xl bg-[#111827] text-white text-xs font-semibold hover:bg-[#1F2937] transition-colors"
                    >
                      Back to Sign in
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="w-full flex flex-col gap-4 text-left">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs font-medium text-[#B91C1C]">
                        {errorMessage}
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="forgot-email-input" className="text-xs font-semibold text-[#374151]">
                        Email address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                        <input
                          id="forgot-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          disabled={isSubmitting}
                          className="w-full h-[52px] pl-11 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:ring-1 focus:ring-[#4B5BEA] rounded-[14px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[52px] rounded-[14px] bg-[#111827] hover:bg-[#1F2937] active:bg-[#030712] text-white text-sm font-semibold tracking-[-0.01em] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending link...</span>
                        </div>
                      ) : (
                        <span>Send reset link</span>
                      )}
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => handleSwitchMode('signin')}
                  className="mt-6 text-xs font-medium text-[#667085] hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Remembered your password? Sign in</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Microcopy & Terms */}
          <p className="text-[12px] sm:text-[12.5px] text-[#667085] text-center mt-7 mb-1">
            By continuing, you agree to Noevis AI’s{' '}
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="underline underline-offset-2 hover:text-[#111827] transition-colors cursor-pointer"
            >
              Terms
            </button>{' '}
            &{' '}
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="underline underline-offset-2 hover:text-[#111827] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </main>

      {/* 3. Footer Spacer */}
      <footer className="w-full pb-6 sm:pb-8 px-5 shrink-0" aria-hidden="true" />

      {/* Legal Terms/Privacy Modal */}
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
                  className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-lg hover:bg-[#1F2937] transition-colors cursor-pointer"
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
