import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'soft' | 'destructive' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  isRoundedFull?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      'aria-label': ariaLabel,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      isRoundedFull = false,
      disabled = false,
      className,
      id,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'w-[34px] h-[34px] min-w-[34px] text-sm',
      md: 'w-[42px] h-[42px] min-w-[42px] text-base',
      lg: 'w-[48px] h-[48px] min-w-[48px] text-lg',
    }[size];

    const radiusClass = isRoundedFull
      ? 'rounded-full'
      : size === 'sm'
      ? 'rounded-[10px]'
      : 'rounded-[12px]';

    const variantClasses = {
      primary: cn(
        'bg-[#4B5BEA] text-white shadow-sm',
        'hover:bg-[#3E4DD4]',
        'active:bg-[#323FB8] active:scale-[0.96]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/30 focus-visible:outline-none',
        'disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      secondary: cn(
        'bg-white text-[#111827] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
        'hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:text-[#111827]',
        'active:bg-[#F3F4F6] active:scale-[0.96]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/20 focus-visible:border-[#4B5BEA] focus-visible:outline-none',
        'disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:border-[#E5E7EB] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      tertiary: cn(
        'bg-transparent text-[#667085]',
        'hover:text-[#111827] hover:bg-[#F0F2F5]',
        'active:bg-[#E5E7EB] active:scale-[0.96]',
        'focus-visible:ring-2 focus-visible:ring-[#4B5BEA]/20 focus-visible:outline-none',
        'disabled:text-[#9CA3AF] disabled:bg-transparent disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      soft: cn(
        'bg-[#EEF0FF] text-[#4B5BEA] border border-[#DCE1FD]',
        'hover:bg-[#E4E7FF]',
        'active:bg-[#D4DAFF] active:scale-[0.96]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/25 focus-visible:outline-none',
        'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:border-transparent disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      outline: cn(
        'bg-transparent text-[#4B5BEA] border border-[#DCE1FD]',
        'hover:bg-[#EEF0FF]',
        'active:bg-[#E4E7FF] active:scale-[0.96]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/25 focus-visible:outline-none',
        'disabled:text-[#9CA3AF] disabled:border-[#E5E7EB] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      destructive: cn(
        'bg-[#DC2626] text-white shadow-sm',
        'hover:bg-[#B91C1C]',
        'active:bg-[#991B1B] active:scale-[0.96]',
        'focus-visible:ring-3 focus-visible:ring-[#DC2626]/30 focus-visible:outline-none',
        'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
    }[variant];

    return (
      <button
        ref={ref}
        id={id}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center shrink-0 select-none cursor-pointer',
          'transition-all duration-180 ease-out',
          sizeClasses,
          radiusClass,
          variantClasses,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
