'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Share2,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  Bookmark,
  Check,
} from 'lucide-react';

interface DeskMoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionName: string) => void;
}

export const DeskMoreMenu: React.FC<DeskMoreMenuProps> = ({
  isOpen,
  onClose,
  onAction,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'export',
      label: 'Export Desk Summary',
      description: 'PDF or Markdown export',
      icon: Download,
    },
    {
      id: 'share',
      label: 'Share Learning Workspace',
      description: 'Collaborate or send link',
      icon: Share2,
    },
    {
      id: 'source',
      label: 'Source Ingestion Details',
      description: 'View original syllabus or file',
      icon: FileText,
    },
    {
      id: 'reset',
      label: 'Reset Concept Progress',
      description: 'Clear diagnostic checkmarks',
      icon: RotateCcw,
    },
    {
      id: 'preferences',
      label: 'Desk Preferences',
      description: 'Typography & display modes',
      icon: SlidersHorizontal,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -4 }}
        transition={{ duration: 0.15 }}
        className="absolute top-14 right-4 sm:right-6 lg:right-8 w-72 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-[0_16px_40px_-10px_rgba(0,0,0,0.14)] p-2 z-50 flex flex-col gap-1 text-left"
      >
        <div className="px-3 py-2 border-b border-[#E5E7EB]">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#9CA3AF]">
            Desk Options
          </p>
        </div>

        <div className="py-1 flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onAction?.(item.id);
                  onClose();
                }}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-[#F3F4F6] flex items-center gap-3 transition-colors cursor-pointer text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAFAFB] group-hover:bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#667085] group-hover:text-[#111827] shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-[#111827] truncate">
                    {item.label}
                  </p>
                  <p className="text-[11.5px] text-[#667085] truncate">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
