'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Diamond,
  BookOpen,
  FolderKanban,
  Compass,
  ArrowRight,
  MoreHorizontal,
  Trash2,
  Edit2,
  Check,
  X,
} from 'lucide-react';

export interface DeskItem {
  id: string;
  title: string;
  sourceType: string;
  sourceName?: string;
  updatedAt: string;
  itemCount?: number;
  lastStudied?: string;
  elementsCount?: {
    explanations: number;
    questions: number;
    visuals: number;
  };
}

interface MyDesksScreenProps {
  desks: DeskItem[];
  onCreateDesk: () => void;
  onOpenDesk: (sourceType?: string, deskId?: string) => void;
  onDeleteDesk?: (deskId: string) => void;
  onRenameDesk?: (deskId: string, newTitle: string) => void;
}

// Subtle "..." Action Popover for Desk cards
const DeskMenuPopover: React.FC<{
  desk: DeskItem;
  onDelete?: (id: string) => void;
  onRename?: (id: string, newTitle: string) => void;
}> = ({ desk, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isRenaming, setIsRenaming] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(desk.title);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsRenaming(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSaveRename = () => {
    if (renameValue.trim() && onRename) {
      onRename(desk.id, renameValue.trim());
      setIsRenaming(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative shrink-0 flex items-center" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
        title="Desk actions"
        aria-label="Desk actions"
      >
        <MoreHorizontal className="w-4 h-4 stroke-[1.8]" />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-9 w-[180px] bg-white border border-[#E5E7EB] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-1.5 z-50 flex flex-col gap-1 text-left"
        >
          {isRenaming ? (
            <div className="p-1 flex flex-col gap-1.5">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename();
                  if (e.key === 'Escape') {
                    setIsRenaming(false);
                    setIsOpen(false);
                  }
                }}
                className="w-full text-xs border border-[#E5E7EB] focus:border-[#111111] rounded-md px-2 py-1 text-[#111111] outline-none"
                autoFocus
              />
              <div className="flex items-center gap-1 justify-end">
                <button
                  type="button"
                  onClick={() => setIsRenaming(false)}
                  className="p-1 hover:bg-[#F3F4F6] rounded text-[#6B7280]"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleSaveRename}
                  className="px-2 py-1 bg-[#111111] text-white text-[11px] font-semibold rounded hover:bg-[#222222] flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              {onRename && (
                <button
                  type="button"
                  onClick={() => setIsRenaming(true)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#374151] hover:bg-[#F7F8FA] hover:text-[#111111] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Rename Desk</span>
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(desk.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Desk</span>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const MyDesksScreen: React.FC<MyDesksScreenProps> = ({
  desks,
  onCreateDesk,
  onOpenDesk,
  onDeleteDesk,
  onRenameDesk,
}) => {
  const transitionConfig = {
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  const hasDesks = desks && desks.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitionConfig}
      className="w-full max-w-[880px] flex flex-col text-left"
    >
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between gap-3 pb-3 sm:pb-5 border-b border-[#E5E7EB] mb-4 sm:mb-7">
        <div>
          <h1 className="text-[20px] sm:text-[26px] font-bold text-[#111111] tracking-[-0.03em] leading-tight">
            MY DESKS
          </h1>
          <p className="text-[12.5px] sm:text-[14.5px] font-normal text-[#6B7280] tracking-[-0.01em] mt-0.5 sm:mt-1">
            Your learning spaces, all in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateDesk}
          className="h-8 sm:h-9.5 px-3 sm:px-3.5 rounded-[10px] sm:rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FB] text-xs sm:text-[13px] font-semibold text-[#111111] flex items-center gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span>New Desk</span>
        </button>
      </div>

      {/* 2. NEW USER / EMPTY STATE */}
      {!hasDesks ? (
        <div className="w-full flex flex-col items-center">
          {/* Centered Premium Empty-State Card */}
          <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] sm:rounded-[24px] p-5 sm:p-8 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
            {/* Minimal Desk/Space Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] flex items-center justify-center mb-3 sm:mb-4">
              <Diamond className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-[18px] sm:text-[22px] font-bold text-[#111111] tracking-[-0.025em] mb-1.5 sm:mb-2">
              No Desks yet
            </h2>
            <p className="text-[13px] sm:text-[14.5px] text-[#6B7280] max-w-[420px] leading-[1.4] tracking-[-0.01em] mb-4 sm:mb-6">
              Create your first Desk and keep your learning in one focused space.
            </p>

            {/* Primary CTA (Single Plus Icon, Clean Single Label) */}
            <button
              type="button"
              onClick={onCreateDesk}
              className="h-10 sm:h-11 px-5 sm:px-6 rounded-[12px] sm:rounded-[14px] bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-[13.5px] font-bold tracking-tight flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-all cursor-pointer mb-5 sm:mb-7"
            >
              <Plus className="w-4 h-4 stroke-[2.4]" />
              <span>Create your first Desk</span>
            </button>

            {/* Compact 3-part benefits: Learn, Organize, Focus */}
            <div className="w-full pt-4 sm:pt-6 border-t border-[#F1F3F5] grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 text-left">
              {/* Item 1: Learn */}
              <div className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#FAFAFC] border border-[#EEEEF2] flex items-center sm:items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white border border-[#E5E7EB] text-[#111111] flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] tracking-tight">
                    Learn
                  </h4>
                  <p className="text-[11.5px] sm:text-[12px] text-[#6B7280] leading-snug">
                    Keep a topic together
                  </p>
                </div>
              </div>

              {/* Item 2: Organize */}
              <div className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#FAFAFC] border border-[#EEEEF2] flex items-center sm:items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white border border-[#E5E7EB] text-[#111111] flex items-center justify-center shrink-0">
                  <FolderKanban className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] tracking-tight">
                    Organize
                  </h4>
                  <p className="text-[11.5px] sm:text-[12px] text-[#6B7280] leading-snug">
                    Keep your materials in one place
                  </p>
                </div>
              </div>

              {/* Item 3: Focus */}
              <div className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#FAFAFC] border border-[#EEEEF2] flex items-center sm:items-start gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-white border border-[#E5E7EB] text-[#111111] flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] tracking-tight">
                    Focus
                  </h4>
                  <p className="text-[11.5px] sm:text-[12px] text-[#6B7280] leading-snug">
                    Return to where you left off
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3. DESK LIST STATE (Grid: 2-3 on desktop, 2 on medium, 1 on mobile) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Quick Create Card */}
          <div
            onClick={onCreateDesk}
            className="p-5 min-h-[160px] rounded-[20px] bg-[#FFFFFF] border border-dashed border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9F9] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group select-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] group-hover:border-[#111111] flex items-center justify-center mb-2.5 transition-colors">
              <Plus className="w-4 h-4 text-[#6B7280] group-hover:text-[#111111] stroke-[2.2] transition-colors" />
            </div>
            <h4 className="text-[14.5px] font-bold text-[#111111] mb-0.5">New Desk</h4>
            <p className="text-[12px] text-[#6B7280]">Add another learning space</p>
          </div>

          {/* List of Desks */}
          {desks.map((desk) => {
            const metaInfo = desk.lastStudied
              ? `${desk.itemCount ? `${desk.itemCount} items · ` : ''}Last studied ${desk.lastStudied}`
              : desk.elementsCount
              ? `${desk.elementsCount.explanations} Explanations · ${desk.elementsCount.questions} Questions`
              : desk.sourceName || `${desk.sourceType.toUpperCase()} Source`;

            return (
              <div
                key={desk.id}
                onClick={() => onOpenDesk(desk.sourceType, desk.id)}
                className="group p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col justify-between select-none"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                      {desk.sourceType}
                    </span>
                    <DeskMenuPopover
                      desk={desk}
                      onDelete={onDeleteDesk}
                      onRename={onRenameDesk}
                    />
                  </div>

                  <h3 className="text-[16px] font-bold text-[#111111] tracking-tight group-hover:text-[#000000] line-clamp-2 leading-snug mb-1">
                    {desk.title}
                  </h3>

                  <p className="text-[12px] text-[#6B7280] line-clamp-1">
                    {metaInfo}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F1F3F5] flex items-center justify-between text-[11.5px] text-[#6B7280]">
                  <span>{desk.updatedAt || 'Recently active'}</span>
                  <span className="font-semibold text-[#111111] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Open Desk
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
