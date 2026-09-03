'use client';

import React, { useState } from 'react';
import { CodeData } from './types';
import { Terminal, Check, Code } from 'lucide-react';

interface PracticeCodeTaskProps {
  data: CodeData;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
}

export const PracticeCodeTask: React.FC<PracticeCodeTaskProps> = ({
  data,
  isSubmitted,
  onCheckAnswer,
}) => {
  const [code, setCode] = useState(data.initialCode);

  const handleSubmit = () => {
    if (isSubmitted) return;
    const isMatched = code.includes(data.expectedOutputOrToken.trim());
    onCheckAnswer(isMatched);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between text-[13.5px] text-[#6B7280]">
        <span className="flex items-center gap-1.5 font-medium text-[#374151]">
          <Code className="w-4 h-4 text-[#4B5BEA]" />
          Goal: {data.goal}
        </span>
        <span className="font-mono bg-[#F3F4F6] px-2 py-0.5 rounded text-[12px]">{data.language}</span>
      </div>

      <div className="relative rounded-[12px] overflow-hidden border border-[#374151] bg-[#1E293B]">
        <div className="bg-[#0F172A] px-4 py-2 border-b border-[#334155] flex items-center justify-between text-[12px] font-mono text-[#94A3B8]">
          <span>editor.{data.language.toLowerCase()}</span>
          <Terminal className="w-3.5 h-3.5" />
        </div>
        <textarea
          rows={6}
          disabled={isSubmitted}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-transparent p-4 text-[13.5px] font-mono text-[#F8FAFC] focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {!isSubmitted && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[46px] px-6 bg-[#4B5BEA] hover:bg-[#3B4BD8] text-white rounded-[12px] font-semibold text-[15px] transition-all cursor-pointer shadow-xs"
          >
            Check Answer →
          </button>
        </div>
      )}
    </div>
  );
};
