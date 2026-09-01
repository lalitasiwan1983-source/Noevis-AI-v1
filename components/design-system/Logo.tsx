import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'splash' | 'welcome' | 'header';
  variant?: 'full' | 'mark' | 'stacked';
  showBadge?: boolean;
  className?: string;
  markColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showBadge = true,
  className,
  markColor = '#111827',
}) => {
  // Configured dimensions with exact visual height ratios
  const sizeConfig = {
    xs: { width: 24, height: 18, textSize: 'text-xs', gap: 'gap-1.5', badgeSize: 'text-[9px] px-1 py-0.5' },
    sm: { width: 30, height: 22.5, textSize: 'text-[15px]', gap: 'gap-2', badgeSize: 'text-[10px] px-1.5 py-0.5' },
    welcome: { width: 34, height: 25.5, textSize: 'text-[17px] sm:text-[18px]', gap: 'gap-2.5', badgeSize: 'text-xs px-2 py-0.5' },
    header: { width: 32, height: 24, textSize: 'text-[17px] sm:text-[18px]', gap: 'gap-2.5', badgeSize: 'text-xs px-2 py-0.5' },
    md: { width: 44, height: 33, textSize: 'text-base', gap: 'gap-2.5', badgeSize: 'text-[11px] px-1.5 py-0.5' },
    lg: { width: 60, height: 45, textSize: 'text-xl', gap: 'gap-3', badgeSize: 'text-xs px-2 py-0.5' },
    xl: { width: 80, height: 60, textSize: 'text-2xl', gap: 'gap-3.5', badgeSize: 'text-xs px-2.5 py-1' },
    splash: { width: 112, height: 84, textSize: 'text-[24px]', gap: 'gap-4', badgeSize: 'text-sm px-3 py-1' },
  }[size];

  // Exact Brand Mark SVG based on official NOEVIS visual reference
  // Two rounded vertical pillars and bottom-right circular dot
  const BrandMark = (
    <svg
      width={sizeConfig.width}
      height={sizeConfig.height}
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      aria-hidden="true"
    >
      {/* Left pill */}
      <rect x="2" y="3" width="5.5" height="18" rx="2.75" fill={markColor} />
      {/* Right pill */}
      <rect x="11" y="3" width="5.5" height="18" rx="2.75" fill={markColor} />
      {/* Bottom right dot */}
      <circle cx="23.5" cy="18" r="3" fill={markColor} />
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
        className={cn('inline-flex flex-col items-center gap-3 select-none text-center', className)}
        aria-label="NOEVIS AI Logo"
      >
        {BrandMark}
        <div className="flex items-center gap-1.5">
          <span className={cn('font-semibold tracking-[-0.03em] text-[#111827]', sizeConfig.textSize)}>
            NOEVIS AI
          </span>
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
          {showBadge ? 'NOEVIS' : 'NOEVIS AI'}
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
