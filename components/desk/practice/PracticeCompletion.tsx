'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Plus, Sparkles } from 'lucide-react';

interface PracticeCompletionProps {
  score: number;
  total: number;
  handledWell: string[];
  needsMorePractice: string[];
  onPracticeAgain: () => void;
  onGenerateNew: () => void;
}

export const PracticeCompletion: React.FC<PracticeCompletionProps> = ({
  score,
  total,
  handledWell,
  needsMorePractice,
  onPracticeAgain,
  onGenerateNew,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[36px] pb-[56px] px-6 sm:px-8 font-sans flex flex-col space-y-7"
    >
      {/* Title & Score Card */}
      <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-8 sm:p-9 space-y-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[14px] bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <h1 className="text-[26px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
              Practice complete
            </h1>
            <p className="text-[15px] text-[#667085]">
              Score: <strong className="font-semibold text-[#4B5BEA] text-[17px]">{score} / {total}</strong> tasks completed accurately
            </p>
          </div>
        </div>

        {/* Feedback Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F3F4F6]">
          {/* Handled Well */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-[12px] p-4 space-y-2">
            <span className="text-[12.5px] font-semibold text-[#16A34A] uppercase tracking-wider block">
              Handled Well
            </span>
            <ul className="space-y-1.5 text-[14px] text-[#374151]">
              {handledWell.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Needs More Practice */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-[12px] p-4 space-y-2">
            <span className="text-[12.5px] font-semibold text-[#D97706] uppercase tracking-wider block">
              Needs More Practice
            </span>
            <ul className="space-y-1.5 text-[14px] text-[#374151]">
              {needsMorePractice.length > 0 ? (
                needsMorePractice.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-[13.5px] text-[#667085] italic">None — excellent work!</li>
              )}
            </ul>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPracticeAgain}
            className="h-[46px] px-6 bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F4F4F5] text-[#374151] rounded-[12px] font-semibold text-[14.5px] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-[18px] h-[18px] text-[#6B7280]" />
            <span>Practice Again</span>
          </button>

          <button
            type="button"
            onClick={onGenerateNew}
            className="h-[46px] px-6 bg-[#4B5BEA] hover:bg-[#3B4BD8] text-white rounded-[12px] font-semibold text-[14.5px] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-[18px] h-[18px]" />
            <span>Generate New</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
