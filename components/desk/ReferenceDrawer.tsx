'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  FileText,
  ExternalLink,
  Search,
  CheckCircle2,
  Bookmark,
  Layers,
} from 'lucide-react';
import { DeskContextData } from './types';

interface ReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: DeskContextData;
}

export const ReferenceDrawer: React.FC<ReferenceDrawerProps> = ({
  isOpen,
  onClose,
  contextData,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backgroundColor: 'rgba(17, 24, 39, 0.3)' }}
        className="fixed inset-0 backdrop-blur-[4px] z-50 transition-opacity"
      />

      {/* Drawer Container: Side panel on desktop/tablet, Bottom sheet on mobile */}
      <motion.div
        initial={{ x: '100%', y: 0 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: '100%', y: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] md:w-[480px] bg-[#FFFFFF] border-l border-[#E5E7EB] shadow-2xl flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between shrink-0 bg-[#FFFFFF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827]">
              <BookOpen className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#111827] leading-tight">
                Reference Inspector
              </h2>
              <p className="text-[12.5px] text-[#667085] mt-0.5">
                Primary source notes & verified definitions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            title="Close Reference Panel"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Source Document Card */}
          <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#111827]" />
                <span>Active Source</span>
              </span>
              <span className="text-[11px] font-medium text-[#166534] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                Verified
              </span>
            </div>
            <p className="text-[15px] font-semibold text-[#111827]">
              {contextData.sourceName || 'NCERT Class 10 Biology — Chapter 6'}
            </p>
            <p className="text-[13px] text-[#667085] leading-relaxed">
              Source file ingested into this Desk. Includes full curriculum chapters and diagrams.
            </p>
          </div>

          {/* Key Excerpt / Text Extraction Preview */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider text-xs">
              Direct Source Excerpt
            </h3>
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] border-l-4 border-l-[#111827] text-[13.5px] text-[#374151] leading-relaxed italic">
              &ldquo;Photosynthesis is an endothermic photochemical reaction where chlorophyll pigments absorb solar radiation to split water molecules and reduce carbon dioxide into glucose.&rdquo;
            </div>
          </div>

          {/* Fundamental Definitions */}
          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-[#111827] uppercase tracking-wider text-xs">
              Key Definitions & Glossary
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                <p className="text-[13.5px] font-bold text-[#111827]">Thylakoid Membrane</p>
                <p className="text-[12.5px] text-[#667085] mt-0.5">
                  Internal membrane-bound compartment where light-dependent reactions take place.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                <p className="text-[13.5px] font-bold text-[#111827]">Photolysis</p>
                <p className="text-[12.5px] text-[#667085] mt-0.5">
                  The light-catalyzed breakdown of H₂O molecules generating O₂, electrons, and H⁺ protons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFAFB] flex items-center justify-between text-xs text-[#667085]">
          <span>Phase 1 Desk Reference Shell</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#111827] text-white text-xs font-semibold hover:bg-[#1F2937] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
