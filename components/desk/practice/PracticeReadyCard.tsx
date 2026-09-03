'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, ArrowRight, ChevronDown } from 'lucide-react';

interface PracticeReadyCardProps {
  onOpenPractice: (config: { language: string; level: string }) => void;
}

export const PracticeReadyCard: React.FC<PracticeReadyCardProps> = ({ onOpenPractice }) => {
  const [language, setLanguage] = useState('Auto');
  const [level, setLevel] = useState('Auto');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[36px] pb-[56px] px-6 sm:px-8 font-sans flex flex-col"
    >
      {/* 1. Header & Subtitle */}
      <div className="space-y-2 mb-[28px]">
        <h1 className="text-[30px] sm:text-[32px] font-bold text-[#111827] tracking-tight leading-tight">
          Practice
        </h1>
        <p className="text-[16px] sm:text-[17px] text-[#667085] font-normal leading-relaxed">
          Practice from your learning material.
        </p>
      </div>

      {/* 2. Horizontal Ready Card (820px wide, ~104px high, Horizontal orientation) */}
      <div className="w-full h-[108px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] px-6 sm:px-7 flex items-center justify-between gap-4 shadow-2xs">
        {/* LEFT: Pastel Practice Icon */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-[50px] h-[50px] rounded-[14px] bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] flex items-center justify-center shrink-0">
            <Pencil className="w-[24px] h-[24px] stroke-[2.2]" />
          </div>

          {/* CENTER: Title & Description */}
          <div className="min-w-0 flex flex-col justify-center">
            <h2 className="text-[17.5px] font-semibold text-[#111827] tracking-tight truncate">
              Your Practice is ready
            </h2>
            <p className="text-[14px] text-[#667085] leading-normal truncate">
              Practice has been prepared from your learning material.
            </p>
          </div>
        </div>

        {/* RIGHT: Open Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onOpenPractice({ language, level })}
            className="h-[46px] px-6 bg-[#4B5BEA] hover:bg-[#3B4BD8] text-white rounded-[12px] font-semibold text-[15px] flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <span>Open</span>
            <ArrowRight className="w-[18px] h-[18px] stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3. Optional Controls (Below card, compact, secondary) */}
      <div className="mt-[22px] flex items-center gap-4 text-[13.5px] text-[#667085]">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[#6B7280]">Language</span>
          <div className="relative inline-block">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] font-medium rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none text-[13px]"
            >
              <option value="Auto">Auto</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        <span className="text-[#E5E7EB]">|</span>

        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[#6B7280]">Level</span>
          <div className="relative inline-block">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="appearance-none bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] font-medium rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none text-[13px]"
            >
              <option value="Auto">Auto</option>
              <option value="Foundational">Foundational</option>
              <option value="Standard">Standard</option>
              <option value="Advanced">Advanced</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
