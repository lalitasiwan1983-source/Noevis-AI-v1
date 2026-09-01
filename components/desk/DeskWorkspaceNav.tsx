'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  HelpCircle,
  RotateCcw,
  FileEdit,
  MoreHorizontal,
  Layers,
  Compass,
  Check,
} from 'lucide-react';
import { DeskWorkspaceMode } from './types';

interface DeskWorkspaceNavProps {
  activeMode: DeskWorkspaceMode;
  onChangeMode: (mode: DeskWorkspaceMode) => void;
  onOpenMore?: () => void;
  isMoreOpen?: boolean;
}

interface NavItem {
  id: DeskWorkspaceMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const DeskWorkspaceNav: React.FC<DeskWorkspaceNavProps> = ({
  activeMode,
  onChangeMode,
  onOpenMore,
  isMoreOpen = false,
}) => {
  const mainModes: NavItem[] = [
    {
      id: 'learn',
      label: 'Learn',
      icon: GraduationCap,
      description: 'Structured, step-by-step concept explanations',
    },
    {
      id: 'practice',
      label: 'Practice',
      icon: Sparkles,
      description: 'Interactive problem-solving & application exercises',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: HelpCircle,
      description: 'Adaptive diagnostic check & concept mastery test',
    },
    {
      id: 'review',
      label: 'Review',
      icon: RotateCcw,
      description: 'Key takeaways, summary diagrams & flashcards',
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileEdit,
      description: 'Personal annotations, bookmarks & scratchpad',
    },
  ];

  return (
    <div
      id="desk-workspace-navigation-bar"
      className="w-full bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-2 shrink-0 overflow-x-auto no-scrollbar select-none"
    >
      <nav
        aria-label="Desk Workspace Modes"
        className="flex items-center gap-1.5 sm:gap-2 min-w-max"
      >
        {mainModes.map((item) => {
          const Icon = item.icon;
          const isActive = activeMode === item.id;

          return (
            <button
              key={item.id}
              id={`desk-nav-${item.id}`}
              type="button"
              onClick={() => onChangeMode(item.id)}
              className={`h-[42px] px-3.5 sm:px-4.5 rounded-xl flex items-center gap-2.5 text-[14px] sm:text-[14.5px] font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
                isActive
                  ? 'bg-[#F3F4F6] text-[#111827] shadow-2xs border border-[#E5E7EB]'
                  : 'text-[#667085] hover:text-[#111827] hover:bg-[#F9FAFB] border border-transparent'
              }`}
              title={item.description}
            >
              <Icon
                className={`w-4.5 h-4.5 shrink-0 ${
                  isActive ? 'text-[#111827] stroke-[2.2]' : 'text-[#667085] stroke-[1.8]'
                }`}
              />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        {/* More Workspace Mode Trigger */}
        <button
          type="button"
          id="desk-nav-more"
          onClick={() => onOpenMore?.()}
          className={`h-[42px] px-3 sm:px-4 rounded-xl flex items-center gap-2 text-[14px] sm:text-[14.5px] font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] ${
            activeMode === 'more' || isMoreOpen
              ? 'bg-[#F3F4F6] text-[#111827] shadow-2xs border border-[#E5E7EB]'
              : 'text-[#667085] hover:text-[#111827] hover:bg-[#F9FAFB] border border-transparent'
          }`}
          title="More learning tools"
          aria-expanded={isMoreOpen}
        >
          <MoreHorizontal className="w-4.5 h-4.5 text-[#667085] stroke-[1.8]" />
          <span className="whitespace-nowrap">More</span>
        </button>
      </nav>
    </div>
  );
};

