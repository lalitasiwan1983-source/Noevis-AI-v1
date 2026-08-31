import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  id?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  id,
}) => {
  return (
    <div
      id={id}
      className={cn(
        'w-full bg-white border border-[#E5E7EB] rounded-[16px] p-8 md:p-12',
        'flex flex-col items-center justify-center text-center',
        'shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]',
        className
      )}
    >
      {/* Icon Graphic Container */}
      <div className="w-14 h-14 rounded-[14px] bg-[#EEF0FF] border border-[#DCE1FD] flex items-center justify-center text-[#4B5BEA] mb-4">
        {icon || <Sparkles className="w-6 h-6" aria-hidden="true" />}
      </div>

      {/* Typography */}
      <h3 className="text-[18px] md:text-[20px] font-semibold text-[#111827] tracking-tight mb-1.5">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-[#667085] max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            <Button
              variant="primary"
              size="md"
              onClick={primaryAction.onClick}
              leftIcon={primaryAction.icon}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              size="md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
