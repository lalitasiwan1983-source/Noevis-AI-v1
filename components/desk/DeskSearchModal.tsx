'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  FileText,
  ChevronRight,
} from 'lucide-react';

interface DeskSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (conceptName: string) => void;
}

export const DeskSearchModal: React.FC<DeskSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockIndexItems = [
    {
      title: 'Light-Dependent Reactions & Photophosphorylation',
      section: 'Chapter 6: Life Processes',
      type: 'Concept',
      icon: GraduationCap,
    },
    {
      title: 'Calvin Cycle & Carbon Fixation in Stroma',
      section: 'Chapter 6: Life Processes',
      type: 'Concept',
      icon: GraduationCap,
    },
    {
      title: 'Cellular Respiration & Glycolysis',
      section: 'Chapter 6: Life Processes',
      type: 'Concept',
      icon: GraduationCap,
    },
    {
      title: 'ATP Synthase Molecular Motor Mechanics',
      section: 'Review Notes & Diagrams',
      type: 'Reference',
      icon: BookOpen,
    },
  ];

  const filteredItems = mockIndexItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backgroundColor: 'rgba(17, 24, 39, 0.4)' }}
        className="fixed inset-0 backdrop-blur-[6px] z-50 transition-opacity"
      />

      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 26, stiffness: 340 }}
          className="pointer-events-auto w-full max-w-xl bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3 bg-[#FFFFFF]">
            <Search className="w-5 h-5 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search concepts, chapters, or notes in this Desk..."
              className="flex-1 text-[15px] sm:text-[16px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#667085] hover:text-[#111827] px-2 py-1 bg-[#F3F4F6] rounded-md"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Search Results List */}
          <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
              {filteredItems.length > 0 ? 'Matching Concepts' : 'No results found'}
            </div>

            {filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectConcept(item.title);
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl hover:bg-[#F3F4F6] flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#FAFAFB] group-hover:bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#667085] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#111827] truncate">
                        {item.title}
                      </p>
                      <p className="text-[12px] text-[#667085] truncate">
                        {item.section}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="p-3 border-t border-[#E5E7EB] bg-[#FAFAFB] flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Navigate with keyboard</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
