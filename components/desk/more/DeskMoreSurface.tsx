'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Lightbulb,
  Split,
  Sparkles,
  BookOpen,
  ChevronRight,
  X,
} from 'lucide-react';
import { MoreToolId } from './types';

interface DeskMoreSurfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: MoreToolId) => void;
  onOpenReference?: () => void;
  onOpenAskNoevis?: () => void;
}

export const DeskMoreSurface: React.FC<DeskMoreSurfaceProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onOpenReference,
  onOpenAskNoevis,
}) => {
  const surfaceRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (surfaceRef.current && !surfaceRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const learningTools = [
    {
      id: 'summary' as MoreToolId,
      label: 'Summary',
      description: 'Contextual summary of this chapter & concept',
      icon: FileText,
      badge: 'Contextual',
    },
    {
      id: 'key_ideas' as MoreToolId,
      label: 'Key Ideas',
      description: 'High-yield conceptual anchors & rules',
      icon: Lightbulb,
      badge: 'Core rules',
    },
    {
      id: 'examples' as MoreToolId,
      label: 'Examples',
      description: 'Targeted applications & worked scenarios',
      icon: Split,
      badge: 'Scenarios',
    },
    {
      id: 'study_aid' as MoreToolId,
      label: 'Study Aid',
      description: 'Lightweight memory cues & reinforcement',
      icon: Sparkles,
      badge: 'Calibrated',
    },
  ];

  const deskTools = [
    {
      id: 'reference' as MoreToolId,
      label: 'Source / Reference',
      description: 'Inspect source notes & syllabus text',
      icon: BookOpen,
      action: () => {
        onClose();
        onOpenReference?.();
      },
    },
    {
      id: 'ask_noevis' as MoreToolId,
      label: 'Ask Noevis',
      description: 'Instant AI conceptual clarification',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenAskNoevis?.();
      },
    },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop (visible on mobile / tablet, soft dismiss layer) */}
      <motion.div
        key="desk-more-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 sm:bg-black/10"
        aria-hidden="true"
      />

      {/* Surface: Popover on Desktop (>= 640px) vs Bottom Sheet on Mobile (< 640px) */}
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end sm:justify-start sm:items-start">
        {/* Desktop Container Positioner */}
        <div className="hidden sm:block absolute top-[118px] left-[340px] md:left-[390px] lg:left-[430px] pointer-events-auto">
          <motion.div
            ref={surfaceRef}
            key="desk-more-popover-desktop"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-[340px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] p-2.5 flex flex-col gap-2 text-left"
            role="dialog"
            aria-label="More learning tools"
          >
            {/* Popover Header */}
            <div className="px-3 pt-1.5 pb-1 flex items-center justify-between border-b border-[#F3F4F6]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                More Capabilities
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-md hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#111827] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Group 1: Learning Tools */}
            <div className="space-y-0.5">
              <div className="px-3 pt-1 text-[11px] font-semibold text-[#6B7280]">
                Learning
              </div>
              {learningTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => {
                      onSelectTool(tool.id);
                      onClose();
                    }}
                    className="w-full min-h-[42px] px-3 py-2 rounded-xl hover:bg-[#F9FAFB] active:bg-[#F3F4F6] flex items-center justify-between gap-2.5 transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#FAFAFB] group-hover:bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] group-hover:text-[#111827] shrink-0 transition-colors shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[#111827] leading-tight flex items-center gap-1.5">
                          <span>{tool.label}</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] truncate leading-tight mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#4B5563] shrink-0 transition-colors" />
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#F3F4F6] my-0.5" />

            {/* Group 2: Desk Tools */}
            <div className="space-y-0.5 pb-0.5">
              <div className="px-3 pt-1 text-[11px] font-semibold text-[#6B7280]">
                Desk
              </div>
              {deskTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={tool.action}
                    className="w-full min-h-[42px] px-3 py-2 rounded-xl hover:bg-[#F9FAFB] active:bg-[#F3F4F6] flex items-center justify-between gap-2.5 transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#FAFAFB] group-hover:bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] group-hover:text-[#111827] shrink-0 transition-colors shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#111827] leading-tight">
                          {tool.label}
                        </p>
                        <p className="text-[11px] text-[#6B7280] truncate leading-tight mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#4B5563] shrink-0 transition-colors" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile Bottom Sheet (< 640px) */}
        <div className="sm:hidden w-full pointer-events-auto">
          <motion.div
            ref={surfaceRef}
            key="desk-more-sheet-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-full bg-[#FFFFFF] rounded-t-3xl border-t border-[#E5E7EB] shadow-[0_-12px_32px_rgba(0,0,0,0.12)] p-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto text-left"
            role="dialog"
            aria-label="More learning tools"
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1.5 rounded-full bg-[#E5E7EB] mx-auto mb-2" />

            {/* Header */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-[#F3F4F6]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#111827]">
                  More
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Secondary Desk capabilities
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#111827] cursor-pointer"
                aria-label="Close sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Group: Learning */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] px-1">
                Learning
              </span>
              <div className="space-y-1">
                {learningTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        onSelectTool(tool.id);
                        onClose();
                      }}
                      className="w-full min-h-[50px] p-3 rounded-2xl bg-[#FAFAFB] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] border border-[#E5E7EB] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shrink-0 shadow-2xs">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-[#111827] block leading-tight">
                            {tool.label}
                          </span>
                          <span className="text-xs text-[#6B7280] block truncate mt-0.5">
                            {tool.description}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group: Desk */}
            <div className="space-y-1 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] px-1">
                Desk
              </span>
              <div className="space-y-1">
                {deskTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={tool.action}
                      className="w-full min-h-[50px] p-3 rounded-2xl bg-[#FAFAFB] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] border border-[#E5E7EB] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shrink-0 shadow-2xs">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-[#111827] block leading-tight">
                            {tool.label}
                          </span>
                          <span className="text-xs text-[#6B7280] block truncate mt-0.5">
                            {tool.description}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Close Button for Touch Accessibility */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[46px] rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
