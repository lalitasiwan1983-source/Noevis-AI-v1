import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'subtle' | 'accent';
  isHoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', isHoverable = false, className, children, id, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white border-[#E5E7EB] text-[#111827] shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]',
      interactive:
        'bg-white border-[#E5E7EB] text-[#111827] shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] hover:border-[#D1D5DB] transition-all duration-200 cursor-pointer active:scale-[0.995]',
      subtle: 'bg-[#F9FAFB] border-[#E5E7EB] text-[#111827]',
      accent: 'bg-[#EEF0FF] border-[#DCE1FD] text-[#111827]',
    }[variant];

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'rounded-[16px] border transition-colors',
          variantStyles,
          isHoverable && variant === 'default' && 'hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] hover:border-[#D1D5DB] transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-5 md:p-6 pb-3', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-[17px] md:text-[18px] font-medium tracking-tight text-[#111827] leading-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[13.5px] md:text-[14px] text-[#667085] leading-relaxed', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 md:p-6 pt-2', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-5 md:p-6 pt-0 border-t border-[#F0F2F5] mt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';
