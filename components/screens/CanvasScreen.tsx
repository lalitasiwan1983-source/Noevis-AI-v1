'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { OnboardingData } from './OnboardingScreen';
import {
  Sparkles,
  BookOpen,
  Layers,
  Search,
  Upload,
  Plus,
  BarChart2,
  FileText,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

interface CanvasScreenProps {
  userEmail?: string;
  onboardingData?: Partial<OnboardingData>;
  onResetOnboarding?: () => void;
  onBackToHome?: () => void;
}

export const CanvasScreen: React.FC<CanvasScreenProps> = ({
  userEmail = 'learner@noevis.ai',
  onboardingData,
  onResetOnboarding,
  onBackToHome,
}) => {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'practice' | 'documents' | 'graph'>('all');

  const studyContext = onboardingData?.studyContext || 'College & University';
  const confidence = onboardingData?.confidenceLevel || 'Getting familiar';
  const ageGroup = onboardingData?.ageGroup || '18+';

  return (
    <div
      id="noevis-canvas-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] flex flex-col justify-between text-[#111827] select-none"
    >
      {/* Canvas Top Bar */}
      <header className="w-full h-[64px] sm:h-[68px] bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 sm:px-8 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div
            onClick={onBackToHome}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            title="Return to Home"
          >
            <Logo size="sm" variant="full" showBadge={false} />
          </div>
          <span className="hidden md:inline-block h-4 w-[1px] bg-[#E5E7EB]" />
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4B5BEA] bg-[#EEF0FF] px-2.5 py-1 rounded-full border border-[#DCE1FD]">
            <Sparkles className="w-3 h-3" /> Canvas Mode
          </span>
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs font-medium text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-2"
            >
              ← Back to Home
            </button>
          )}
        </div>

        {/* User Profile Context Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#4B5563]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Context: {studyContext}</span>
            <span className="text-[#9CA3AF]">•</span>
            <span>{confidence}</span>
          </div>

          {onResetOnboarding && (
            <button
              type="button"
              onClick={onResetOnboarding}
              className="p-2 text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer text-xs font-medium flex items-center gap-1.5"
              title="Reset Onboarding Setup"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset Context</span>
            </button>
          )}

          <div className="w-8 h-8 rounded-full bg-[#111827] text-white text-xs font-semibold flex items-center justify-center">
            {userEmail.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col items-stretch gap-8">
        {/* Context Space Creator Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto w-full pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] shadow-2xs text-xs font-medium text-[#374151] mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Learning Space Ready ({ageGroup} • {studyContext})</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight leading-tight mb-3">
            What are we learning today?
          </h1>

          <p className="text-sm sm:text-base text-[#667085] max-w-lg mb-6">
            Enter any concept, topic, or paste notes to build a dedicated context graph and interactive practice space.
          </p>

          {/* Unified Context Search & Input Box */}
          <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-3 sm:p-4 flex flex-col gap-3 focus-within:border-[#4B5BEA] focus-within:ring-1 focus-within:ring-[#4B5BEA] transition-all">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-[#9CA3AF] shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Backpropagation in neural networks, Linear algebra proofs..."
                className="w-full bg-transparent text-sm sm:text-base text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span>Attach PDF / Notes</span>
                </button>
              </div>

              <button
                type="button"
                className="px-5 py-2 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Create Context Space</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Workspace Quick Actions & Active Spaces */}
        <section className="w-full flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#4B5BEA]" />
              <h2 className="text-base font-semibold text-[#111827]">
                Recommended Context Spaces for You
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#EAECEF] p-1 rounded-lg text-xs font-medium text-[#4B5563]">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'all' ? 'bg-white text-[#111827] shadow-2xs font-semibold' : 'hover:text-[#111827]'
                }`}
              >
                All Spaces
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'practice' ? 'bg-white text-[#111827] shadow-2xs font-semibold' : 'hover:text-[#111827]'
                }`}
              >
                Practice
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('graph')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'graph' ? 'bg-white text-[#111827] shadow-2xs font-semibold' : 'hover:text-[#111827]'
                }`}
              >
                Concept Graphs
              </button>
            </div>
          </div>

          {/* Grid of Context Spaces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#4B5BEA]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#4B5BEA] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full border border-[#DCE1FD]">
                    Tailored for {studyContext}
                  </span>
                  <BookOpen className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4B5BEA] transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-[#4B5BEA] transition-colors">
                  Foundational Concepts & Proofs
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Interactive breakdowns calibrated for a &ldquo;{confidence}&rdquo; learning trajectory.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>12 Interactive Modules</span>
                <span className="font-medium text-[#111827] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#4B5BEA]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    Adaptive Practice
                  </span>
                  <BarChart2 className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#10B981] transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-[#10B981] transition-colors">
                  Diagnostic Problem Set
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Targeted questions that adapt explanations dynamically to your responses.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>5 Problems Ready</span>
                <span className="font-medium text-[#111827] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Start Practice <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#4B5BEA]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#6366F1] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full border border-[#C7D2FE]">
                    Visual Context Map
                  </span>
                  <Layers className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#6366F1] transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-[#6366F1] transition-colors">
                  Knowledge Graph Space
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Map interconnected ideas and track conceptual dependencies visually.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Interactive Node Graph</span>
                <span className="font-medium text-[#111827] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open Graph <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Canvas Footer */}
      <footer className="w-full h-12 bg-white border-t border-[#E5E7EB] px-8 flex items-center justify-between text-xs text-[#9CA3AF] shrink-0">
        <div>NOEVIS CANVAS • Adaptive Context Environment</div>
        <div className="flex items-center gap-4">
          <span>Age Group: {ageGroup}</span>
          <span>Context: {studyContext}</span>
        </div>
      </footer>
    </div>
  );
};
