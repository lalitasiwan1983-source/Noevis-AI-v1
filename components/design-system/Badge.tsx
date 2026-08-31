import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'indigo' | 'soft' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'soft',
  size = 'md',
  dot = false,
  icon,
  className,
  children,
  id,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[11px] h-[22px] px-2 gap-1 rounded-[6px] font-medium',
    md: 'text-[12px] h-[26px] px-2.5 gap-1.5 rounded-[8px] font-medium',
  }[size];

  const variantClasses = {
    soft: 'bg-[#EEF0FF] text-[#4B5BEA] border border-[#DCE1FD]',
    indigo: 'bg-[#4B5BEA] text-white font-medium',
    success: 'bg-[#ECFDF5] text-[#16A34A] border border-[#BBF7D0]',
    warning: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
    error: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
    neutral: 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]',
    outline: 'bg-transparent text-[#667085] border border-[#E5E7EB]',
  }[variant];

  const dotClasses = {
    soft: 'bg-[#4B5BEA]',
    indigo: 'bg-white',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#D97706]',
    error: 'bg-[#DC2626]',
    neutral: 'bg-[#6B7280]',
    outline: 'bg-[#667085]',
  }[variant];

  return (
    <span
      id={id}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap select-none shrink-0 tracking-tight leading-none',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotClasses
          )}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
