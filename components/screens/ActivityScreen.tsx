'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  X,
  RotateCcw,
  Sparkles,
  FileText,
  HelpCircle,
  Layers,
  FolderKanban,
  File,
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight,
  Diamond,
} from 'lucide-react';

export type ActivityCategory =
  | 'Learning'
  | 'Notes'
  | 'Summaries'
  | 'Quizzes'
  | 'Flashcards'
  | 'My Work'
  | 'Sources';

export type ActivityActionType =
  | 'started_learning'
  | 'completed_learning'
  | 'added_source'
  | 'created_note'
  | 'generated_summary'
  | 'created_flashcards'
  | 'completed_quiz'
  | 'completed_my_work';

export interface ActivityItem {
  id: string;
  actionType: ActivityActionType;
  category: ActivityCategory;
  title: string; // e.g. "Completed Quiz"
  itemName: string; // e.g. "Cellular Respiration Practice"
  deskName?: string;
  deskId?: string;
  timestamp: string; // e.g. "10:45 AM", "Yesterday", "Sep 1"
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  targetSourceType?: string;
}

interface DeskRef {
  id: string;
  title: string;
}

interface ActivityScreenProps {
  onStartLearning: () => void;
  desks?: DeskRef[];
  activities?: ActivityItem[];
  onOpenActivity?: (activity: ActivityItem) => void;
}

