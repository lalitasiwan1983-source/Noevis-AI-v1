'use client';

import React, { useState } from 'react';
import { PracticeHeader } from './PracticeHeader';
import { PracticeSequenceTask } from './PracticeSequenceTask';
import { PracticeVisualHotspotTask } from './PracticeVisualHotspotTask';
import { PracticeScenarioTask } from './PracticeScenarioTask';
import { PracticeMatchingTask } from './PracticeMatchingTask';
import { PracticeFeedbackCard } from './PracticeFeedbackCard';
import { PRACTICE_TASKS } from './data';
import { DeskWorkspaceMode } from '../types';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useToast } from '@/components/design-system/Toast';

interface PracticeExperienceProps {
  currentConceptIndex?: number;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
}

export const PracticeExperience: React.FC<PracticeExperienceProps> = ({
  currentConceptIndex = 1,
  onSwitchToLearn,
  onOpenAskNoevis,
  onChangeMode,
}) => {
  const { success, info } = useToast();

  // Task Index state (1-based index: 1 to PRACTICE_TASKS.length)
  const [activeTaskIndex, setActiveTaskIndex] = useState(() => {
    // default to matching concept or 1
    const foundIdx = PRACTICE_TASKS.findIndex((t) => t.conceptIndex === currentConceptIndex);
    return foundIdx >= 0 ? foundIdx + 1 : 1;
  });

  const totalTasks = PRACTICE_TASKS.length;
  const currentTask = PRACTICE_TASKS[activeTaskIndex - 1] || PRACTICE_TASKS[0];

  // Submission state per task
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  // Key to force reset child component internal states on retry/switch
  const [resetKey, setResetKey] = useState(0);

  const handleCheckAnswer = (correct: boolean) => {
    setIsSubmitted(true);
    setIsCorrect(correct);
    if (correct) {
      success('Correct Application!', 'You demonstrated accurate understanding of this mechanism.');
      if (!completedTaskIds.includes(currentTask.id)) {
        setCompletedTaskIds((prev) => [...prev, currentTask.id]);
      }
    } else {
      info('Review Clue', 'Check the explanation below to clarify the concept.');
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    setResetKey((prev) => prev + 1);
  };

  const handleNextTask = () => {
    if (activeTaskIndex < totalTasks) {
      setActiveTaskIndex((prev) => prev + 1);
      setIsSubmitted(false);
      setIsCorrect(null);
      setShowHint(false);
      setResetKey((prev) => prev + 1);
    } else {
      setIsAllCompleted(true);
      success('Practice Module Complete', 'All 4 applied interactive tasks completed!');
    }
  };

  const handlePrevTask = () => {
    if (activeTaskIndex > 1) {
      setActiveTaskIndex((prev) => prev - 1);
      setIsSubmitted(false);
      setIsCorrect(null);
      setShowHint(false);
      setResetKey((prev) => prev + 1);
    }
  };

  const handleJumpToTask = (idx: number) => {
    setActiveTaskIndex(idx);
    setIsSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    setResetKey((prev) => prev + 1);
  };

  // If user completed all tasks, show a clean celebration summary card
  if (isAllCompleted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 animate-fade-in">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] text-[#16A34A] flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Practice Applied Mastery Complete
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              You have completed all 4 interactive application challenges across Cellular Energetics. You are ready for formal quiz assessment or continuing to the next chapter.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            {PRACTICE_TASKS.map((t, idx) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] text-center"
              >
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center mx-auto mb-1.5">
                  ✓
                </div>
                <span className="text-[11px] font-bold text-[#111827] block truncate">
                  Task {idx + 1}
                </span>
                <span className="text-[10px] text-[#6B7280] block truncate">
                  {t.typeBadge}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAllCompleted(false);
                setActiveTaskIndex(1);
                handleRetry();
              }}
              className="min-h-[44px] px-5 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review Practice Again</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToLearn}
              className="min-h-[44px] px-5 rounded-xl bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Back to Learn</span>
            </button>

            {onChangeMode && (
              <button
                type="button"
                onClick={() => onChangeMode('quiz')}
                className="min-h-[44px] px-6 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Take Chapter Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="noevis-practice-experience"
      className="w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8"
    >
      {/* 1. Practice Header */}
      <PracticeHeader
        task={currentTask}
        taskIndex={activeTaskIndex}
        totalTasks={totalTasks}
        onSwitchToLearn={onSwitchToLearn}
        onOpenAskNoevis={onOpenAskNoevis}
      />

      {/* Task Switcher Mini Bar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs">
        <button
          type="button"
          disabled={activeTaskIndex <= 1}
          onClick={handlePrevTask}
          className={`p-2 rounded-lg border flex items-center gap-1 text-xs font-semibold transition-all ${
            activeTaskIndex <= 1
              ? 'border-transparent text-[#D1D5DB] cursor-not-allowed'
              : 'border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Task</span>
        </button>

        <div className="flex items-center gap-1.5">
          {PRACTICE_TASKS.map((t, idx) => {
            const taskNum = idx + 1;
            const isCurrent = taskNum === activeTaskIndex;
            const isDone = completedTaskIds.includes(t.id);

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleJumpToTask(taskNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#111827] text-white shadow-xs'
                    : isDone
                    ? 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#BBF7D0]'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
                title={`Jump to Task ${taskNum}: ${t.typeBadge}`}
              >
                {isDone && !isCurrent ? '✓' : taskNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={activeTaskIndex >= totalTasks}
          onClick={handleNextTask}
          className={`p-2 rounded-lg border flex items-center gap-1 text-xs font-semibold transition-all ${
            activeTaskIndex >= totalTasks
              ? 'border-transparent text-[#D1D5DB] cursor-not-allowed'
              : 'border-[#E5E7EB] bg-[#FAFAFB] hover:bg-[#F3F4F6] text-[#374151] cursor-pointer'
          }`}
        >
          <span className="hidden sm:inline">Next Task</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Interactive Practice Body */}
      <section
        id="practice-interactive-body"
        className="p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-6"
      >
        {currentTask.taskType === 'sequence' && currentTask.sequenceData && (
          <PracticeSequenceTask
            key={`seq-${currentTask.id}-${resetKey}`}
            items={currentTask.sequenceData.items}
            startLabel={currentTask.sequenceData.startLabel}
            endLabel={currentTask.sequenceData.endLabel}
            isSubmitted={isSubmitted}
            onCheckAnswer={handleCheckAnswer}
            onReset={handleRetry}
          />
        )}

        {currentTask.taskType === 'visual-hotspot' && currentTask.hotspotData && (
          <PracticeVisualHotspotTask
            key={`hot-${currentTask.id}-${resetKey}`}
            diagramTitle={currentTask.hotspotData.diagramTitle}
            diagramSubtitle={currentTask.hotspotData.diagramSubtitle}
            targets={currentTask.hotspotData.targets}
            tokens={currentTask.hotspotData.tokens}
            isSubmitted={isSubmitted}
            onCheckAnswer={handleCheckAnswer}
            onReset={handleRetry}
          />
        )}

        {currentTask.taskType === 'scenario' && currentTask.scenarioData && (
          <PracticeScenarioTask
            key={`scen-${currentTask.id}-${resetKey}`}
            story={currentTask.scenarioData.story}
            question={currentTask.scenarioData.question}
            options={currentTask.scenarioData.options}
            isSubmitted={isSubmitted}
            onCheckAnswer={handleCheckAnswer}
            onReset={handleRetry}
          />
        )}

        {currentTask.taskType === 'matching' && currentTask.matchingData && (
          <PracticeMatchingTask
            key={`match-${currentTask.id}-${resetKey}`}
            leftTitle={currentTask.matchingData.leftTitle}
            rightTitle={currentTask.matchingData.rightTitle}
            pairs={currentTask.matchingData.pairs}
            isSubmitted={isSubmitted}
            onCheckAnswer={handleCheckAnswer}
            onReset={handleRetry}
          />
        )}
      </section>

      {/* 3. Feedback Card & Hint */}
      <PracticeFeedbackCard
        task={currentTask}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        showHint={showHint}
        onToggleHint={() => setShowHint((prev) => !prev)}
        onRetry={handleRetry}
        onContinue={handleNextTask}
        onOpenAskNoevis={onOpenAskNoevis}
        onSwitchToLearn={onSwitchToLearn}
        hasNextTask={activeTaskIndex < totalTasks}
      />
    </div>
  );
};
