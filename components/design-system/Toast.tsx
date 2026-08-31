'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, title, description, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, description, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (title: string, description?: string) => toast({ type: 'success', title, description }),
    [toast]
  );
  const error = useCallback(
    (title: string, description?: string) => toast({ type: 'error', title, description }),
    [toast]
  );
  const warning = useCallback(
    (title: string, description?: string) => toast({ type: 'warning', title, description }),
    [toast]
  );
  const info = useCallback(
    (title: string, description?: string) => toast({ type: 'info', title, description }),
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, dismissToast, success, error, warning, info }}>
      {children}
      {/* Toast Render Viewport */}
      <div
        id="noevis-toast-container"
        aria-live="polite"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 max-w-[380px] w-full pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />,
              error: <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />,
              warning: <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />,
              info: <Info className="w-5 h-5 text-[#4B5BEA] shrink-0 mt-0.5" />,
            }[t.type];

            const borderColors = {
              success: 'border-[#BBF7D0]',
              error: 'border-[#FECACA]',
              warning: 'border-[#FDE68A]',
              info: 'border-[#DCE1FD]',
            }[t.type];

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'pointer-events-auto bg-white rounded-[14px] border p-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] flex items-start gap-3 w-full',
                  borderColors
                )}
              >
                {icons}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#111827] leading-tight truncate">
                    {t.title}
                  </h4>
                  {t.description && (
                    <p className="text-[12.5px] text-[#667085] leading-normal line-clamp-2">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(t.id)}
                  aria-label="Dismiss toast"
                  className="text-[#9CA3AF] hover:text-[#111827] transition-colors p-1 rounded-md -mr-1 -mt-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
