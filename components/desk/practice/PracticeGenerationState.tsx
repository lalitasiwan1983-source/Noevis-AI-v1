'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface PracticeGenerationStateProps {
  onComplete: () => void;
  conceptTitle?: string;
}

export const PracticeGenerationState: React.FC<PracticeGenerationStateProps> = ({
  onComplete,
  conceptTitle,
}) => {
  useEffect(() => {
    // Standard 3-second simulation of practice set generation
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[40px] pb-[56px] px-6 sm:px-8 font-sans flex flex-col space-y-8"
    >
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-[30px] sm:text-[32px] font-bold text-[#111827] tracking-tight leading-tight">
          Practice
        </h1>
        <p className="text-[16px] sm:text-[17px] text-[#667085] font-normal leading-relaxed">
          Creating your practice…
        </p>
      </div>

      {/* Main Generation Card */}
      <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-8 sm:p-10 flex flex-col items-center text-center space-y-6 shadow-2xs">
        {/* Animated Loading Icon */}
        <div className="relative w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4B5BEA] text-white flex items-center justify-center">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h2 className="text-[18px] sm:text-[19px] font-semibold text-[#111827] tracking-tight">
            Preparing useful practice from your learning material
          </h2>
          {conceptTitle && (
            <p className="text-[14px] text-[#667085] leading-relaxed">
              Target concept: <span className="font-medium text-[#111827]">{conceptTitle}</span>
            </p>
          )}
        </div>

        {/* Animated Progress Pulse */}
        <div className="w-full max-w-xs h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut',
            }}
            className="w-1/2 h-full bg-[#16A34A] rounded-full"
          />
        </div>

        {/* Instant Skip Button for Dev / Quick Testing */}
        <button
          type="button"
          onClick={onComplete}
          className="text-[13px] text-[#667085] hover:text-[#111827] font-medium transition-colors pt-2 cursor-pointer underline"
        >
          Skip animation
        </button>
      </div>
    </motion.div>
  );
};
