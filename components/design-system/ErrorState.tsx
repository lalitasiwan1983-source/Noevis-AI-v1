import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  errorCode?: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: 'card' | 'inline' | 'fullscreen';
  className?: string;
  id?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while processing your request. Please try again.',
  errorCode,
  onRetry,
  retryLabel = 'Try again',
  variant = 'card',
  className,
  id,
}) => {
  if (variant === 'inline') {
    return (
      <div
        id={id}
        role="alert"
        className={cn(
          'w-full bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] p-3.5 flex items-start gap-3 text-left',
          className
        )}
      >
        <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-semibold text-[#DC2626] leading-tight">{title}</h4>
          {description && (
            <p className="text-[13px] text-[#991B1B] mt-0.5 leading-normal">{description}</p>
          )}
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-[13px] font-medium text-[#DC2626] hover:text-[#991B1B] underline shrink-0 cursor-pointer ml-2"
          >
            {retryLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      id={id}
      role="alert"
      className={cn(
        'w-full bg-white border border-[#FECACA] rounded-[16px] p-8 flex flex-col items-center justify-center text-center shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]',
        variant === 'fullscreen' ? 'min-h-[50vh]' : 'min-h-[260px]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#DC2626] mb-4">
        <XCircle className="w-6 h-6" aria-hidden="true" />
      </div>

      <h3 className="text-[18px] font-semibold text-[#111827] tracking-tight mb-1">{title}</h3>
      <p className="text-[14px] text-[#667085] max-w-md mb-4 leading-relaxed">{description}</p>

      {errorCode && (
        <span className="font-mono text-[12px] text-[#9CA3AF] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-0.5 rounded-md mb-5">
          Error code: {errorCode}
        </span>
      )}

      {onRetry && (
        <Button
          variant="secondary"
          size="md"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
