'use client';

import React from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Sparkles,
  MoreHorizontal,
} from 'lucide-react';

interface DeskHeaderProps {
  deskTitle: string;
  onBack: () => void;
  onOpenSearch: () => void;
  onOpenReference: () => void;
  onOpenAskNoevis: () => void;
  onToggleMoreMenu: () => void;
  isMoreMenuOpen?: boolean;
  isReferenceOpen?: boolean;
  isAskNoevisOpen?: boolean;
}

export const DeskHeader: React.FC<DeskHeaderProps> = ({
  deskTitle,
  onBack,
  onOpenSearch,
  onOpenReference,
  onOpenAskNoevis,
  onToggleMoreMenu,
  isMoreMenuOpen = false,
  isReferenceOpen = false,
  isAskNoevisOpen = false,
}) => {
  return (
    <header
      id="desk-top-header"
      className="w-full h-16 sm:h-[68px] bg-[#FFFFFF] border-b border-[#E5E7EB] px-3.5 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 z-30 sticky top-0 transition-colors"
    >
      {/* Left side: Back & Desk Title */}
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1 pr-2">
        <button
          type="button"
          id="desk-header-back-btn"
          onClick={onBack}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827]"
          title="Return to Home (Back)"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="h-5 w-[1px] bg-[#E5E7EB] hidden sm:block shrink-0" />

        {/* Current Desk / Learning Item Title */}
        <div className="min-w-0 flex-1">
          <h1
            id="desk-header-title"
            className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#111827] tracking-tight truncate leading-tight"
            title={deskTitle}
          >
            {deskTitle}
          </h1>
        </div>
      </div>

      {/* Right side: Search, Reference, Ask Noevis, More */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Search trigger */}
        <button
          type="button"
          id="desk-header-search-btn"
          onClick={onOpenSearch}
          className="h-10 px-2.5 sm:px-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] text-[#4B5563] hover:text-[#111827] flex items-center gap-2 text-sm font-medium transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827]"
          title="Search in Desk (⌘K / Ctrl+K)"
          aria-label="Search learning workspace"
        >
          <Search className="w-4.5 h-4.5 text-[#667085] stroke-[1.8]" />
          <span className="hidden md:inline text-[14px]">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#9CA3AF] bg-[#F3F4F6] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
            ⌘K
          </kbd>
        </button>

        {/* Reference trigger */}
        <button
          type="button"
          id="desk-header-reference-btn"
          onClick={onOpenReference}
          className={`h-10 px-2.5 sm:px-3.5 rounded-xl border flex items-center gap-2 text-sm font-medium transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
            isReferenceOpen
              ? 'bg-[#F3F4F6] border-[#D1D5DB] text-[#111827] font-semibold'
              : 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] text-[#4B5563] hover:text-[#111827]'
          }`}
          title="Open Reference & Source Notes"
          aria-label="Toggle reference drawer"
        >
          <BookOpen className="w-4.5 h-4.5 text-[#667085] stroke-[1.8]" />
          <span className="hidden sm:inline text-[14px]">Reference</span>
        </button>

        {/* Ask Noevis trigger */}
        <button
          type="button"
          id="desk-header-ask-noevis-btn"
          onClick={onOpenAskNoevis}
          className={`h-10 px-3 sm:px-4 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
            isAskNoevisOpen
              ? 'bg-[#111827] text-white'
              : 'bg-[#111827] hover:bg-[#1F2937] text-white'
          }`}
          title="Ask Noevis AI"
          aria-label="Open Ask Noevis modal"
        >
          <Sparkles className="w-4.5 h-4.5 text-[#FBBF24] stroke-[2]" />
          <span className="hidden sm:inline text-[14px]">Ask Noevis</span>
        </button>

        {/* More Menu Trigger */}
        <div className="relative">
          <button
            type="button"
            id="desk-header-more-btn"
            onClick={onToggleMoreMenu}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[#4B5563] hover:text-[#111827] transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
              isMoreMenuOpen
                ? 'bg-[#F3F4F6] border-[#D1D5DB] text-[#111827]'
                : 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB]'
            }`}
            title="Desk Options"
            aria-label="Open Desk options menu"
            aria-expanded={isMoreMenuOpen}
          >
            <MoreHorizontal className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </header>
  );
};
