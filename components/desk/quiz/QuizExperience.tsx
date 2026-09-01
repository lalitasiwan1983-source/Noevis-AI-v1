'use client';

import React, { useState, useMemo } from 'react';
import { QuizIntro } from './QuizIntro';
import { QuizHeader } from './QuizHeader';
import { QuizQuestionView } from './QuizQuestionView';
import { QuizAnswerFeedback } from './QuizAnswerFeedback';
import { QuizResultView } from './QuizResultView';
import { QUIZ_QUESTIONS } from './data';
import { QuizResultSummary, QuizQuestion } from './types';
import { DeskWorkspaceMode } from '../types';
import { useToast } from '@/components/design-system/Toast';

interface QuizExperienceProps {
  topicTitle?: string;
  chapterTitle?: string;
  currentConceptIndex?: number;
  onSwitchToLearn?: () => void;
  onOpenAskNoevis?: () => void;
  onChangeMode?: (mode: DeskWorkspaceMode) => void;
  onSelectConcept?: (conceptIndex: number) => void;
}

export const QuizExperience: React.FC<QuizExperienceProps> = ({
  topicTitle = 'Biology',
  chapterTitle = 'Chapter 6: Life Processes',
  currentConceptIndex = 1,
  onSwitchToLearn,
  onOpenAskNoevis,
  onChangeMode,
  onSelectConcept,
}) => {
  const { success, info } = useToast();

  // Quiz state machine: 'intro' | 'question' | 'result'
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Map of questionId -> selected Option IDs
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  // Map of questionId -> isSubmitted
  const [submissions, setSubmissions] = useState<Record<string, boolean>>({});

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex] || QUIZ_QUESTIONS[0];
  const selectedOptionIds = useMemo(() => {
    return answers[currentQuestion.id] || [];
  }, [answers, currentQuestion.id]);
  const isCurrentSubmitted = Boolean(submissions[currentQuestion.id]);

  // Compute correctness for the current question
  const isCurrentCorrect = useMemo(() => {
    if (!isCurrentSubmitted) return false;
    const correctOptionIds = currentQuestion.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);

    if (currentQuestion.type === 'multi-select') {
      const hasAllCorrect = correctOptionIds.every((id) => selectedOptionIds.includes(id));
      const hasNoIncorrect = selectedOptionIds.every((id) => correctOptionIds.includes(id));
      return hasAllCorrect && hasNoIncorrect;
    } else {
      return (
        selectedOptionIds.length === 1 &&
        correctOptionIds.includes(selectedOptionIds[0])
      );
    }
  }, [currentQuestion, selectedOptionIds, isCurrentSubmitted]);

  // Toggle option selection
  const handleToggleOption = (optionId: string) => {
    if (isCurrentSubmitted) return;

    if (currentQuestion.type === 'multi-select') {
      setAnswers((prev) => {
        const current = prev[currentQuestion.id] || [];
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, [currentQuestion.id]: next };
      });
    } else {
      // Single choice / True-False
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: [optionId],
      }));
    }
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOptionIds.length === 0) return;

    setSubmissions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));

    // Trigger toast
    const correctOptionIds = currentQuestion.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.id);

    let isCorrect = false;
    if (currentQuestion.type === 'multi-select') {
      isCorrect =
        correctOptionIds.every((id) => selectedOptionIds.includes(id)) &&
        selectedOptionIds.every((id) => correctOptionIds.includes(id));
    } else {
      isCorrect = selectedOptionIds.length === 1 && correctOptionIds.includes(selectedOptionIds[0]);
    }

    if (isCorrect) {
      success('Correct!', 'Accurate grasp of this biological mechanism.');
    } else {
      info('Concept Review', 'Check the explanation below to clarify the principle.');
    }
  };

  // Advance to next question or complete quiz
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('result');
      success('Quiz Completed', 'Review your concept mastery and personalized insights.');
    }
  };

  // Retake Quiz
  const handleRetakeQuiz = () => {
    setAnswers({});
    setSubmissions({});
    setCurrentQuestionIndex(0);
    setStep('question');
  };

  // Review a specific concept in Learn mode
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

  // Build Quiz Result Summary
  const summary: QuizResultSummary = useMemo(() => {
    let score = 0;
    const masteredMap: Record<string, number> = {};
    const reviewMap: Record<string, { conceptIndex: number; countWrong: number }> = {};

    QUIZ_QUESTIONS.forEach((q) => {
      const qSelected = answers[q.id] || [];
      const correctOptionIds = q.options.filter((opt) => opt.isCorrect).map((opt) => opt.id);

      let isCorrect = false;
      if (q.type === 'multi-select') {
        isCorrect =
          correctOptionIds.every((id) => qSelected.includes(id)) &&
          qSelected.every((id) => correctOptionIds.includes(id));
      } else {
        isCorrect = qSelected.length === 1 && correctOptionIds.includes(qSelected[0]);
      }

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

    // Generate intelligent Noevis diagnostic insight
    let noevisInsight = '';
    if (percentage === 100) {
      noevisInsight =
        'Exceptional mastery across all evaluated topics! You demonstrated precise recall of water photolysis in PS II, Calvin cycle stoichiometry (9 ATP / 6 NADPH), glycolytic net ATP yield, and chemiosmotic rotary catalysis.';
    } else if (percentage >= 80) {
      noevisInsight =
        'Strong conceptual foundation. You clearly understand the core electron pathways and respiratory machinery. Revisiting the flagged concept will solidify your remaining edge.';
    } else if (percentage >= 60) {
      noevisInsight =
        'You understand the high-level energetic principles well. Mistakes occurred mainly around stoichiometric ratios or fine-grained enzyme locations. A brief targeted review of the highlighted concepts will bridge the gap.';
    } else {
      noevisInsight =
        'You have an initial grasp of the cellular processes, but some core pathways (such as light reactions vs. dark reactions) are overlapping. Reviewing the interactive visual diagrams in Learn will give you a clear spatial model.';
    }

    return {
      score,
      totalQuestions,
      percentage,
      masteredConcepts,
      reviewConcepts,
      noevisInsight,
    };
  }, [answers, totalQuestions]);

  // STEP 1: INTRO
  if (step === 'intro') {
    return (
      <QuizIntro
        topicTitle={topicTitle}
        chapterTitle={chapterTitle}
        totalQuestions={totalQuestions}
        estimatedTime="5 min"
        onStartQuiz={() => setStep('question')}
        onSwitchToLearn={onSwitchToLearn}
        onOpenAskNoevis={onOpenAskNoevis}
      />
    );
  }

  // STEP 3: RESULT VIEW
  if (step === 'result') {
    return (
      <QuizResultView
        summary={summary}
        onRetakeQuiz={handleRetakeQuiz}
        onReviewConcept={handleReviewConcept}
        onOpenAskNoevis={onOpenAskNoevis}
        onChangeMode={onChangeMode}
      />
    );
  }

  // STEP 2: ACTIVE QUESTION VIEW
  return (
    <div
      id="desk-quiz-experience"
      className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8"
    >
      {/* 1. Header with subtle progress */}
      <QuizHeader
        currentQuestion={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onExitQuiz={() => setStep('intro')}
        onOpenAskNoevis={onOpenAskNoevis}
      />

      {/* 2. Focused Question Card */}
      <section
        id="quiz-active-question-card"
        className="p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-2xs space-y-6"
      >
        <QuizQuestionView
          question={currentQuestion}
          selectedOptionIds={selectedOptionIds}
          isSubmitted={isCurrentSubmitted}
          onToggleOption={handleToggleOption}
          onSubmitAnswer={handleSubmitAnswer}
        />
      </section>

      {/* 3. Feedback & Explanation Card (after submission) */}
      {isCurrentSubmitted && (
        <QuizAnswerFeedback
          question={currentQuestion}
          isCorrect={isCurrentCorrect}
          onNextQuestion={handleNextQuestion}
          onOpenAskNoevis={onOpenAskNoevis}
          onReviewConcept={handleReviewConcept}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
        />
      )}
    </div>
  );
};
