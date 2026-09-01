'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface AskNoevisErrorStateProps {
  onRetry: () => void;
}

export const AskNoevisErrorState: React.FC<AskNoevisErrorStateProps> = ({
  onRetry,
}) => {
  return (
    <div
      id="ask-noevis-error-state"
      className="p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col items-center text-center space-y-3 shadow-2xs"
    >
      <div className="w-10 h-10 rounded-xl bg-white border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-2xs">
        <AlertCircle className="w-5 h-5 stroke-[2]" />
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-[#92400E]">
          Something went wrong
        </h4>
        <p className="text-xs text-[#B45309] max-w-xs leading-relaxed">
          Couldn&apos;t complete reasoning for this prompt. You can retry immediately.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="h-8 px-3 rounded-xl bg-white hover:bg-[#FEF3C7] border border-[#FCD34D] text-xs font-semibold text-[#92400E] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try again</span>
      </button>
    </div>
  );
};
