import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

/**
 * Display: 42–48px desktop / 32–36px mobile
 * Used sparingly for primary impact headings.
 */
export const Display: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h1',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[32px] sm:text-[36px] md:text-[44px] lg:text-[48px]',
        'font-semibold tracking-[-0.03em] leading-[1.12]',
        'text-[#111827]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Page Title: 30–36px desktop / 26–30px mobile
 * Primary screen / view header.
 */
export const PageTitle: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h1',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[26px] sm:text-[28px] md:text-[32px] lg:text-[36px]',
        'font-semibold tracking-[-0.025em] leading-[1.2]',
        'text-[#111827]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Section Title: 20–24px
 * Modular section and card group headings.
 */
export const SectionTitle: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h2',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[20px] md:text-[22px] lg:text-[24px]',
        'font-semibold tracking-[-0.018em] leading-[1.3]',
        'text-[#111827]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Card Title / Subhead: 17–18px
 */
export const CardTitleText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h3',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[17px] md:text-[18px]',
        'font-medium tracking-[-0.015em] leading-[1.35]',
        'text-[#111827]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Body: 16–17px
 * Standard readable prose and primary interface copy.
 */
export const Body: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[16px] md:text-[16.5px]',
        'font-normal leading-[1.6] tracking-[-0.01em]',
        'text-[#111827]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Secondary Text / Metadata: 13–14px
 * Supporting descriptions, timestamps, secondary labels.
 */
export const SecondaryText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[13px] md:text-[14px]',
        'font-normal leading-[1.5] tracking-[-0.006em]',
        'text-[#667085]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Small Label: 12px
 * Field tags, uppercase headers, badge labels.
 */
export const LabelText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'span',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'text-[12px]',
        'font-medium leading-[1.4] tracking-[0.01em]',
        'text-[#667085]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Code / Monospace: 13–14px
 * Clean token, keyboard shortcut, or parameter styling.
 */
export const CodeText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'code',
  id,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'font-mono text-[13px] px-1.5 py-0.5 rounded-md',
        'bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
