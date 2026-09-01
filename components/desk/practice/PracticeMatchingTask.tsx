'use client';

import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { MatchingPair } from './types';

interface PracticeMatchingTaskProps {
  leftTitle: string;
  rightTitle: string;
  pairs: MatchingPair[];
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
  onReset: () => void;
}

export const PracticeMatchingTask: React.FC<PracticeMatchingTaskProps> = ({
  leftTitle,
  rightTitle,
  pairs,
  isSubmitted,
  onCheckAnswer,
  onReset,
}) => {
  // Scramble the right targets
  const [shuffledTargets] = useState(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  });

  // Selected left item
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  // Match mapping: leftId -> targetPairId (which matches pair.id)
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleSelectLeft = (id: string) => {
    if (isSubmitted) return;
    setSelectedLeftId(id === selectedLeftId ? null : id);
  };

  const handleSelectRight = (targetPairId: string) => {
    if (isSubmitted) return;
    if (selectedLeftId) {
      setMatches((prev) => {
        const next = { ...prev };
        // If this right target was already matched with another left item, unbind it
        Object.keys(next).forEach((key) => {
          if (next[key] === targetPairId) {
            delete next[key];
          }
        });
        next[selectedLeftId] = targetPairId;
        return next;
      });
      setSelectedLeftId(null);
    }
  };

  const handleClearMatch = (leftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubmitted) return;
    setMatches((prev) => {
      const next = { ...prev };
      delete next[leftId];
      return next;
    });
  };

  const isComplete = pairs.every((p) => matches[p.id]);

  const validateMatching = () => {
    if (!isComplete) return;
    // Each left item p.id should match matches[p.id] === p.id
    const isCorrect = pairs.every((p) => matches[p.id] === p.id);
    onCheckAnswer(isCorrect);
  };

  return (
    <div className="w-full space-y-6">
      <div className="p-3 sm:p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] text-xs text-[#6B7280]">
        <span>Tap an item in <strong>{leftTitle}</strong>, then tap its matching role in <strong>{rightTitle}</strong>.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: Components */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] px-1">
            {leftTitle}
          </h4>

          {pairs.map((pair, idx) => {
            const isSelected = selectedLeftId === pair.id;
            const matchedTargetId = matches[pair.id];
            const matchedTarget = pairs.find((p) => p.id === matchedTargetId);
            const isPairCorrect = isSubmitted && matchedTargetId === pair.id;
            const isPairWrong = isSubmitted && matchedTargetId !== pair.id;

            let cardStyle =
              'border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#9CA3AF] text-[#111827] shadow-2xs';

            if (isSubmitted) {
              if (isPairCorrect) {
                cardStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]';
              } else if (isPairWrong) {
                cardStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B]';
              }
            } else if (isSelected) {
              cardStyle = 'border-[#111827] bg-[#F9FAFB] ring-2 ring-[#111827]/15 shadow-xs';
            }

            return (
              <div
                key={pair.id}
                onClick={() => handleSelectLeft(pair.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[88px] ${cardStyle}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#F3F4F6] text-[#111827] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-[14px] font-bold">
                      {pair.source}
                    </span>
                  </div>

                  {isSubmitted && (
                    isPairCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#DC2626]" />
                    )
                  )}
                </div>

                {/* Connected status badge */}
                {matchedTarget && (
                  <div className="mt-2 pt-2 border-t border-[#E5E7EB]/60 flex items-center justify-between text-[11px]">
                    <span className="text-[#6B7280] truncate max-w-[200px]">
                      ↳ Connected to: {matchedTarget.target.slice(0, 32)}...
                    </span>
                    {!isSubmitted && (
                      <button
                        type="button"
                        onClick={(e) => handleClearMatch(pair.id, e)}
                        className="text-[#9CA3AF] hover:text-[#DC2626] text-[10px] font-semibold"
                      >
                        Unlink
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Roles */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] px-1">
            {rightTitle}
          </h4>

          {shuffledTargets.map((target) => {
            const isAssigned = Object.values(matches).includes(target.id);
            const assignedLeftId = Object.keys(matches).find(
              (leftKey) => matches[leftKey] === target.id
            );
            const assignedLeftIndex = assignedLeftId
              ? pairs.findIndex((p) => p.id === assignedLeftId) + 1
              : null;

            return (
              <div
                key={target.id}
                onClick={() => handleSelectRight(target.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[88px] ${
                  isAssigned
                    ? 'border-[#D1D5DB] bg-[#F9FAFB] text-[#374151]'
                    : selectedLeftId
                    ? 'border-dashed border-[#111827] bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#111827] animate-pulse'
                    : 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFB] text-[#374151]'
                }`}
              >
                <p className="text-xs sm:text-[13.5px] leading-relaxed">
                  {target.target}
                </p>

                {assignedLeftIndex && (
                  <div className="mt-2 pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#111827]">
                    <span className="w-4 h-4 rounded bg-[#111827] text-white text-[10px] flex items-center justify-center">
                      {assignedLeftIndex}
                    </span>
                    <span>Matched with Item #{assignedLeftIndex}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification button */}
      {!isSubmitted && (
        <div className="pt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-[#6B7280]">
            {isComplete
              ? 'All pairs connected. Ready to verify.'
              : 'Connect all 4 pairs to verify.'}
          </p>

          <button
            type="button"
            disabled={!isComplete}
            onClick={validateMatching}
            className={`min-h-[44px] px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              isComplete
                ? 'bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer shadow-sm hover:translate-x-0.5'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <span>Verify Matches</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
