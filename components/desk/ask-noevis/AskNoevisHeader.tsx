'use client';

import React from 'react';
import { Sparkles, X, ChevronRight, Layers } from 'lucide-react';
import { AskNoevisContext, AskNoevisStatus } from './types';

interface AskNoevisHeaderProps {
  context: AskNoevisContext;
  status: AskNoevisStatus;
  onStatusChange: (status: AskNoevisStatus) => void;
  onClose: () => void;
}

export const AskNoevisHeader: React.FC<AskNoevisHeaderProps> = ({
  context,
  status,
  onStatusChange,
  onClose,
}) => {
  return (
    <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#FFFFFF] shrink-0 space-y-3">
      {/* Top row: Brand + Assistant icon + Close */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#111827] text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-4.5 h-4.5 text-[#F59E0B] stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#111827] leading-tight">
                Ask Noevis
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-[10.5px] font-semibold text-[#4B5563] uppercase tracking-wide">
                Desk Assistant
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Reasoning grounded in your active Desk context
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          title="Close Ask Noevis"
          aria-label="Close Ask Noevis"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Context Strip: Topic › Chapter › Concept */}
      <div className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-[#FAFAFB] px-3 py-1.5 rounded-xl border border-[#E5E7EB] flex-wrap">
        <span className="font-semibold text-[#111827] truncate max-w-[110px]">
          {context.topic}
        </span>
        <ChevronRight className="w-3 h-3 text-[#9CA3AF] shrink-0" />
        <span className="text-[#4B5563] truncate max-w-[120px]">
          {context.chapter}
        </span>
        <ChevronRight className="w-3 h-3 text-[#9CA3AF] shrink-0" />
        <span className="text-[#4F46E5] font-semibold truncate max-w-[140px]">
          {context.currentConcept}
        </span>
        {context.activeMode && (
          <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium text-[#6B7280] bg-white px-2 py-0.5 rounded-md border border-[#E5E7EB]">
            <Layers className="w-3 h-3 text-[#9CA3AF]" />
            <span className="capitalize">{context.activeMode} Mode</span>
          </span>
        )}
      </div>

      {/* State Inspector Chips (For previewing Empty, Thinking, Response, Error) */}
      <div className="flex items-center justify-between gap-1 pt-0.5">
        <span className="text-[11px] font-medium text-[#9CA3AF]">
          State Simulator:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onStatusChange('empty')}
            className={`h-6 px-2 rounded-md text-[10.5px] font-semibold transition-colors cursor-pointer ${
              status === 'empty'
                ? 'bg-[#111827] text-white'
                : 'bg-[#FAFAFB] text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
            }`}
          >
            Empty
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('thinking')}
            className={`h-6 px-2 rounded-md text-[10.5px] font-semibold transition-colors cursor-pointer ${
              status === 'thinking'
                ? 'bg-[#111827] text-white'
                : 'bg-[#FAFAFB] text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
            }`}
          >
            Thinking
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('response')}
            className={`h-6 px-2 rounded-md text-[10.5px] font-semibold transition-colors cursor-pointer ${
              status === 'response'
                ? 'bg-[#111827] text-white'
                : 'bg-[#FAFAFB] text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
            }`}
          >
            Response
          </button>
          <button
            type="button"
            onClick={() => onStatusChange('error')}
            className={`h-6 px-2 rounded-md text-[10.5px] font-semibold transition-colors cursor-pointer ${
              status === 'error'
                ? 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]'
                : 'bg-[#FAFAFB] text-[#6B7280] hover:text-[#DC2626] border border-[#E5E7EB]'
            }`}
          >
            Error
          </button>
        </div>
      </div>
    </div>
  );
};
