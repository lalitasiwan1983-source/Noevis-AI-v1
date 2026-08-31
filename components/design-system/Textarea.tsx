import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  maxLength?: number;
  showCharCount?: boolean;
  wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      maxLength,
      showCharCount = false,
      disabled = false,
      className,
      wrapperClassName,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const hasError = Boolean(errorMessage);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={textareaId}
              className={cn(
                'text-[13px] font-medium text-[#111827] tracking-tight',
                disabled && 'text-[#9CA3AF]'
              )}
            >
              {label}
            </label>
            {showCharCount && maxLength && (
              <span className="text-[12px] text-[#667085]">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          value={value}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          className={cn(
            'w-full min-h-[100px] p-3.5 text-[15px] text-[#111827] placeholder:text-[#9CA3AF]',
            'bg-white rounded-[12px] border transition-all duration-180 ease-out resize-y',
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

        {/* Error or Helper Message */}
        {hasError ? (
          <p id={`${textareaId}-error`} className="text-[12.5px] text-[#DC2626]">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${textareaId}-helper`} className="text-[12.5px] text-[#667085]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
