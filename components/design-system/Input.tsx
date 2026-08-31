import React from 'react';
import { cn } from '@/lib/utils';
import { XCircle, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      onClear,
      showClearButton = false,
      disabled = false,
      className,
      wrapperClassName,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const hasError = Boolean(errorMessage);
    const hasValue = value !== undefined && value !== '' && value !== null;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-[13px] font-medium text-[#111827] tracking-tight flex items-center justify-between',
              disabled && 'text-[#9CA3AF]'
            )}
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#667085]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            value={value}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              // Heights: 46-50px desktop, 48-52px mobile
              'w-full h-[48px] md:h-[46px] px-3.5 text-[15px] text-[#111827] placeholder:text-[#9CA3AF]',
              'bg-white rounded-[12px] border transition-all duration-180 ease-out',
              // Padding adjustments for icons
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon || (showClearButton && hasValue) || hasError ? 'pr-10' : 'pr-3.5',
              // Default state
              !hasError && 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#4B5BEA] focus:ring-3 focus:ring-[#4B5BEA]/20 focus:outline-none',
              // Error state
              hasError && 'border-[#DC2626] bg-[#FEF2F2]/20 text-[#111827] focus:border-[#DC2626] focus:ring-3 focus:ring-[#DC2626]/20 focus:outline-none',
              // Disabled state
              disabled && 'bg-[#F9FAFB] text-[#9CA3AF] border-[#E5E7EB] cursor-not-allowed select-none hover:border-[#E5E7EB]',
              className
            )}
            {...props}
          />

          {/* Right Action: Clear Button or Error Icon or Custom Right Icon */}
          <div className="absolute right-3.5 flex items-center gap-1.5">
            {showClearButton && hasValue && !disabled && (
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear input"
                className="text-[#9CA3AF] hover:text-[#111827] transition-colors p-0.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-[#4B5BEA]"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}

            {hasError && !rightIcon && (
              <AlertCircle className="w-4 h-4 text-[#DC2626] pointer-events-none" aria-hidden="true" />
            )}

            {rightIcon && !hasError && (
              <div className="text-[#667085] flex items-center pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Error or Helper Message */}
        {hasError ? (
          <p id={`${inputId}-error`} className="text-[12.5px] text-[#DC2626] flex items-center gap-1">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-[12.5px] text-[#667085]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
