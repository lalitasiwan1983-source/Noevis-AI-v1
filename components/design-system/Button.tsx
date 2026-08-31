import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'soft' | 'destructive' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className,
      children,
      id,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Height & padding hierarchy
    // md size is 44-48px height conforming to iOS touch guidelines
    const sizeClasses = {
      sm: 'h-[36px] px-3.5 text-[13px] gap-1.5 rounded-[10px]',
      md: 'h-[44px] md:h-[46px] px-4 text-[15px] gap-2 rounded-[12px]',
      lg: 'h-[50px] md:h-[52px] px-5 text-[16px] gap-2.5 rounded-[12px]',
    }[size];

    // Restrained variant styling
    const variantClasses = {
      primary: cn(
        'bg-[#4B5BEA] text-white font-medium shadow-sm',
        'hover:bg-[#3E4DD4]',
        'active:bg-[#323FB8] active:scale-[0.985]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/30 focus-visible:outline-none',
        'disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none'
      ),
      secondary: cn(
        'bg-white text-[#111827] font-medium border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        'hover:bg-[#F9FAFB] hover:border-[#D1D5DB]',
        'active:bg-[#F3F4F6] active:scale-[0.985]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/20 focus-visible:border-[#4B5BEA] focus-visible:outline-none',
        'disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:border-[#E5E7EB] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      tertiary: cn(
        'bg-transparent text-[#667085] font-medium',
        'hover:text-[#111827] hover:bg-[#F0F2F5]',
        'active:bg-[#E5E7EB] active:scale-[0.985]',
        'focus-visible:ring-2 focus-visible:ring-[#4B5BEA]/20 focus-visible:outline-none',
        'disabled:text-[#9CA3AF] disabled:bg-transparent disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      soft: cn(
        'bg-[#EEF0FF] text-[#4B5BEA] font-medium border border-[#DCE1FD]',
        'hover:bg-[#E4E7FF]',
        'active:bg-[#D4DAFF] active:scale-[0.985]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/25 focus-visible:outline-none',
        'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:border-transparent disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      outline: cn(
        'bg-transparent text-[#4B5BEA] font-medium border border-[#DCE1FD]',
        'hover:bg-[#EEF0FF]',
        'active:bg-[#E4E7FF] active:scale-[0.985]',
        'focus-visible:ring-3 focus-visible:ring-[#4B5BEA]/25 focus-visible:outline-none',
        'disabled:text-[#9CA3AF] disabled:border-[#E5E7EB] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
      destructive: cn(
        'bg-[#DC2626] text-white font-medium shadow-sm',
        'hover:bg-[#B91C1C]',
        'active:bg-[#991B1B] active:scale-[0.985]',
        'focus-visible:ring-3 focus-visible:ring-[#DC2626]/30 focus-visible:outline-none',
        'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed disabled:active:scale-100'
      ),
    }[variant];

    return (
      <button
        ref={ref}
        id={id}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center select-none',
          'transition-all duration-180 ease-out whitespace-nowrap cursor-pointer',
          sizeClasses,
          variantClasses,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
            <span className="truncate">{children || 'Loading...'}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>}
            {children && <span className="truncate">{children}</span>}
            {rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
