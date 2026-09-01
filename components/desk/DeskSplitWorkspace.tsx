'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Layers,
  HelpCircle,
  Bell,
  Sliders,
  Target,
  HelpCircle as QuestionIcon,
  Copy,
  FileText,
  Clock,
  Notebook,
  ChevronRight,
  MoreVertical,
  Sparkles,
  Paperclip,
  Send,
  Check,
  ChevronLeft,
  ArrowRight,
  X,
  RotateCcw,
} from 'lucide-react';
import { DeskContextData, DeskWorkspaceMode } from './types';
import { LearnExperience } from './learn';
import { PracticeExperience } from './practice';
import { QuizExperience } from './quiz';
import { ReviewExperience } from './review';
import { NotesExperience, DeskNote } from './notes';
import { MoreCapabilityView, MoreToolId } from './more';
import { useToast } from '@/components/design-system/Toast';

interface DeskSplitWorkspaceProps {
  contextData: DeskContextData;
  activeMode: DeskWorkspaceMode;
  onChangeMode: (mode: DeskWorkspaceMode) => void;
  conceptIndex: number;
  totalConcepts: number;
  onNextConcept: () => void;
  onPrevConcept: () => void;
  onSelectConcept: (index: number) => void;
  onOpenAskNoevis: () => void;
  onOpenReference: () => void;
  note: DeskNote;
  onNoteChange: (note: DeskNote) => void;
  onBackToHome?: () => void;
  userEmail?: string;
}

