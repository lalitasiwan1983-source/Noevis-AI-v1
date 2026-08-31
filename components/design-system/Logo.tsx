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
  // Three ascending learning pillars representing "Understand. Practice. Master."
  const BrandMark = (
    <svg
      width={sizeConfig.width}
      height={sizeConfig.height}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200"
      aria-hidden="true"
    >
      {/* Pillar 1: Base foot + First Ascending Step (Understand) */}
      <path
        d="M 14 96 H 38 C 45 96 50 91 50 84 V 68 C 50 60 56 54 64 54 C 72 54 78 60 78 68 V 96"
        stroke={markColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner contour of Pillar 1 */}
      <path
        d="M 50 82 C 50 87 54 91 60 91 H 68 C 74 91 78 87 78 82"
        stroke={markColor}
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Pillar 2: Middle Ascending Step (Practice) */}
      <path
        d="M 78 68 C 78 52 86 40 98 40 C 110 40 118 52 118 68 V 96"
        stroke={markColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom scoop of Pillar 2 */}
      <path
        d="M 88 96 C 96 96 102 91 106 84 L 118 96"
        stroke={markColor}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pillar 3: Tallest Step (Master) + Sweeping Base Curve */}
      <path
        d="M 118 42 C 118 22 128 12 142 12 C 152 12 158 19 158 32 V 84 C 158 91 152 96 144 96 H 124"
        stroke={markColor}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
