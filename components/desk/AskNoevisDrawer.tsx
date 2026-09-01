'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  ArrowUp,
  Lightbulb,
  HelpCircle,
  FileQuestion,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { DeskContextData } from './types';

interface AskNoevisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: DeskContextData;
}

export const AskNoevisDrawer: React.FC<AskNoevisDrawerProps> = ({
  isOpen,
  onClose,
  contextData,
}) => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: 'Explain with an intuitive analogy', icon: Lightbulb },
    { label: 'What is the most common exam trap here?', icon: HelpCircle },
    { label: 'Summarize into 3 key takeaways', icon: Zap },
    { label: 'Give a real-world applied scenario', icon: FileQuestion },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setSubmittedQuery(text);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backgroundColor: 'rgba(17, 24, 39, 0.35)' }}
        className="fixed inset-0 backdrop-blur-[6px] z-50 transition-opacity"
      />

      {/* Assistant Modal / Bottom Sheet */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="pointer-events-auto w-full max-w-2xl bg-[#FFFFFF] rounded-t-[24px] sm:rounded-[24px] border border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5E7EB] flex items-center justify-between shrink-0 bg-[#FFFFFF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-[#FBBF24] stroke-[2]" />
              </div>
              <div>
                <h2 className="text-[17px] font-bold text-[#111827] leading-tight">
                  Ask Noevis
                </h2>
                <p className="text-[12.5px] text-[#667085] mt-0.5">
                  Contextual reasoning for <span className="font-semibold text-[#111827]">{contextData.currentConcept}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              title="Close Assistant"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Assistant Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {submittedQuery ? (
              <div className="space-y-4">
                {/* User Prompt Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#111827] text-white rounded-2xl rounded-tr-xs px-4 py-3 text-[14px]">
                    {submittedQuery}
                  </div>
                </div>

                {/* Assistant Placeholder Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                  </div>
                  <div className="flex-1 bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl rounded-tl-xs p-4 text-[14px] text-[#374151] space-y-2 leading-relaxed">
                    <p className="font-semibold text-[#111827]">
                      Phase 1 Desk Assistant Preview:
                    </p>
                    <p>
                      In later phases, Noevis AI will synthesize answers strictly grounded in your active Desk sources ({contextData.topic} › {contextData.chapter}), offering visual analogies, formula derivations, and step-by-step guidance.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedQuery(null)}
                      className="mt-2 text-xs font-semibold text-[#111827] underline cursor-pointer"
                    >
                      Ask another prompt
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] text-center space-y-1.5">
                  <p className="text-[15px] font-bold text-[#111827]">
                    How can I help you understand this concept?
                  </p>
                  <p className="text-[13px] text-[#667085]">
                    Select a quick prompt or type your question below.
                  </p>
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2">
                  <div className="text-[11.5px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                    Suggested Inquiries
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickPrompts.map((prompt, index) => {
                      const Icon = prompt.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSend(prompt.label)}
                          className="p-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-left text-[13px] font-medium text-[#374151] hover:text-[#111827] flex items-center gap-2.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Icon className="w-4 h-4 text-[#667085] shrink-0" />
                          <span className="truncate">{prompt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Composer Input Area */}
          <div className="p-4 border-t border-[#E5E7EB] bg-[#FFFFFF] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(query);
                setQuery('');
              }}
              className="flex items-center gap-2 bg-[#FAFAFB] border border-[#E5E7EB] focus-within:border-[#111827] focus-within:bg-[#FFFFFF] rounded-2xl p-2 transition-all"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about this concept, formulas, or steps..."
                className="flex-1 bg-transparent px-3 py-1 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  query.trim()
                    ? 'bg-[#111827] text-white hover:bg-[#1F2937] cursor-pointer'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
