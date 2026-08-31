import React from 'react';
import { cn } from '@/lib/utils';

export type ProgressVariant = 'indigo' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  isIndeterminate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'indigo',
  size = 'md',
  showLabel = false,
  label,
  isIndeterminate = false,
  className,
  id,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const barColors = {
    indigo: 'bg-[#4B5BEA]',
    success: 'bg-[#16A34A]',
    warning: 'bg-[#D97706]',
    error: 'bg-[#DC2626]',
  }[variant];

  return (
    <div id={id} className={cn('w-full flex flex-col gap-1.5', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium text-[#111827]">{label || 'Progress'}</span>
          {showLabel && (
            <span className="font-mono text-[12px] text-[#667085]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          'w-full bg-[#E5E7EB] rounded-full overflow-hidden relative',
          heightClasses
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            barColors,
            isIndeterminate && 'w-1/3 animate-[indeterminate_1.5s_infinite_ease-in-out]'
          )}
          style={{ width: isIndeterminate ? undefined : `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface ProgressRingProps {
  value: number; // 0 to 100
  size?: number; // pixel width/height
  strokeWidth?: number;
  variant?: ProgressVariant;
  showValue?: boolean;
  className?: string;
  id?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  variant = 'indigo',
  showValue = false,
  className,
  id,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const strokeColors = {
    indigo: '#4B5BEA',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
  }[variant];

  return (
    <div
      id={id}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColors}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {showValue && (
        <span className="absolute text-[11px] font-medium text-[#111827]">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
