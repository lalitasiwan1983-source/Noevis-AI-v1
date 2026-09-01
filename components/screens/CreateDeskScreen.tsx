'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Atom,
  Code2,
  Compass,
  Flame,
  Layers,
  GraduationCap,
  Calculator,
} from 'lucide-react';

interface CreateDeskScreenProps {
  onBack: () => void;
  onCreate: (deskData: { title: string; iconKey: string }) => void;
}

const DESK_ICONS = [
  { key: 'book', label: 'Book', icon: BookOpen },
  { key: 'atom', label: 'Science', icon: Atom },
  { key: 'code', label: 'Code', icon: Code2 },
  { key: 'math', label: 'Math', icon: Calculator },
  { key: 'grad', label: 'Study', icon: GraduationCap },
  { key: 'compass', label: 'Compass', icon: Compass },
  { key: 'flame', label: 'Focus', icon: Flame },
  { key: 'sparkles', label: 'General', icon: Sparkles },
];

export const CreateDeskScreen: React.FC<CreateDeskScreenProps> = ({
  onBack,
  onCreate,
}) => {
  const [deskName, setDeskName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('book');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isValid = deskName.trim().length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isValid) return;
    onCreate({
      title: deskName.trim(),
      iconKey: selectedIcon,
    });
  };

  const transitionConfig = {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitionConfig}
      className="w-full max-w-[540px] mx-auto flex flex-col text-left pt-1 sm:pt-4"
    >
      {/* Back button */}
      <div className="mb-4 sm:mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer group py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2]" />
          <span>Back to Desks</span>
        </button>
      </div>

      {/* Main Creation Card */}
      <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[22px] sm:rounded-[26px] p-5 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#111111] tracking-[-0.03em] leading-tight">
            Create a new Desk
          </h1>
          <p className="text-[13.5px] sm:text-[15px] text-[#6B7280] tracking-[-0.01em] mt-1">
            Give your learning space a name.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Desk Name Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="desk-name-input"
              className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] tracking-tight"
            >
              Desk name
            </label>
            <div className="relative">
              <input
                id="desk-name-input"
                ref={inputRef}
                type="text"
                value={deskName}
                onChange={(e) => setDeskName(e.target.value)}
                placeholder="e.g. Physics, JEE Maths, Web Development"
                maxLength={60}
                className="w-full h-12 sm:h-13 px-4 rounded-[14px] bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] text-[14px] sm:text-[15px] font-medium text-[#111111] placeholder:text-[#9CA3AF] outline-none transition-all"
              />
            </div>
          </div>

          {/* Minimal Icon Selector (Optional) */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[12.5px] sm:text-[13.5px] font-bold text-[#111111] tracking-tight">
              Icon <span className="font-normal text-[#6B7280] text-xs">(optional)</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {DESK_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedIcon === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedIcon(item.key)}
                    title={item.label}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-white shadow-sm scale-105'
                        : 'bg-[#F7F8FA] border border-[#E5E7EB] text-[#6B7280] hover:text-[#111111] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.9]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-3 sm:pt-4 border-t border-[#F1F3F5] flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full sm:flex-1 h-11 sm:h-12 rounded-[14px] text-xs sm:text-[14px] font-bold tracking-tight flex items-center justify-center transition-all ${
                isValid
                  ? 'bg-[#111111] hover:bg-[#222222] text-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] active:scale-[0.985] cursor-pointer'
                  : 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB] cursor-not-allowed opacity-60'
              }`}
            >
              Create Desk
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto h-11 sm:h-12 px-5 rounded-[14px] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F9F9FB] text-xs sm:text-[13.5px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
