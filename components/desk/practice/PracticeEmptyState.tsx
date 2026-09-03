'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface PracticeEmptyStateProps {
  onSwitchToLearn?: () => void;
}

export const PracticeEmptyState: React.FC<PracticeEmptyStateProps> = ({ onSwitchToLearn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[60px] pb-[56px] px-6 text-center font-sans flex flex-col items-center justify-center space-y-5"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
        <BookOpen className="w-7 h-7 stroke-[2]" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-[20px] font-bold text-[#111827] tracking-tight">
          Practice needs learning material
        </h2>
        <p className="text-[14.5px] text-[#667085] leading-relaxed">
          Open or select a learning context in Learn mode to generate tailored practice tasks.
        </p>
      </div>

      {onSwitchToLearn && (
        <button
          type="button"
          onClick={onSwitchToLearn}
          className="h-[44px] px-5 bg-[#111827] hover:bg-[#1F2937] text-white rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <span>Go to Learn Workspace</span>
        </button>
      )}
    </motion.div>
  );
};
