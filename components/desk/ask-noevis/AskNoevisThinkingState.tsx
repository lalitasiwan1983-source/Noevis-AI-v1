'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const AskNoevisThinkingState: React.FC = () => {
  return (
    <div
      id="ask-noevis-thinking"
      className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-start gap-3 shadow-2xs"
      aria-live="polite"
      aria-label="Noevis is reasoning"
    >
      <div className="w-8 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
        <Sparkles className="w-4 h-4 text-[#F59E0B] animate-pulse" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#111827]">
            Noevis is reasoning
          </span>
          <div className="flex items-center gap-1">
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[#6B7280]"
            />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#6B7280]"
            />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-[#6B7280]"
            />
          </div>
        </div>

        <p className="text-xs text-[#6B7280] leading-relaxed">
          Grounding answer in active curriculum notes, formulas, and diagrams…
        </p>

        {/* Shimmer skeleton lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-4/5 bg-[#E5E7EB] rounded animate-pulse" />
          <div className="h-3 w-3/5 bg-[#E5E7EB] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
