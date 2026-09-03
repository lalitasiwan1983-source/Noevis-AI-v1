'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface PracticeErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export const PracticeErrorState: React.FC<PracticeErrorStateProps> = ({
  onRetry,
  message = "Practice couldn't be created from the current material.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[60px] pb-[56px] px-6 text-center font-sans flex flex-col items-center justify-center space-y-5"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#EF4444] flex items-center justify-center shadow-2xs">
        <AlertCircle className="w-7 h-7 stroke-[2]" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-[20px] font-bold text-[#111827] tracking-tight">
          Practice couldn&apos;t be created
        </h2>
        <p className="text-[14.5px] text-[#667085] leading-relaxed">
          {message} Please ensure your learning source is active and try again.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="h-[44px] px-5 bg-[#4B5BEA] hover:bg-[#3B4BD8] text-white rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </motion.div>
  );
};
