'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ReferenceErrorStateProps {
  onRetry?: () => void;
}

export const ReferenceErrorState: React.FC<ReferenceErrorStateProps> = ({
  onRetry,
}) => {
  return (
    <div
      id="reference-error-state"
      className="w-full py-10 px-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col items-center justify-center text-center space-y-4 shadow-2xs"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-2xs">
        <AlertCircle className="w-6 h-6 stroke-[2]" />
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h4 className="text-base font-bold text-[#92400E]">
          Reference couldn&apos;t be loaded
        </h4>
        <p className="text-xs sm:text-sm text-[#B45309] leading-relaxed">
          The connection to the source material was interrupted.
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 h-9 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#FEF3C7] border border-[#FCD34D] text-xs font-semibold text-[#92400E] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
};