const CATEGORY_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Activity', value: 'All' },
  { label: 'Learning', value: 'Learning' },
  { label: 'Notes', value: 'Notes' },
  { label: 'Summaries', value: 'Summaries' },
  { label: 'Quizzes', value: 'Quizzes' },
  { label: 'Flashcards', value: 'Flashcards' },
  { label: 'My Work', value: 'My Work' },
  { label: 'Sources', value: 'Sources' },
];

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  onStartLearning,
  desks = [],
  activities = [],
  onOpenActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDesk, setSelectedDesk] = useState<string>('All Desks');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterPopoverRef = useRef<HTMLDivElement>(null);

  // Close filter popover on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        filterPopoverRef.current &&
        !filterPopoverRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isFilterOpen]);

  // Actual dynamic list of user desks
  const availableDesks = useMemo(() => {
    const set = new Set<string>();
    desks.forEach((d) => {
      if (d.title) set.add(d.title);
    });
    activities.forEach((act) => {
      if (act.deskName) set.add(act.deskName);
    });
    return Array.from(set);
  }, [desks, activities]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedDesk !== 'All Desks';

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedDesk('All Desks');
    setSearchQuery('');
  };

  // Filter items strictly from real user data
  const filteredActivities = useMemo(() => {
    let list = [...activities];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (act) =>
          act.title.toLowerCase().includes(q) ||
          act.itemName.toLowerCase().includes(q) ||
          (act.deskName && act.deskName.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter((act) => act.category === selectedCategory);
    }

    if (selectedDesk !== 'All Desks') {
      list = list.filter((act) => act.deskName === selectedDesk);
    }

    return list;
  }, [activities, searchQuery, selectedCategory, selectedDesk]);

  // Group chronological activities by date (Today, Yesterday, Earlier)
  const groupedActivities = useMemo(() => {
    const groups: { [key in 'Today' | 'Yesterday' | 'Earlier']?: ActivityItem[] } = {};
    const dateOrder: ('Today' | 'Yesterday' | 'Earlier')[] = ['Today', 'Yesterday', 'Earlier'];

    filteredActivities.forEach((act) => {
      const g = act.dateGroup || 'Earlier';
      if (!groups[g]) {
        groups[g] = [];
      }
      groups[g]!.push(act);
    });

    return dateOrder
      .filter((grp) => groups[grp] && groups[grp]!.length > 0)
      .map((grp) => ({
        group: grp,
        items: groups[grp]!,
      }));
  }, [filteredActivities]);

  const totalCount = activities.length;
  const isOverallEmpty = totalCount === 0;
  const isFilterEmpty = !isOverallEmpty && filteredActivities.length === 0;

  const transitionConfig = {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  // Render iconic badge matching the activity category
  const renderActivityIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'Learning':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] flex items-center justify-center shrink-0">
            <BookOpen className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'Notes':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
            <FileText className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'Summaries':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#FAF5FF] border border-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'Quizzes':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#FFFBEB] border border-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <HelpCircle className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'Flashcards':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#FDF2F8] border border-[#FCE7F3] text-[#DB2777] flex items-center justify-center shrink-0">
            <Layers className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'My Work':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <FolderKanban className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      case 'Sources':
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <File className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] flex items-center justify-center shrink-0">
            <Clock className="w-4.5 h-4.5 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitionConfig}
      className="w-full max-w-[880px] flex flex-col text-left"
    >
      {/* 1. CONFIDENT, SPACIOUS HEADER */}
      <div className="pb-4 sm:pb-6 border-b border-[#E5E7EB] mb-6 sm:mb-8">
        <h1 className="text-[26px] sm:text-[32px] font-bold text-[#111111] tracking-[-0.03em] leading-tight">
          Activity
        </h1>
        <p className="text-[14px] sm:text-[16px] font-normal text-[#6B7280] tracking-[-0.01em] mt-1 sm:mt-1.5">
          Your learning history, across your Desks.
        </p>
      </div>

      {/* 2. SEARCH & SINGLE FILTER CONTROL */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 relative z-20">
        {/* Prominent Activity Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#9CA3AF] pointer-events-none stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity…"
            className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-10 rounded-[14px] bg-white border border-[#E5E7EB] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-[14px] sm:text-[15px] font-medium text-[#111111] placeholder:text-[#9CA3AF] outline-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Single Filter Button + Popover */}
        <div className="relative" ref={filterPopoverRef}>
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`h-11 sm:h-12 px-3.5 sm:px-4 rounded-[14px] border font-semibold text-xs sm:text-[13.5px] flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
              hasActiveFilters
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white border-[#E5E7EB] hover:border-[#111111] text-[#111111] hover:bg-[#F9F9FB]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-white ml-0.5" />
            )}
          </button>

          {/* Filter Popover / Sheet */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-13 sm:top-14 w-[280px] sm:w-[320px] bg-white border border-[#E5E7EB] rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 z-50 text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5] mb-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Filters
                  </span>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="text-[11px] font-semibold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* DESK Section */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">
                    Desk
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-[130px] overflow-y-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setSelectedDesk('All Desks')}
                      className={`px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                        selectedDesk === 'All Desks'
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111111] hover:border-[#D1D5DB]'
                      }`}
                    >
                      All Desks
                    </button>

                    {availableDesks.map((deskTitle) => {
                      const isSelected = selectedDesk === deskTitle;
                      return (
                        <button
                          key={deskTitle}
                          type="button"
                          onClick={() => setSelectedDesk(deskTitle)}
                          className={`px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#111111] text-white'
                              : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111111] hover:border-[#D1D5DB]'
                          }`}
                        >
                          {deskTitle}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ACTIVITY CATEGORY Section */}
                <div>
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">
                    Activity
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORY_OPTIONS.map((opt) => {
                      const isSelected = selectedCategory === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSelectedCategory(opt.value)}
                          className={`px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#111111] text-white'
                              : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#4B5563] hover:text-[#111111] hover:border-[#D1D5DB]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Apply action */}
                <div className="mt-4 pt-3 border-t border-[#F1F3F5] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="h-8 px-4 rounded-[10px] bg-[#111111] hover:bg-[#222222] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. MAIN CONTENT: GENUINE NEW USER EMPTY STATE */}
      {isOverallEmpty && (
        <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[22px] sm:rounded-[26px] p-8 sm:p-14 md:p-16 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
          {/* Simple Noevis-style Clock / Activity Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[16px] bg-[#F7F8FA] border border-[#E5E7EB] text-[#111111] flex items-center justify-center mb-5 sm:mb-6">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
          </div>

          {/* Heading & Subtitle */}
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#111111] tracking-[-0.025em] mb-2 sm:mb-2.5">
            Your activity will appear here.
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-[#6B7280] max-w-[460px] leading-[1.45] tracking-[-0.01em] mb-6 sm:mb-8">
            As you learn, complete work, and create things in your Desks, your activity will show up here.
          </p>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onStartLearning}
            className="h-11 sm:h-12 px-6 sm:px-7 rounded-[14px] bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-[14px] font-bold tracking-tight flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)] active:scale-[0.985] transition-all cursor-pointer"
          >
            <span>Start learning</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      )}

      {/* 4. CONTEXTUAL FILTER EMPTY STATE (When filters yield 0 results) */}
      {isFilterEmpty && (
        <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-8 sm:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-[12px] bg-[#F7F8FA] border border-[#E5E7EB] text-[#6B7280] flex items-center justify-center mb-4">
            <Search className="w-4.5 h-4.5 stroke-[1.8]" />
          </div>

          <h3 className="text-[17px] sm:text-[19px] font-bold text-[#111111] tracking-[-0.02em] mb-1.5">
            Nothing here yet.
          </h3>
          <p className="text-[13px] sm:text-[14px] text-[#6B7280] max-w-[360px] leading-snug tracking-[-0.01em] mb-5">
            No activity matches your current filter.
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            className="h-9 px-4 rounded-[10px] bg-white border border-[#E5E7EB] hover:border-[#111111] text-xs font-bold text-[#111111] transition-all cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* 5. POPULATED CHRONOLOGICAL ACTIVITY LIST (When real data exists) */}
      {!isOverallEmpty && !isFilterEmpty && (
        <div className="flex flex-col gap-6 sm:gap-7">
          {groupedActivities.map(({ group, items }) => (
            <div key={group} className="flex flex-col gap-2.5">
              {/* Date Group Header */}
              <div className="px-1 flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">
                  {group}
                </span>
                <div className="flex-1 h-[1px] bg-[#F1F3F5]" />
              </div>

              {/* Items in this date group */}
              <div className="flex flex-col gap-2.5">
                <AnimatePresence mode="popLayout">
                  {items.map((act) => (
                    <motion.div
                      key={act.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => onOpenActivity && onOpenActivity(act)}
                      className="group w-full bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[16px] p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-4 hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all cursor-pointer text-left"
                    >
                      {/* Left Icon and Title / Content */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        {renderActivityIcon(act.category)}

                        <div className="min-w-0">
                          <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#111111] tracking-tight group-hover:text-black truncate">
                            {act.title}
                          </h3>
                          {act.itemName && (
                            <p className="text-[13px] sm:text-[13.5px] font-medium text-[#4B5563] truncate mt-0.5">
                              {act.itemName}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1 truncate">
                            {act.deskName && (
                              <>
                                <span className="font-medium text-[#4B5563] truncate">
                                  {act.deskName} Desk
                                </span>
                                <span>·</span>
                              </>
                            )}
                            <span className="text-[11.5px] text-[#9CA3AF] shrink-0">
                              {act.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Chevron Indicator */}
                      <div className="shrink-0 text-[#9CA3AF] group-hover:text-[#111111] transition-colors pr-1">
                        <ChevronRight className="w-4 h-4 stroke-[2]" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