export const DeskSplitWorkspace: React.FC<DeskSplitWorkspaceProps> = ({
  contextData,
  activeMode,
  onChangeMode,
  conceptIndex,
  totalConcepts,
  onNextConcept,
  onPrevConcept,
  onSelectConcept,
  onOpenAskNoevis,
  onOpenReference,
  note,
  onNoteChange,
  onBackToHome,
  userEmail = 'learner@noevis.ai',
}) => {
  const { success, info } = useToast();

  // Active Tool state inside Desk Right Panel (null = 6-tools main overview)
  const [activeTool, setActiveTool] = useState<MoreToolId | 'practice' | 'quiz' | 'review' | 'notes' | 'flashcards' | null>(null);

  // Ask Noevis inline chat state
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [isAiReplying, setIsAiReplying] = useState(false);

  // Mobile Active Tab: 'learn' | 'desk'
  const [mobileTab, setMobileTab] = useState<'learn' | 'desk'>('learn');

  const handleSendInlineChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isAiReplying) return;

    const userText = chatMessage.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');
    setIsAiReplying(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `In ${contextData.currentConcept}, ${userText.toLowerCase().includes('example') ? 'an applied example is how leaves absorb red and blue wavelengths while reflecting green light.' : 'the core reaction transforms photons and carbon dioxide into chemical energy stored in sugar bonds.'}`,
        },
      ]);
      setIsAiReplying(false);
    }, 900);
  };

  const handleToolClick = (toolKey: 'practice' | 'quiz' | 'flashcards' | 'summary' | 'review' | 'notes') => {
    if (toolKey === 'practice') {
      setActiveTool('practice');
      onChangeMode('practice');
    } else if (toolKey === 'quiz') {
      setActiveTool('quiz');
      onChangeMode('quiz');
    } else if (toolKey === 'review') {
      setActiveTool('review');
      onChangeMode('review');
    } else if (toolKey === 'notes') {
      setActiveTool('notes');
      onChangeMode('notes');
    } else if (toolKey === 'flashcards') {
      setActiveTool('flashcards');
      onChangeMode('more');
    } else if (toolKey === 'summary') {
      setActiveTool('summary');
      onChangeMode('more');
    }
  };

  const userInitials = userEmail.substring(0, 2).toUpperCase() || 'SY';

  return (
    <div id="noevis-unified-workspace" className="flex h-screen w-screen bg-[#F8F9FA] text-[#111827] overflow-hidden font-sans">
      {/* 1. FAR LEFT NAVIGATION RAIL */}
      <aside className="w-14 sm:w-16 h-full bg-[#FFFFFF] border-r border-[#E5E7EB] flex flex-col items-center py-4 justify-between shrink-0 z-20">
        <div className="flex flex-col items-center gap-6">
          {/* Logo Mark */}
          <button
            type="button"
            onClick={onBackToHome}
            className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#4F46E5] hover:bg-[#6366F1]/20 transition-all cursor-pointer"
            title="Return to Home"
            aria-label="Noevis AI logo"
          >
            <Sparkles className="w-5 h-5 text-[#4F46E5] fill-[#4F46E5]/20" />
          </button>

          {/* Navigation Items */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTool(null);
                onChangeMode('learn');
                setMobileTab('learn');
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeMode === 'learn' && !activeTool
                  ? 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#4F46E5] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
              title="Learn Workspace"
              aria-label="Learn Workspace"
            >
              <BookOpen className="w-5 h-5 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTool(null);
                setMobileTab('desk');
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                mobileTab === 'desk' || activeTool
                  ? 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#4F46E5] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              }`}
              title="Desk Tools"
              aria-label="Desk Tools"
            >
              <Layers className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Bottom Rail Actions */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onOpenReference}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all cursor-pointer"
            title="Reference Material"
            aria-label="Reference Material"
          >
            <Sliders className="w-4.5 h-4.5 stroke-[1.8]" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* 2. GLOBAL TOP HEADER */}
        <header className="h-14 sm:h-16 w-full bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-bold text-base sm:text-lg text-[#111827] tracking-tight shrink-0">
              Noevis AI
            </span>
            <span className="text-[#D1D5DB] font-light">/</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563] truncate font-medium">
              <span>{contextData.topic}</span>
              <span className="text-[#9CA3AF]">/</span>
              <span className="text-[#111827] font-semibold truncate">{contextData.deskTitle.replace('Biology: ', '')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Help Button */}
            <button
              type="button"
              onClick={onOpenAskNoevis}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs"
              title="Help & AI Guide"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => info('No new notifications')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111827] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
              {userInitials}
            </div>
          </div>
        </header>

        {/* Mobile Tab Toggle Bar (visible < lg screens) */}
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-2 flex items-center justify-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('learn')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'learn'
                ? 'bg-[#111827] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
            }`}
          >
            LEARN
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('desk')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'desk'
                ? 'bg-[#111827] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
            }`}
          >
            DESK
          </button>
        </div>

        {/* 3. SPLIT WORKSPACE BODY (50 / 50) */}
        <main className="flex-1 overflow-hidden p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-[1600px] w-full mx-auto">
          {/* ==================================================== */}
          {/* LEFT PANEL = LEARN                                   */}
          {/* ==================================================== */}
          <section
            id="workspace-panel-learn"
            className={`bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-2xs flex flex-col h-full overflow-hidden p-4 sm:p-6 space-y-4 ${
              mobileTab === 'desk' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 shrink-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#111827] uppercase tracking-wider">
                  LEARN
                </h2>
                <p className="text-xs text-[#6B7280]">Understanding your content</p>
              </div>

              {/* Top Progress bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#111827]">
                  {Math.round((conceptIndex / totalConcepts) * 100)}% complete
                </span>
                <div className="w-20 sm:w-28 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6366F1] rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((conceptIndex / totalConcepts) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-5">
              {/* Concept Title & Meta */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  {contextData.currentConcept}
                </h1>
                <p className="text-xs font-medium text-[#6B7280] mt-1">
                  Concept {conceptIndex} of {totalConcepts} • Chapter: {contextData.topic} - Plant Biology
                </p>
              </div>

              {/* Main Content + Diagram Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="space-y-3 text-xs sm:text-sm text-[#374151] leading-relaxed">
                  <h3 className="font-bold text-[#111827] text-sm sm:text-base">
                    How plants convert light into energy
                  </h3>
                  <p>
                    Photosynthesis is the process plants use to capture light energy from the sun and convert it into chemical energy.
                  </p>
                  <p>
                    This energy is stored in glucose, which fuels the plant&apos;s growth and other vital functions.
                  </p>
                </div>

                {/* Clean Diagram Illustration */}
                <div className="bg-[#FAFAFB] rounded-xl border border-[#E5E7EB] p-4 flex flex-col items-center justify-center text-center space-y-3 relative min-h-[190px]">
                  <div className="flex items-center justify-around w-full text-[11px] font-semibold text-[#4B5563]">
                    <div className="flex items-center gap-1 text-[#D97706]">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                      Sunlight
                    </div>
                    <div className="text-[#6B7280]">CO₂</div>
                  </div>

                  {/* Chloroplast Visual */}
                  <div className="w-28 h-20 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] flex flex-col items-center justify-center relative p-2 shadow-2xs">
                    <div className="w-16 h-8 rounded-full bg-[#22C55E] border border-[#16A34A] flex items-center justify-center text-[10px] font-bold text-white shadow-2xs">
                      Calvin cycle
                    </div>
                    <span className="text-[9px] font-medium text-[#166534] mt-1">Chloroplast</span>
                  </div>

                  <div className="flex items-center justify-around w-full text-[11px] font-semibold">
                    <span className="text-[#2563EB]">H₂O</span>
                    <span className="text-[#9333EA]">Glucose</span>
                    <span className="text-[#EF4444]">Oxygen</span>
                  </div>
                </div>
              </div>

              {/* Key Points Section */}
              <div className="pt-2 border-t border-[#F3F4F6] space-y-2.5">
                <h4 className="font-bold text-xs sm:text-sm text-[#111827]">Key points</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#374151]">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Light reactions capture sunlight in the thylakoid membranes and produce ATP and NADPH.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>The Calvin cycle uses ATP and NADPH to convert CO₂ into glucose in the stroma.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Oxygen is released as a byproduct from the splitting of water during the light reactions.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Concept Navigation Footer */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={onPrevConcept}
                disabled={conceptIndex <= 1}
                className="h-8 px-3 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-[#374151] flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous concept</span>
              </button>

              <span className="text-xs font-medium text-[#6B7280]">
                {conceptIndex} of {totalConcepts}
              </span>

              <button
                type="button"
                onClick={onNextConcept}
                disabled={conceptIndex >= totalConcepts}
                className="h-8 px-3 rounded-lg border border-[#6366F1]/30 bg-[#FFFFFF] hover:bg-[#EEF2FF] text-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Next concept</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Session Progress */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#6B7280] shrink-0">
              <span>Learning progress</span>
              <span className="font-semibold text-[#111827]">
                {Math.round((conceptIndex / totalConcepts) * 100)}% complete
              </span>
            </div>
          </section>

          {/* ==================================================== */}
          {/* RIGHT PANEL = DESK                                   */}
          {/* ==================================================== */}
          <section
            id="workspace-panel-desk"
            className={`bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] shadow-2xs flex flex-col h-full overflow-hidden p-4 sm:p-6 space-y-4 ${
              mobileTab === 'learn' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* If an active tool is opened inside Desk panel */}
            {activeTool ? (
              <div className="flex flex-col h-full overflow-hidden space-y-3">
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTool(null);
                      onChangeMode('learn');
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Desk Tools</span>
                  </button>

                  <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                    {activeTool}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {activeTool === 'practice' && (
                    <PracticeExperience
                      currentConceptIndex={conceptIndex}
                      onSwitchToLearn={() => {
                        setActiveTool(null);
                        onChangeMode('learn');
                      }}
                      onOpenAskNoevis={onOpenAskNoevis}
                      onChangeMode={onChangeMode}
                    />
                  )}

                  {activeTool === 'quiz' && (
                    <QuizExperience
                      topicTitle={contextData.topic}
                      chapterTitle={contextData.chapter}
                      currentConceptIndex={conceptIndex}
                      onSwitchToLearn={() => {
                        setActiveTool(null);
                        onChangeMode('learn');
                      }}
                      onOpenAskNoevis={onOpenAskNoevis}
                      onChangeMode={onChangeMode}
                    />
                  )}

                  {activeTool === 'review' && (
                    <ReviewExperience
                      topicTitle={contextData.topic}
                      chapterTitle={contextData.chapter}
                      onSwitchMode={onChangeMode}
                      onSelectConcept={onSelectConcept}
                      onOpenAskNoevis={onOpenAskNoevis}
                    />
                  )}

                  {activeTool === 'notes' && (
                    <NotesExperience
                      topicTitle={contextData.topic}
                      chapterTitle={contextData.chapter}
                      conceptName={contextData.currentConcept}
                      conceptIndex={conceptIndex}
                      initialNote={note}
                      onNoteChange={onNoteChange}
                      onOpenAskNoevis={onOpenAskNoevis}
                    />
                  )}

                  {(activeTool === 'flashcards' || activeTool === 'summary') && (
                    <MoreCapabilityView
                      toolId={activeTool === 'flashcards' ? 'study_aid' : activeTool}
                      topic={contextData.topic}
                      chapter={contextData.chapter}
                      conceptName={contextData.currentConcept}
                      conceptIndex={conceptIndex}
                      onBack={() => {
                        setActiveTool(null);
                        onChangeMode('learn');
                      }}
                      onOpenAskNoevis={onOpenAskNoevis}
                      onOpenReference={onOpenReference}
                    />
                  )}
                </div>
              </div>
            ) : (
              /* 6-TOOLS MAIN DESK OVERVIEW */
              <div className="flex flex-col h-full overflow-y-auto justify-between space-y-5 pr-1">
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 shrink-0">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#111827] uppercase tracking-wider">
                      DESK
                    </h2>
                    <p className="text-xs text-[#6B7280]">Tools & Actions</p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenReference}
                    className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer"
                    title="Desk options"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>

                {/* 6 TOOLS GRID (2 columns x 3 rows) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                  {/* 1. Practice */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('practice')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                        <Target className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Practice</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>

                  {/* 2. Quiz */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('quiz')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                        <QuestionIcon className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Quiz</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>

                  {/* 3. Flashcards */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('flashcards')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                        <Copy className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Flashcards</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>

                  {/* 4. Summary */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('summary')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center shrink-0">
                        <FileText className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Summary</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>

                  {/* 5. Review */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('review')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Review</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>

                  {/* 6. Notes */}
                  <button
                    type="button"
                    onClick={() => handleToolClick('notes')}
                    className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-3.5 flex items-center justify-between hover:border-[#D1D5DB] hover:shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                        <Notebook className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-sm text-[#111827]">Notes</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                  </button>
                </div>

                {/* YOUR WORK SECTION */}
                <div className="space-y-2 shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#111827]">Your Work</h3>
                    <button
                      type="button"
                      onClick={() => handleToolClick('notes')}
                      className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>View all</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] divide-y divide-[#F3F4F6] overflow-hidden text-left">
                    {/* Item 1 */}
                    <div
                      onClick={() => handleToolClick('quiz')}
                      className="p-3 flex items-center justify-between hover:bg-[#FAFAFB] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
                          <QuestionIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-[#111827]">Quiz — Photosynthesis</p>
                          <p className="text-[11px] text-[#6B7280]">10 questions • Created today</p>
                        </div>
                      </div>
                      <button type="button" className="text-[#9CA3AF] hover:text-[#111827] p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item 2 */}
                    <div
                      onClick={() => handleToolClick('flashcards')}
                      className="p-3 flex items-center justify-between hover:bg-[#FAFAFB] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                          <Copy className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-[#111827]">Flashcards — Photosynthesis</p>
                          <p className="text-[11px] text-[#6B7280]">18 cards • Created today</p>
                        </div>
                      </div>
                      <button type="button" className="text-[#9CA3AF] hover:text-[#111827] p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item 3 */}
                    <div
                      onClick={() => handleToolClick('summary')}
                      className="p-3 flex items-center justify-between hover:bg-[#FAFAFB] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F0FDFA] text-[#0D9488] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-[#111827]">Summary — Light Reactions</p>
                          <p className="text-[11px] text-[#6B7280]">5 min read • Created yesterday</p>
                        </div>
                      </div>
                      <button type="button" className="text-[#9CA3AF] hover:text-[#111827] p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CONTEXTUAL AI CHAT (Ask Noevis) */}
                <div className="space-y-2 pt-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#374151]">
                    <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Chatting in: <strong className="font-bold text-[#111827]">{contextData.topic} — Concept {conceptIndex}</strong></span>
                  </div>

                  {/* Recent messages preview if any */}
                  {chatHistory.length > 0 && (
                    <div className="max-h-28 overflow-y-auto space-y-1.5 p-2 bg-[#FAFAFB] rounded-xl border border-[#E5E7EB] text-xs">
                      {chatHistory.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-1.5 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-[#111827] text-white ml-auto max-w-[85%] text-right font-medium'
                              : 'bg-white border border-[#E5E7EB] text-[#374151] mr-auto max-w-[90%]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                      {isAiReplying && (
                        <div className="text-[11px] text-[#6B7280] italic animate-pulse">
                          Noevis is reasoning...
                        </div>
                      )}
                    </div>
                  )}

                  {/* Input Box */}
                  <form
                    onSubmit={handleSendInlineChat}
                    className="bg-[#FFFFFF] border border-[#E5E7EB] focus-within:border-[#111827] rounded-xl p-2.5 shadow-2xs space-y-2 transition-all"
                  >
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask Noevis..."
                      className="w-full bg-transparent text-xs sm:text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                    />

                    <div className="flex items-center justify-between pt-1 border-t border-[#F3F4F6]">
                      <button
                        type="button"
                        onClick={onOpenReference}
                        className="text-xs font-medium text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Add source</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </button>

                      <button
                        type="submit"
                        disabled={!chatMessage.trim() || isAiReplying}
                        className="w-8 h-8 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#E5E7EB] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                        title="Send message"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
