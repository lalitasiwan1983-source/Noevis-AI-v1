'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, CornerDownLeft, Sparkles } from 'lucide-react';

interface AskNoevisComposerProps {
  onSend: (message: string) => void;
  isSending?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onSelectSuggestion?: (suggestion: string) => void;
}

export const AskNoevisComposer: React.FC<AskNoevisComposerProps> = ({
  onSend,
  isSending = false,
  disabled = false,
  placeholder = 'Ask Noevis anything about this…',
}) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isValid = text.trim().length > 0 && !isSending && !disabled;

  return (
    <div
      id="ask-noevis-composer"
      className="p-3 sm:p-4 border-t border-[#E5E7EB] bg-[#FFFFFF] shrink-0 space-y-2"
    >
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl border transition-all ${
          isFocused
            ? 'bg-[#FFFFFF] border-[#111827] shadow-sm ring-1 ring-[#111827]'
            : 'bg-[#FAFAFB] border-[#E5E7EB] hover:border-[#D1D5DB]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="pl-2 text-[#9CA3AF]">
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={text}
          disabled={disabled || isSending}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-1.5 px-2 text-xs sm:text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none disabled:cursor-not-allowed"
          aria-label="Ask Noevis input"
        />

        <button
          type="submit"
          disabled={!isValid}
          className={`h-9 px-3 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
            isValid
              ? 'bg-[#111827] text-white hover:bg-[#1F2937] shadow-2xs'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
          title="Send inquiry"
          aria-label="Send inquiry"
        >
          {isSending ? (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Ask</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-between text-[10.5px] text-[#9CA3AF] px-1">
        <span>Press Enter to send</span>
        <span>Context: Active Concept</span>
      </div>
    </div>
  );
};
