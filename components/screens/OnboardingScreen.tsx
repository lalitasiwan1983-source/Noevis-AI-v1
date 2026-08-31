'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { ArrowLeft, Check } from 'lucide-react';

export interface OnboardingData {
  ageGroup: string;
  studyContext: string;
  confidenceLevel: string;
  completedAt?: string;
}

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
  onBackToAuth: () => void;
  initialData?: Partial<OnboardingData>;
}

interface StepConfig {
  stepNumber: number;
  question: string;
  fieldKey: keyof OnboardingData;
  progressPercent: number;
  options: { id: string; label: string }[];
}

const STEPS: StepConfig[] = [
  {
    stepNumber: 1,
    question: 'How old are you?',
    fieldKey: 'ageGroup',
    progressPercent: 33.3,
    options: [
      { id: 'under-13', label: 'Under 13' },
      { id: '13-15', label: '13–15' },
      { id: '16-18', label: '16–18' },
      { id: '18-plus', label: '18+' },
    ],
  },
  {
    stepNumber: 2,
    question: 'What are you learning?',
    fieldKey: 'studyContext',
    progressPercent: 66.6,
    options: [
      { id: 'school', label: 'School' },
      { id: 'college', label: 'College' },
      { id: 'skills', label: 'Skills' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    stepNumber: 3,
    question: 'How well do you know it?',
    fieldKey: 'confidenceLevel',
    progressPercent: 100,
    options: [
      { id: 'just-starting', label: 'Just starting' },
      { id: 'a-little', label: 'A little' },
      { id: 'pretty-well', label: 'Pretty well' },
      { id: 'challenge-me', label: 'Challenge me' },
    ],
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onBackToAuth,
  initialData,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [answers, setAnswers] = useState<OnboardingData>({
    ageGroup: initialData?.ageGroup || '',
    studyContext: initialData?.studyContext || '',
    confidenceLevel: initialData?.confidenceLevel || '',
  });

  const currentStep = STEPS[currentStepIndex];
  const currentSelectedValue = answers[currentStep.fieldKey] || '';

  const handleSelectOption = (optionLabel: string) => {
    if (isAdvancing) return;

    // 1. Immediately apply selected state
    const newAnswers = {
      ...answers,
      [currentStep.fieldKey]: optionLabel,
    };
    setAnswers(newAnswers);
    setIsAdvancing(true);

    try {
      localStorage.setItem('noevis_onboarding_draft', JSON.stringify(newAnswers));
    } catch {
      // Ignore quota error if restricted
    }

    // 2. Wait 120ms for visual feedback, then auto-advance
    setTimeout(() => {
      if (currentStepIndex < STEPS.length - 1) {
        setDirection(1);
        setCurrentStepIndex((prev) => prev + 1);
        setIsAdvancing(false);
      } else {
        // Step 3 selected -> Save & immediately complete directly into Canvas
        const finalData: OnboardingData = {
          ...newAnswers,
          completedAt: new Date().toISOString(),
        };
        try {
          localStorage.setItem('noevis_onboarding_data', JSON.stringify(finalData));
          localStorage.setItem('noevis_onboarding_completed', 'true');
          localStorage.removeItem('noevis_onboarding_draft');
        } catch {
          // ignore
        }
        onComplete(finalData);
      }
    }, 120);
  };

  const handleBack = () => {
    if (isAdvancing) return;

    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      onBackToAuth();
    }
  };

  const slideVariants = {
    enter: (dir: number) => (shouldReduceMotion ? { opacity: 0 } : { x: dir > 0 ? 20 : -20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => (shouldReduceMotion ? { opacity: 0 } : { x: dir > 0 ? -20 : 20, opacity: 0 }),
  };

  return (
    <div
      id="noevis-onboarding-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between overflow-x-hidden select-none"
    >
      {/* 1. Header: Back Arrow (Left) & Centered NOEVIS AI Logo */}
      <header className="w-full h-[52px] sm:h-[64px] md:h-[72px] bg-transparent px-4 sm:px-8 md:px-12 flex items-center justify-between shrink-0 z-30 pt-safe">
        {/* Left: Back Arrow Button (min 44x44px touch target) */}
        <button
          type="button"
          onClick={handleBack}
          className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-[#111827] hover:bg-[#EAECEF] active:bg-[#E2E5E9] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
          aria-label={currentStepIndex === 0 ? 'Back to authentication' : `Back to Step ${currentStepIndex}`}
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Center: Small NOEVIS AI Logo */}
        <div className="flex items-center justify-center pr-9 sm:pr-0">
          <Logo size="xs" variant="full" showBadge={false} />
        </div>

        {/* Right: Empty spacer for visual symmetry */}
        <div className="w-11 hidden sm:block" aria-hidden="true" />
      </header>

      {/* 2. Thin Horizontal Progress Bar (Under the Header) */}
      <div className="w-full flex justify-center px-5 sm:px-8 shrink-0 py-1">
        <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] h-[2.5px] bg-[#E5E7EB] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#111111] rounded-full"
            initial={{ width: `${STEPS[0].progressPercent}%` }}
            animate={{ width: `${currentStep.progressPercent}%` }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* 3. Main Content Area (Optically Centered, Max Content Width 600-640px) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-8 my-auto">
        <div className="w-full max-w-[580px] md:max-w-[620px] lg:max-w-[640px] flex flex-col items-stretch text-center -translate-y-3 sm:-translate-y-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep.stepNumber}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              {/* Question Headline */}
              <h1
                id="onboarding-question"
                className="text-[32px] sm:text-[40px] md:text-[46px] font-bold text-[#111111] tracking-[-0.035em] leading-[1.1] mb-8 sm:mb-10 md:mb-12 max-w-[620px]"
              >
                {currentStep.question}
              </h1>

              {/* Option Cards Stack (Vertical, 10-12px gap) */}
              <div
                id="onboarding-options-container"
                role="radiogroup"
                aria-label={currentStep.question}
                className="w-full flex flex-col gap-2.5 sm:gap-3"
              >
                {currentStep.options.map((option) => {
                  const isSelected = currentSelectedValue === option.label;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(option.label)}
                      className={`w-full h-[56px] sm:h-[62px] md:h-[66px] px-5 sm:px-6 rounded-[14px] text-left flex items-center justify-between transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] ${
                        isSelected
                          ? 'bg-[#EEF0FF] border border-[#4B5BEA] text-[#111827] shadow-2xs'
                          : 'bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB] text-[#111827]'
                      }`}
                    >
                      <span className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em]">
                        {option.label}
                      </span>

                      {/* Subtle Selection Indicator */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#4B5BEA] text-white scale-100'
                            : 'border border-[#D1D5DB] bg-transparent opacity-30 group-hover:opacity-60'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. Footer Clearance */}
      <footer className="w-full pb-6 px-5 shrink-0" aria-hidden="true" />
    </div>
  );
};
