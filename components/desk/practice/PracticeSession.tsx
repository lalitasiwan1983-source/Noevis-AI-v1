'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PracticeTask } from './types';
import { PracticeTaskRenderer } from './PracticeTaskRenderer';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

interface PracticeSessionProps {
  tasks: PracticeTask[];
  onComplete: (score: number, handledWell: string[], needsMorePractice: string[]) => void;
  onSwitchToLearn?: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({
  tasks,
  onComplete,
  onSwitchToLearn,
}) => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Tracking scores & category performance
  const [score, setScore] = useState(0);
  const [handledWell, setHandledWell] = useState<string[]>([]);
  const [needsMorePractice, setNeedsMorePractice] = useState<string[]>([]);

  const totalTasks = tasks.length;
  const currentTask = tasks[taskIndex] || tasks[0];

  const handleCheckAnswer = (correct: boolean) => {
    setIsSubmitted(true);
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
      if (!handledWell.includes(currentTask.typeBadge)) {
        setHandledWell((prev) => [...prev, currentTask.typeBadge]);
      }
    } else {
      if (!needsMorePractice.includes(currentTask.typeBadge)) {
        setNeedsMorePractice((prev) => [...prev, currentTask.typeBadge]);
      }
    }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    setResetKey((prev) => prev + 1);
  };

  const handleNext = () => {
    if (taskIndex < totalTasks - 1) {
      setTaskIndex((prev) => prev + 1);
      setIsSubmitted(false);
      setIsCorrect(null);
      setShowHint(false);
      setResetKey((prev) => prev + 1);
    } else {
      onComplete(score + (isCorrect ? 1 : 0), handledWell, needsMorePractice);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[820px] mx-auto pt-[32px] pb-[56px] px-6 sm:px-8 font-sans flex flex-col space-y-6"
    >
      {/* 1. Top Bar: Title & Subtle Progress Indicator */}
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-[17px] font-semibold text-[#111827]">
          Practice
        </h1>
        <span className="text-[14px] text-[#6B7280] font-medium">
          {taskIndex + 1} / {totalTasks}
        </span>
      </div>

      {/* 2. Main Practice Work Card (Width ~820px) */}
      <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[16px] p-7 sm:p-8 space-y-6 shadow-2xs">
        {/* Task Title & Instruction */}
        <div className="space-y-2">
          <h2 className="text-[21px] sm:text-[23px] font-bold text-[#111827] tracking-tight leading-snug">
            {currentTask.title}
          </h2>
          <p className="text-[16px] text-[#4B5563] leading-relaxed">
            {currentTask.instruction}
          </p>
        </div>

        {/* Dynamic Task Surface */}
        <div className="pt-2">
          <PracticeTaskRenderer
            task={currentTask}
            resetKey={resetKey}
            isSubmitted={isSubmitted}
            onCheckAnswer={handleCheckAnswer}
            onReset={handleTryAgain}
          />
        </div>

        {/* Quiet Hint Toggle */}
        {!isSubmitted && (
          <div className="pt-2 flex flex-col items-start gap-2">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="text-[14px] text-[#6B7280] hover:text-[#111827] font-medium flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-[#F4F4F5] transition-colors cursor-pointer"
            >
              <Lightbulb className="w-[16px] h-[16px] text-[#F59E0B]" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-[#FAFAFB] border border-[#E5E7EB] p-4 rounded-[12px] text-[14.5px] text-[#4B5563] leading-relaxed"
              >
                {currentTask.hint}
              </motion.div>
            )}
          </div>
        )}

        {/* 3. In-place Feedback Section */}
        <AnimatePresence mode="wait">
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="pt-4"
            >
              {isCorrect ? (
                /* CORRECT FEEDBACK */
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-6 rounded-[14px] space-y-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-[22px] h-[22px] text-[#16A34A] shrink-0" />
                    <h3 className="text-[17.5px] font-semibold text-[#15803D]">
                      Good work
                    </h3>
                  </div>

                  <p className="text-[15px] text-[#166534] leading-relaxed">
                    {currentTask.whyExplanation?.coreInsight || 'You demonstrated accurate understanding of this principle.'}
                  </p>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-[46px] px-6 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[12px] font-semibold text-[14.5px] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{taskIndex < totalTasks - 1 ? 'Next' : 'Complete'}</span>
                      <ArrowRight className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              ) : (
                /* INCORRECT FEEDBACK */
                <div className="bg-[#FFFBEB] border border-[#FDE68A] p-6 rounded-[14px] space-y-4">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-[22px] h-[22px] text-[#D97706] shrink-0" />
                    <h3 className="text-[17.5px] font-semibold text-[#B45309]">
                      Let&apos;s look at it again
                    </h3>
                  </div>

                  <p className="text-[15px] text-[#92400E] leading-relaxed">
                    {currentTask.whyExplanation?.scientificMechanism || currentTask.whyExplanation?.coreInsight || 'Check the relationship between the key variables and try again.'}
                  </p>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleTryAgain}
                      className="h-[44px] px-5 bg-[#FFFFFF] border border-[#FCD34D] hover:bg-[#FEF3C7] text-[#92400E] rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                    >
                      <RotateCcw className="w-[16px] h-[16px]" />
                      <span>Try Again</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-[44px] px-6 bg-[#D97706] hover:bg-[#B45309] text-white rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{taskIndex < totalTasks - 1 ? 'Next' : 'Complete'}</span>
                      <ArrowRight className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
