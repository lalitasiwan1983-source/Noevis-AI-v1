'use client';

import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  GripVertical,
  CheckCircle2,
  Sparkles,
  Sun,
  BatteryCharging,
  Layers,
} from 'lucide-react';
import { SequenceItem } from './types';

interface PracticeSequenceTaskProps {
  items: SequenceItem[];
  startLabel: string;
  endLabel: string;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean, userOrder: string[]) => void;
  onReset: () => void;
}

export const PracticeSequenceTask: React.FC<PracticeSequenceTaskProps> = ({
  items: initialItems,
  startLabel,
  endLabel,
  isSubmitted,
  onCheckAnswer,
  onReset,
}) => {
  // Scramble initial items so they are not in perfect order initially
  const [currentItems, setCurrentItems] = useState<SequenceItem[]>(() => {
    // Scramble order: [2, 0, 3, 1, 4]
    const shuffled = [...initialItems];
    if (shuffled.length >= 5) {
      return [shuffled[1], shuffled[3], shuffled[0], shuffled[4], shuffled[2]];
    }
    return shuffled.sort(() => Math.random() - 0.5);
  });

  const handleMoveUp = (index: number) => {
    if (index <= 0 || isSubmitted) return;
    const newItems = [...currentItems];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setCurrentItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index >= currentItems.length - 1 || isSubmitted) return;
    const newItems = [...currentItems];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setCurrentItems(newItems);
  };

  const validateSequence = () => {
    // Check if currentItems have correctOrder matching 1, 2, 3, 4, 5
    const isCorrect = currentItems.every((item, idx) => item.correctOrder === idx + 1);
    onCheckAnswer(isCorrect, currentItems.map((item) => item.id));
  };

  const handleResetTask = () => {
    const shuffled = [...initialItems];
    if (shuffled.length >= 5) {
      setCurrentItems([shuffled[1], shuffled[3], shuffled[0], shuffled[4], shuffled[2]]);
    }
    onReset();
  };

  return (
    <div className="w-full space-y-4">
      {/* Starting Endpoint Badge */}
      <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#92400E]">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>START: {startLabel}</span>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider bg-[#FEF3C7] px-2 py-0.5 rounded text-[#B45309]">
          Origin
        </span>
      </div>

      {/* Re-orderable Item List */}
      <div className="space-y-2.5">
        {currentItems.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === currentItems.length - 1;
          const isItemInCorrectPosition = isSubmitted && item.correctOrder === idx + 1;
          const isItemInWrongPosition = isSubmitted && item.correctOrder !== idx + 1;

          let cardStyle =
            'border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] shadow-2xs text-[#111827]';

          if (isSubmitted) {
            if (isItemInCorrectPosition) {
              cardStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]';
            } else if (isItemInWrongPosition) {
              cardStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B]';
            }
          }

          return (
            <div
              key={item.id}
              className={`w-full min-h-[58px] sm:min-h-[64px] p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${cardStyle}`}
            >
              {/* Left Order Number & Text */}
              <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSubmitted && isItemInCorrectPosition
                      ? 'bg-[#16A34A] text-white'
                      : isSubmitted && isItemInWrongPosition
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-[#F3F4F6] text-[#374151]'
                  }`}
                >
                  {idx + 1}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-[14.5px] font-bold text-inherit leading-snug">
                    {item.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#6B7280] line-clamp-1 sm:line-clamp-none mt-0.5">
                    {item.detail}
                  </span>
                </div>
              </div>

              {/* Up / Down Shift Buttons */}
              {!isSubmitted ? (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => handleMoveUp(idx)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center transition-all ${
                      isFirst
                        ? 'border-transparent text-[#D1D5DB] cursor-not-allowed'
                        : 'border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#F3F4F6] hover:text-[#111827] text-[#4B5563] cursor-pointer active:scale-95 shadow-2xs'
                    }`}
                    title="Move stage earlier"
                    aria-label={`Move ${item.label} up`}
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2]" />
                  </button>

                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => handleMoveDown(idx)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center transition-all ${
                      isLast
                        ? 'border-transparent text-[#D1D5DB] cursor-not-allowed'
                        : 'border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#F3F4F6] hover:text-[#111827] text-[#4B5563] cursor-pointer active:scale-95 shadow-2xs'
                    }`}
                    title="Move stage later"
                    aria-label={`Move ${item.label} down`}
                  >
                    <ArrowDown className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              ) : (
                <div className="shrink-0 flex items-center">
                  {isItemInCorrectPosition ? (
                    <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Position {idx + 1} Correct</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#DC2626]">
                      Target: #{item.correctOrder}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Terminal Endpoint Badge */}
      <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#166534]">
        <div className="flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-[#16A34A] shrink-0" />
          <span>DESTINATION: {endLabel}</span>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded text-[#15803D]">
          Yield
        </span>
      </div>

      {/* Action Controls for Submission */}
      {!isSubmitted && (
        <div className="pt-3 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={validateSequence}
            className="min-h-[44px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] active:bg-[#000000] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:translate-x-0.5"
          >
            <span>Check Sequence</span>
            <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
          </button>
        </div>
      )}
    </div>
  );
};
