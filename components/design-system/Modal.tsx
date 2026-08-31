'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  id?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  id,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
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

  const sizeClasses = {
    sm: 'max-w-[400px]',
    md: 'max-w-[520px]',
    lg: 'max-w-[680px]',
    xl: 'max-w-[840px]',
  }[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id={id || 'noevis-modal-portal'}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="fixed inset-0 bg-[#111827]/40 backdrop-blur-[4px] -z-10"
            aria-hidden="true"
          />

          {/* Modal Content Panel */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'w-full bg-white rounded-[20px] border border-[#E5E7EB] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12),0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden flex flex-col',
              sizeClasses
            )}
          >
            {/* Modal Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-[#F0F2F5]">
                <div className="flex flex-col gap-1 pr-4">
                  {title && (
                    <h2 id="modal-title" className="text-[20px] font-semibold text-[#111827] tracking-tight">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-[13.5px] text-[#667085] leading-normal">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <IconButton
                    icon={<X className="w-4 h-4" />}
                    aria-label="Close dialog"
                    variant="tertiary"
                    size="sm"
                    onClick={onClose}
                  />
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] text-[15px] text-[#111827] leading-relaxed">
              {children}
            </div>

            {/* Modal Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-[#F0F2F5] bg-[#FAFBFD]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
