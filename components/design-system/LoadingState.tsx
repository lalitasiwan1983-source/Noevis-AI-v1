import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'indigo' | 'neutral' | 'white';
  className?: string;
  id?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'indigo',
  className,
  id,
}) => {
  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10',
  }[size];

  const colorClasses = {
    indigo: 'text-[#4B5BEA]',
    neutral: 'text-[#667085]',
    white: 'text-white',
  }[variant];

  return (
    <Loader2
      id={id}
      className={cn('animate-spin shrink-0', sizeClasses, colorClasses, className)}
      aria-label="Loading"
    />
  );
};

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  rounded = 'md',
  id,
  ...props
}) => {
  const roundedClasses = {
    sm: 'rounded-[6px]',
    md: 'rounded-[10px]',
    lg: 'rounded-[16px]',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      id={id}
      className={cn('bg-[#E5E7EB]/70 animate-pulse', roundedClasses, className)}
      aria-hidden="true"
      {...props}
    />
  );
};

export interface LoadingCardProps {
  className?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col gap-4',
        className
      )}
      aria-label="Loading content"
    >
      <div className="flex items-center gap-3">
        <Skeleton rounded="full" className="w-10 h-10 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-1/3 h-4" />
          <Skeleton className="w-1/4 h-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-5/6 h-3.5" />
        <Skeleton className="w-3/4 h-3.5" />
      </div>
    </div>
  );
};

export interface LoadingStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading content...',
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center min-h-[220px] gap-3',
        className
      )}
      role="status"
    >
      <Spinner size="lg" variant="indigo" />
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-medium text-[#111827]">{message}</p>
        {description && <p className="text-[13px] text-[#667085]">{description}</p>}
      </div>
    </div>
  );
};
