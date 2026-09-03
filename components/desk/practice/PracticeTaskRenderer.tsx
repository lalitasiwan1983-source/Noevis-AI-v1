'use client';

import React from 'react';
import { PracticeTask } from './types';
import { PracticeSequenceTask } from './PracticeSequenceTask';
import { PracticeVisualHotspotTask } from './PracticeVisualHotspotTask';
import { PracticeScenarioTask } from './PracticeScenarioTask';
import { PracticeMatchingTask } from './PracticeMatchingTask';
import { PracticeShortAnswerTask } from './PracticeShortAnswerTask';
import { PracticeMultipleChoiceTask } from './PracticeMultipleChoiceTask';
import { PracticeNumericTask } from './PracticeNumericTask';
import { PracticeCodeTask } from './PracticeCodeTask';

interface PracticeTaskRendererProps {
  task: PracticeTask;
  resetKey: number;
  isSubmitted: boolean;
  onCheckAnswer: (isCorrect: boolean) => void;
  onReset: () => void;
}

export const PracticeTaskRenderer: React.FC<PracticeTaskRendererProps> = ({
  task,
  resetKey,
  isSubmitted,
  onCheckAnswer,
  onReset,
}) => {
  switch (task.taskType) {
    case 'sequence':
      if (!task.sequenceData) return null;
      return (
        <PracticeSequenceTask
          key={`seq-${task.id}-${resetKey}`}
          items={task.sequenceData.items}
          startLabel={task.sequenceData.startLabel}
          endLabel={task.sequenceData.endLabel}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
          onReset={onReset}
        />
      );

    case 'visual-hotspot':
      if (!task.hotspotData) return null;
      return (
        <PracticeVisualHotspotTask
          key={`hot-${task.id}-${resetKey}`}
          diagramTitle={task.hotspotData.diagramTitle}
          diagramSubtitle={task.hotspotData.diagramSubtitle}
          targets={task.hotspotData.targets}
          tokens={task.hotspotData.tokens}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
          onReset={onReset}
        />
      );

    case 'scenario':
      if (!task.scenarioData) return null;
      return (
        <PracticeScenarioTask
          key={`scen-${task.id}-${resetKey}`}
          story={task.scenarioData.story}
          question={task.scenarioData.question}
          options={task.scenarioData.options}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
          onReset={onReset}
        />
      );

    case 'matching':
      if (!task.matchingData) return null;
      return (
        <PracticeMatchingTask
          key={`match-${task.id}-${resetKey}`}
          leftTitle={task.matchingData.leftTitle}
          rightTitle={task.matchingData.rightTitle}
          pairs={task.matchingData.pairs}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
          onReset={onReset}
        />
      );

    case 'short-answer':
      if (!task.shortAnswerData) return null;
      return (
        <PracticeShortAnswerTask
          key={`short-${task.id}-${resetKey}`}
          data={task.shortAnswerData}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
        />
      );

    case 'multiple-choice':
      if (!task.multipleChoiceData) return null;
      return (
        <PracticeMultipleChoiceTask
          key={`mc-${task.id}-${resetKey}`}
          data={task.multipleChoiceData}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
        />
      );

    case 'numeric':
      if (!task.numericData) return null;
      return (
        <PracticeNumericTask
          key={`num-${task.id}-${resetKey}`}
          data={task.numericData}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
        />
      );

    case 'code':
      if (!task.codeData) return null;
      return (
        <PracticeCodeTask
          key={`code-${task.id}-${resetKey}`}
          data={task.codeData}
          isSubmitted={isSubmitted}
          onCheckAnswer={onCheckAnswer}
        />
      );

    default:
      return null;
  }
};
