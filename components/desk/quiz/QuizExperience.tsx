'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { QuizHeader } from './QuizHeader';
import { QuizQuestionView } from './QuizQuestionView';
import { QuizResultView } from './QuizResultView';
import { getQuizQuestionsForSource } from './data';
import { QuizResultSummary, QuizQuestion } from './types';
import { DeskWorkspaceMode } from '../types';

interface QuizExperienceProps {
  topicTitle?: string;
  chapterTitle?: string;
  currentConceptIndex?: number;
  sourceName?: string;
  conceptTitle?: string;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
  onSelectConcept?: (conceptIndex: number) => void;
}

export const QuizExperience: React.FC<QuizExperienceProps> = ({
  topicTitle = 'Biology',
  chapterTitle = 'Chapter 6: Life Processes',
  currentConceptIndex = 1,
  sourceName,
  conceptTitle,
  onSwitchToLearn,
  onOpenAskNoevis,
  onChangeMode,
  onSelectConcept,
}) => {
  // 1. Resolve source-aware question bank (10 questions, 4 options each)
  const questions: QuizQuestion[] = useMemo(() => {
    return getQuizQuestionsForSource(sourceName, conceptTitle, topicTitle);
  }, [sourceName, conceptTitle, topicTitle]);

  const totalQuestions = questions.length;

  // 2. Active quiz state: question index, current answer, answers history
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // Map of questionId -> selectedOptionId
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  // Selected option for the current question
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  // Smooth question transition flag
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Synchronize current selection when question index changes
  useEffect(() => {
    setSelectedOptionId(userAnswers[currentQuestion.id] || null);
  }, [currentQuestionIndex, currentQuestion.id, userAnswers]);

  // Handle option selection
  const handleSelectOption = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  // Advance to next question or complete quiz
  const handleNextQuestion = useCallback(() => {
    if (!selectedOptionId) return;

    // 1. Lock answer silently
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOptionId,
    }));

    if (isLastQuestion) {
      // Transition to result view
      setIsTransitioning(true);
      setTimeout(() => {
        setIsCompleted(true);
        setIsTransitioning(false);
      }, 200);
    } else {
      // Trigger subtle content transition
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [selectedOptionId, currentQuestion.id, isLastQuestion]);

  // Keyboard navigation support: Arrow Up/Down, 1-4, A-D, Space, Enter
  useEffect(() => {
    if (isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent taking actions if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const options = currentQuestion.options;
      const currentIndex = options.findIndex((opt) => opt.id === selectedOptionId);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        handleSelectOption(options[nextIndex].id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        handleSelectOption(options[prevIndex].id);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (options[idx]) {
          e.preventDefault();
          handleSelectOption(options[idx].id);
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const letter = e.key.toUpperCase();
        const opt = options.find((o) => o.letter.toUpperCase() === letter);
        if (opt) {
          e.preventDefault();
          handleSelectOption(opt.id);
        }
      } else if (e.key === 'Enter') {
        if (selectedOptionId) {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCompleted, currentQuestion, selectedOptionId, handleSelectOption, handleNextQuestion]);

  // Retake quiz from question 1
  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setSelectedOptionId(null);
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Review a specific concept in Learn
  const handleReviewConcept = (conceptIdx: number) => {
    if (onSelectConcept) {
      onSelectConcept(conceptIdx);
    }
    if (onChangeMode) {
      onChangeMode('learn');
    } else if (onSwitchToLearn) {
      onSwitchToLearn();
    }
  };

  // Generate result summary when completed
  const summary: QuizResultSummary = useMemo(() => {
    let score = 0;
    const masteredMap: Record<string, number> = {};
    const reviewMap: Record<string, { conceptIndex: number; countWrong: number }> = {};

    questions.forEach((q) => {
      const chosenId = userAnswers[q.id];
      const correctOpt = q.options.find((opt) => opt.isCorrect);
      const isCorrect = chosenId && correctOpt && chosenId === correctOpt.id;

      if (isCorrect) {
        score += 1;
        masteredMap[q.conceptTag] = q.conceptIndex;
      } else {
        if (!reviewMap[q.conceptTag]) {
          reviewMap[q.conceptTag] = { conceptIndex: q.conceptIndex, countWrong: 1 };
        } else {
          reviewMap[q.conceptTag].countWrong += 1;
        }
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    const masteredConcepts = Object.entries(masteredMap).map(([name, conceptIndex]) => ({
      name,
      conceptIndex,
    }));

    const reviewConcepts = Object.entries(reviewMap).map(([name, data]) => ({
      name,
      conceptIndex: data.conceptIndex,
      countWrong: data.countWrong,
    }));

    let noevisInsight = '';
    if (percentage === 100) {
      noevisInsight =
        'Flawless mastery! You demonstrated precise conceptual recall and accurate reasoning across all evaluated concepts with zero misconceptions.';
    } else if (percentage >= 80) {
      noevisInsight =
        'Strong conceptual foundation. You clearly understand the core principles. Reviewing the flagged concept will solidify your remaining edge.';
    } else if (percentage >= 60) {
      noevisInsight =
        'Good grasp of high-level concepts. Several intermediate details or mechanisms need reinforcement. A targeted review of the highlighted concepts in Learn will solidify these connections.';
    } else {
      noevisInsight =
        'Foundational knowledge is forming. Reviewing the structured walkthrough in Learn will clarify the underlying principles and terminology.';
    }

    return {
      score,
      totalQuestions,
      percentage,
      masteredConcepts,
      reviewConcepts,
      noevisInsight,
      questions,
      userAnswers,
    };
  }, [questions, userAnswers, totalQuestions]);

  // RESULT VIEW
  if (isCompleted) {
    return (
      <div id="desk-quiz-container" className="w-full h-full flex flex-col min-h-0 overflow-y-auto">
        <QuizResultView
          summary={summary}
          onRetakeQuiz={handleRetakeQuiz}
          onReviewConcept={handleReviewConcept}
          onChangeMode={onChangeMode}
        />
      </div>
    );
  }

  // ACTIVE ASSESSMENT SCREEN (Fixed Viewport, No Page Scroll)
  return (
    <div
      id="desk-quiz-container"
      className="w-full h-full flex flex-col justify-between min-h-0 overflow-hidden px-4 sm:px-6 py-4 sm:py-5"
    >
      <div className="w-full max-w-[800px] mx-auto h-full flex flex-col justify-between min-h-0">
        {/* 1. Header with soft amber Quiz icon and thin progress line */}
        <QuizHeader
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />

        {/* 2. Active Question Workspace & Options & Next CTA */}
        <div className="flex-1 flex flex-col min-h-0 justify-center my-auto py-2">
          <QuizQuestionView
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={isLastQuestion}
            isTransitioning={isTransitioning}
          />
        </div>
      </div>
    </div>
  );
};
