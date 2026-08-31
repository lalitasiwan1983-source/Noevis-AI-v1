'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  id?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showHandle = true,
  showCloseButton = true,
  id,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id={id || 'noevis-bottomsheet-portal'}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'sheet-title' : undefined}
          className="fixed inset-0 z-50 flex flex-col justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111827]/40 backdrop-blur-[4px]"
            aria-hidden="true"
          />

          {/* Sheet Container */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-10 w-full max-w-2xl mx-auto bg-white rounded-t-[24px] border-t border-[#E5E7EB]',
              'shadow-[0_-10px_30px_rgba(0,0,0,0.1)] max-h-[85vh] flex flex-col overflow-hidden'
            )}
          >
            {/* Grab Handle */}
            {showHandle && (
              <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-[#E5E7EB]" />
              </div>
            )}

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between px-6 py-3 border-b border-[#F0F2F5]">
                <div className="flex flex-col gap-0.5 pr-4">
                  {title && (
                    <h3 id="sheet-title" className="text-[18px] font-semibold text-[#111827]">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-[13px] text-[#667085] leading-normal">{description}</p>
                  )}
                </div>
                {showCloseButton && (
                  <IconButton
                    icon={<X className="w-4 h-4" />}
                    aria-label="Close bottom sheet"
                    variant="tertiary"
                    size="sm"
                    onClick={onClose}
                  />
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto text-[15px] text-[#111827] leading-relaxed">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-6 pt-4 border-t border-[#F0F2F5] bg-[#FAFBFD] flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
