import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
  id,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        id={id}
        role="separator"
        aria-orientation="vertical"
        className={cn('w-[1px] h-full bg-[#E5E7EB] shrink-0 self-stretch', className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        id={id}
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center w-full my-4 gap-3', className)}
        {...props}
      >
        <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
        <span className="text-[12px] font-medium text-[#667085] uppercase tracking-wider select-none shrink-0">
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-[#E5E7EB]" />
      </div>
    );
  }

  return (
    <div
      id={id}
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full h-[1px] bg-[#E5E7EB] shrink-0 my-3', className)}
      {...props}
    />
  );
};
