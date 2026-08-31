import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'stacked';
  showBadge?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showBadge = true,
  className,
}) => {
  const sizeConfig = {
    xs: { iconSize: 18, textSize: 'text-xs', gap: 'gap-1.5', badgeSize: 'text-[9px] px-1 py-0.5' },
    sm: { iconSize: 22, textSize: 'text-sm', gap: 'gap-2', badgeSize: 'text-[10px] px-1.5 py-0.5' },
    md: { iconSize: 28, textSize: 'text-base', gap: 'gap-2.5', badgeSize: 'text-[11px] px-1.5 py-0.5' },
    lg: { iconSize: 36, textSize: 'text-xl', gap: 'gap-3', badgeSize: 'text-xs px-2 py-0.5' },
    xl: { iconSize: 48, textSize: 'text-2xl', gap: 'gap-3.5', badgeSize: 'text-xs px-2.5 py-1' },
  }[size];

  // SVG Brand Mark: Pure geometric precision in Noevis Indigo
  const BrandMark = (
    <svg
      width={sizeConfig.iconSize}
      height={sizeConfig.iconSize}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      aria-hidden="true"
    >
      {/* Background soft pill */}
      <rect width="32" height="32" rx="8" fill="#4B5BEA" />
      {/* Intersecting precision vector faceted "N" node */}
      <path
        d="M9 23V9L15.5 18.5V23H9Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      <path
        d="M16.5 9H23V23L16.5 13.5V9Z"
        fill="#FFFFFF"
        fillOpacity="0.75"
      />
      <circle cx="16" cy="16" r="2" fill="#EEF0FF" />
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div
        id="noevis-logo-mark"
        className={cn('inline-flex items-center select-none', className)}
        aria-label="NOEVIS AI Logo Mark"
      >
        {BrandMark}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div
        id="noevis-logo-stacked"
        className={cn('inline-flex flex-col items-center gap-2 select-none text-center', className)}
        aria-label="NOEVIS AI Logo"
      >
        {BrandMark}
        <div className="flex items-center gap-1.5">
          <span className={cn('font-semibold tracking-[-0.03em] text-[#111827]', sizeConfig.textSize)}>
            NOEVIS
          </span>
          {showBadge && (
            <span
              className={cn(
                'rounded-md font-medium tracking-wide bg-[#EEF0FF] text-[#4B5BEA] uppercase leading-none',
                sizeConfig.badgeSize
              )}
            >
              AI
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      id="noevis-logo-full"
      className={cn('inline-flex items-center select-none', sizeConfig.gap, className)}
      aria-label="NOEVIS AI"
    >
      {BrandMark}
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            'font-semibold tracking-[-0.03em] text-[#111827] leading-none',
            sizeConfig.textSize
          )}
        >
          NOEVIS
        </span>
        {showBadge && (
          <span
            className={cn(
              'rounded-md font-semibold tracking-wide bg-[#EEF0FF] text-[#4B5BEA] uppercase leading-none border border-[#DCE1FD]',
              sizeConfig.badgeSize
            )}
          >
            AI
          </span>
        )}
      </div>
    </div>
  );
};
