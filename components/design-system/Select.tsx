import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  wrapperClassName?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  disabled = false,
  errorMessage,
  helperText,
  className,
  wrapperClassName,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const hasError = Boolean(errorMessage);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(options.length - 1);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && focusedIndex >= 0 && options[focusedIndex]) {
        handleSelect(options[focusedIndex]);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn('w-full flex flex-col gap-1.5 relative', wrapperClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            'text-[13px] font-medium text-[#111827] tracking-tight',
            disabled && 'text-[#9CA3AF]'
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-listbox`}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full h-[48px] md:h-[46px] px-3.5 text-left flex items-center justify-between',
          'bg-white rounded-[12px] border text-[15px] transition-all duration-180 ease-out cursor-pointer select-none',
          !hasError && 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#4B5BEA] focus:ring-3 focus:ring-[#4B5BEA]/20 focus:outline-none',
          hasError && 'border-[#DC2626] bg-[#FEF2F2]/20 text-[#111827] focus:border-[#DC2626] focus:ring-3 focus:ring-[#DC2626]/20 focus:outline-none',
          disabled && 'bg-[#F9FAFB] text-[#9CA3AF] border-[#E5E7EB] cursor-not-allowed select-none hover:border-[#E5E7EB]',
          className
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-[#9CA3AF]')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {hasError && <AlertCircle className="w-4 h-4 text-[#DC2626]" aria-hidden="true" />}
          <ChevronDown
            className={cn(
              'w-4 h-4 text-[#667085] transition-transform duration-180',
              isOpen && 'rotate-180 text-[#4B5BEA]'
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id={`${selectId}-listbox`}
          role="listbox"
          className="absolute top-[calc(100%+6px)] left-0 w-full z-50 bg-white rounded-[14px] border border-[#E5E7EB] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] py-1.5 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isFocused = index === focusedIndex;

            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={cn(
                  'px-3.5 py-2.5 mx-1 rounded-[8px] text-[14.5px] flex items-center justify-between cursor-pointer transition-colors',
                  isSelected ? 'bg-[#EEF0FF] text-[#4B5BEA] font-medium' : 'text-[#111827] hover:bg-[#F7F8FA]',
                  isFocused && !isSelected && 'bg-[#F3F4F6]',
                  option.disabled && 'text-[#9CA3AF] cursor-not-allowed bg-transparent hover:bg-transparent'
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.description && (
                    <span className="text-[12px] text-[#667085] font-normal">{option.description}</span>
                  )}
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#4B5BEA] shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Error or Helper Message */}
      {hasError ? (
        <p className="text-[12.5px] text-[#DC2626] flex items-center gap-1">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-[12.5px] text-[#667085]">{helperText}</p>
      ) : null}
    </div>
  );
};
