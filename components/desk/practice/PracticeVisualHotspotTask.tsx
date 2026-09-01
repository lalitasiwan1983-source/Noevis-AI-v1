'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  RotateCcw,
  Plus,
  X,
} from 'lucide-react';
import { HotspotTarget, HotspotToken } from './types';

interface PracticeVisualHotspotTaskProps {
  diagramTitle: string;
  diagramSubtitle: string;
  targets: HotspotTarget[];
  tokens: HotspotToken[];
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
  onReset: () => void;
}

export const PracticeVisualHotspotTask: React.FC<PracticeVisualHotspotTaskProps> = ({
  diagramTitle,
  diagramSubtitle,
  targets,
  tokens,
  isSubmitted,
  onCheckAnswer,
  onReset,
}) => {
  // Mapping of targetId -> tokenId placed
  const [placements, setPlacements] = useState<Record<string, string>>({});
  // Currently selected token from pool (for tap-to-place)
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);

  // Available tokens (not yet placed)
  const placedTokenIds = Object.values(placements);
  const unplacedTokens = tokens.filter((t) => !placedTokenIds.includes(t.id));

  const handleSelectToken = (tokenId: string) => {
    if (isSubmitted) return;
    setSelectedTokenId(tokenId === selectedTokenId ? null : tokenId);
  };

  const handlePlaceInSlot = (targetId: string) => {
    if (isSubmitted) return;
    if (selectedTokenId) {
      // Place selected token in slot (remove old one if any)
      setPlacements((prev) => ({
        ...prev,
        [targetId]: selectedTokenId,
      }));
      setSelectedTokenId(null);
    } else if (placements[targetId]) {
      // If no token selected and slot is clicked, clear slot
      const newPlacements = { ...placements };
      delete newPlacements[targetId];
      setPlacements(newPlacements);
    }
  };

  const handleRemoveFromSlot = (targetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubmitted) return;
    const newPlacements = { ...placements };
    delete newPlacements[targetId];
    setPlacements(newPlacements);
  };

  const handleAutoFill = () => {
    // For test or convenience
    const full: Record<string, string> = {};
    targets.forEach((t) => {
      full[t.id] = t.correctTokenId;
    });
    setPlacements(full);
  };

  const validatePlacements = () => {
    const isAllPlaced = targets.every((t) => placements[t.id]);
    if (!isAllPlaced) return;

    const isCorrect = targets.every((t) => placements[t.id] === t.correctTokenId);
    onCheckAnswer(isCorrect);
  };

  const isComplete = targets.every((t) => placements[t.id]);

  return (
    <div className="w-full space-y-6">
      {/* Interactive Token Bank */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#111827]" />
            <span>Chemical Pool (Tap to Select & Place)</span>
          </span>
          <span className="text-xs text-[#6B7280]">
            {unplacedTokens.length} remaining
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {tokens.map((token) => {
            const isPlaced = placedTokenIds.includes(token.id);
            const isSelected = selectedTokenId === token.id;

            return (
              <button
                key={token.id}
                type="button"
                disabled={isPlaced || isSubmitted}
                onClick={() => handleSelectToken(token.id)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                  isPlaced
                    ? 'opacity-30 border-dashed border-[#D1D5DB] bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                    : isSelected
                    ? 'border-[#111827] bg-[#111827] text-white shadow-sm ring-2 ring-[#111827]/20 scale-102'
                    : 'border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#9CA3AF] hover:bg-[#F9FAFB] text-[#111827] shadow-2xs'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{token.label}</span>
                  {token.formula && (
                    <span
                      className={`text-[11px] font-mono ${
                        isSelected ? 'text-white/80' : 'text-[#6B7280]'
                      }`}
                    >
                      {token.formula}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {targets.map((target) => {
          const placedId = placements[target.id];
          const placedToken = tokens.find((t) => t.id === placedId);
          const isSlotCorrect = isSubmitted && placedId === target.correctTokenId;
          const isSlotWrong = isSubmitted && placedId !== target.correctTokenId;

          let slotStyle =
            'border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#9CA3AF] shadow-2xs';

          if (isSubmitted) {
            if (isSlotCorrect) {
              slotStyle = 'border-[#86EFAC] bg-[#F0FDF4] text-[#166534]';
            } else if (isSlotWrong) {
              slotStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B]';
            }
          } else if (selectedTokenId && !placedToken) {
            slotStyle =
              'border-dashed border-[#111827] bg-[#F9FAFB] ring-1 ring-[#111827]/10 animate-pulse';
          }

          return (
            <div
              key={target.id}
              onClick={() => handlePlaceInSlot(target.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[130px] ${slotStyle}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                    {target.stageName}
                  </span>
                  {isSubmitted && (
                    isSlotCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#DC2626]" />
                    )
                  )}
                </div>
                <h4 className="text-xs sm:text-[13.5px] font-semibold text-[#111827] mb-2">
                  {target.slotLabel}
                </h4>
              </div>

              {/* Slot Content */}
              <div className="mt-2 pt-2 border-t border-[#E5E7EB]/60">
                {placedToken ? (
                  <div className="p-2.5 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#111827]">
                        {placedToken.label}
                      </span>
                      {placedToken.formula && (
                        <span className="text-[10px] font-mono text-[#6B7280]">
                          {placedToken.formula}
                        </span>
                      )}
                    </div>

                    {!isSubmitted && (
                      <button
                        type="button"
                        onClick={(e) => handleRemoveFromSlot(target.id, e)}
                        className="w-6 h-6 rounded-lg hover:bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] transition-colors"
                        title="Remove token"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="py-2 text-center text-xs text-[#9CA3AF] border border-dashed border-[#D1D5DB] rounded-xl flex items-center justify-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>{selectedTokenId ? 'Tap to place selected item' : 'Empty slot'}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Validate Button */}
      {!isSubmitted && (
        <div className="pt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-[#6B7280]">
            {isComplete
              ? 'All 4 stages assigned. Ready to verify.'
              : 'Select and place all chemical tokens to verify.'}
          </p>

          <button
            type="button"
            disabled={!isComplete}
            onClick={validatePlacements}
            className={`min-h-[44px] px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              isComplete
                ? 'bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer shadow-sm hover:translate-x-0.5'
                : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <span>Verify Assembly</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
