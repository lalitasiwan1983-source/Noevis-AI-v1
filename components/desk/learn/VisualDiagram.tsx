'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  Sun,
  Droplets,
  BatteryCharging,
  Cpu,
  RotateCw,
  Info,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { LearnConceptData, DiagramStep } from './types';

interface VisualDiagramProps {
  concept: LearnConceptData;
  activeStepIndex: number;
  onStepChange: (index: number) => void;
}

export const VisualDiagram: React.FC<VisualDiagramProps> = ({
  concept,
  activeStepIndex,
  onStepChange,
}) => {
  const [viewMode, setViewMode] = useState<'mechanism' | 'analogy'>('mechanism');
  const currentStep: DiagramStep = concept.diagram.steps[activeStepIndex] || concept.diagram.steps[0];

  return (
    <section
      id="learn-visual-diagram-section"
      className="w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      {/* Diagram Top Bar */}
      <div className="px-5 sm:px-7 py-4 border-b border-[#E5E7EB] bg-[#FAFAFB] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
            <Eye className="w-4 h-4 text-[#111827]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight">
              {concept.diagram.title}
            </h3>
            <p className="text-xs text-[#667085] hidden sm:block">
              {concept.diagram.subtitle}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]/60">
          <button
            type="button"
            onClick={() => setViewMode('mechanism')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'mechanism'
                ? 'bg-[#FFFFFF] text-[#111827] shadow-2xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Molecular Flow
          </button>
          <button
            type="button"
            onClick={() => setViewMode('analogy')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'analogy'
                ? 'bg-[#FFFFFF] text-[#111827] shadow-2xs'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Real-World Analogy
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas Area */}
      <div className="p-5 sm:p-7 lg:p-8 flex flex-col items-center">
        {/* Step Progression Selector Tabs */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {concept.diagram.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepChange(idx)}
                className={`flex-1 min-w-[130px] sm:min-w-[150px] p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#111827] bg-[#F9FAFB] shadow-2xs ring-1 ring-[#111827]/10'
                    : 'border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-[#111827] text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
                    }`}
                  >
                    Stage {step.number}
                  </span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />}
                </div>
                <div className="text-xs sm:text-[13px] font-semibold text-[#111827] truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Graphic Area */}
        <div className="w-full relative min-h-[260px] sm:min-h-[300px] rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle Grid dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#D1D5DB_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {viewMode === 'mechanism' ? (
            /* MECHANISM VIEW */
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
              {/* Concept Specific Interactive Visual Nodes */}
              {concept.index === 1 && (
                <div className="w-full flex flex-col gap-4">
                  {/* Visual Pathway Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                    {/* Node 1: PS II */}
                    <div
                      onClick={() => onStepChange(0)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 0
                          ? 'bg-white border-[#111827] shadow-sm scale-102'
                          : 'bg-white/80 border-[#E5E7EB] hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-2">
                        <Sun className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#111827]">PS II (P680)</span>
                      <span className="text-[10px] text-[#6B7280] mt-0.5">Light Harvest</span>
                    </div>

                    {/* Node 2: Water Splitting */}
                    <div
                      onClick={() => onStepChange(1)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 1
                          ? 'bg-white border-[#111827] shadow-sm scale-102'
                          : 'bg-white/80 border-[#E5E7EB] hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-2">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#111827]">Photolysis</span>
                      <span className="text-[10px] text-[#6B7280] mt-0.5">2H₂O ➔ O₂ + 4H⁺</span>
                    </div>

                    {/* Node 3: ETC & PS I */}
                    <div
                      onClick={() => onStepChange(2)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 2 || activeStepIndex === 3
                          ? 'bg-white border-[#111827] shadow-sm scale-102'
                          : 'bg-white/80 border-[#E5E7EB] hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#111827]">ETC & PS I</span>
                      <span className="text-[10px] text-[#6B7280] mt-0.5">NADP⁺ ➔ NADPH</span>
                    </div>

                    {/* Node 4: ATP Synthase */}
                    <div
                      onClick={() => onStepChange(4)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 4
                          ? 'bg-white border-[#111827] shadow-sm scale-102'
                          : 'bg-white/80 border-[#E5E7EB] hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-2">
                        <BatteryCharging className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#111827]">ATP Synthase</span>
                      <span className="text-[10px] text-[#6B7280] mt-0.5">ADP + Pi ➔ ATP</span>
                    </div>
                  </div>

                  {/* Dynamic Reaction Indicator */}
                  <div className="w-full p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-between text-xs text-[#374151]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#111827]">Reaction Chamber:</span>
                      <span className="text-[#6B7280]">Thylakoid Membrane & Lumen</span>
                    </div>
                    <span className="font-mono text-[11px] bg-[#F3F4F6] px-2 py-0.5 rounded text-[#111827] font-semibold">
                      Photophosphorylation
                    </span>
                  </div>
                </div>
              )}

              {concept.index === 2 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div
                      onClick={() => onStepChange(0)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 0 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">1. Carbon Fixation</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">CO₂ + RuBP via RuBisCO</span>
                    </div>
                    <div
                      onClick={() => onStepChange(1)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 1 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">2. Reduction</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">ATP + NADPH input ➔ G3P</span>
                    </div>
                    <div
                      onClick={() => onStepChange(2)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 2 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">3. Regeneration</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">Rebuild 3x RuBP</span>
                    </div>
                  </div>
                  <div className="w-full p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-between text-xs text-[#374151]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#111827]">Location:</span>
                      <span className="text-[#6B7280]">Chloroplast Stroma (Aqueous Matrix)</span>
                    </div>
                    <span className="font-mono text-[11px] bg-[#F3F4F6] px-2 py-0.5 rounded text-[#111827] font-semibold">
                      Enzyme: RuBisCO
                    </span>
                  </div>
                </div>
              )}

              {concept.index === 3 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div
                      onClick={() => onStepChange(0)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 0 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Investment</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">-2 ATP consumed</span>
                    </div>
                    <div
                      onClick={() => onStepChange(1)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 1 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Cleavage</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">6C Glucose ➔ 2x 3C G3P</span>
                    </div>
                    <div
                      onClick={() => onStepChange(2)}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                        activeStepIndex === 2 ? 'bg-white border-[#111827] shadow-sm scale-102' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Payoff</span>
                      <span className="text-[11px] text-[#6B7280] mt-1">+4 ATP, +2 NADH, +2 Pyruvate</span>
                    </div>
                  </div>
                  <div className="w-full p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-between text-xs text-[#374151]">
                    <span className="font-semibold text-[#111827]">Anaerobic Cytosol</span>
                    <span className="font-mono text-[11px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-emerald-700 font-bold">
                      Net Gain: +2 ATP
                    </span>
                  </div>
                </div>
              )}

              {concept.index === 4 && (
                <div className="w-full flex flex-col gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full">
                    <div
                      onClick={() => onStepChange(0)}
                      className={`p-3 rounded-xl border text-center cursor-pointer ${
                        activeStepIndex === 0 ? 'bg-white border-[#111827] shadow-sm' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Complex I & II</span>
                      <p className="text-[10px] text-[#6B7280]">NADH/FADH₂ delivery</p>
                    </div>
                    <div
                      onClick={() => onStepChange(1)}
                      className={`p-3 rounded-xl border text-center cursor-pointer ${
                        activeStepIndex === 1 ? 'bg-white border-[#111827] shadow-sm' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Proton Pump</span>
                      <p className="text-[10px] text-[#6B7280]">H⁺ gradient in IMS</p>
                    </div>
                    <div
                      onClick={() => onStepChange(2)}
                      className={`p-3 rounded-xl border text-center cursor-pointer ${
                        activeStepIndex === 2 ? 'bg-white border-[#111827] shadow-sm' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">Terminal O₂</span>
                      <p className="text-[10px] text-[#6B7280]">O₂ + 4e⁻ + 4H⁺ ➔ 2H₂O</p>
                    </div>
                    <div
                      onClick={() => onStepChange(3)}
                      className={`p-3 rounded-xl border text-center cursor-pointer ${
                        activeStepIndex === 3 ? 'bg-white border-[#111827] shadow-sm' : 'bg-white/80 border-[#E5E7EB]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#111827]">ATP Synthase</span>
                      <p className="text-[10px] text-[#6B7280]">~28 ATP Dynamo</p>
                    </div>
                  </div>
                  <div className="w-full p-3 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-between text-xs text-[#374151]">
                    <span className="font-semibold text-[#111827]">Mitochondrial Cristae</span>
                    <span className="font-mono text-[11px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-emerald-700 font-bold">
                      Aerobic Powerhouse
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ANALOGY VIEW */
            <div className="relative z-10 w-full max-w-xl text-center py-4 px-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-1">
                {concept.simpleExplanation.analogyTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {currentStep.analogy}
              </p>
            </div>
          )}
        </div>

        {/* Detailed Breakdown Card for Active Step */}
        <div className="w-full mt-5 p-4 sm:p-5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#111827] text-white text-xs font-bold flex items-center justify-center">
                {currentStep.number}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                {currentStep.title}
              </h4>
            </div>
            <span className="text-xs font-medium text-[#6B7280] hidden sm:inline">
              {currentStep.subtitle}
            </span>
          </div>

          <p className="text-xs sm:text-[14.5px] text-[#374151] leading-relaxed">
            {currentStep.detail}
          </p>

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E7EB]/80">
            <button
              type="button"
              disabled={activeStepIndex === 0}
              onClick={() => onStepChange(activeStepIndex - 1)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                activeStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#9CA3AF]'
                  : 'bg-white border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#374151] cursor-pointer shadow-2xs'
              }`}
            >
              ← Previous Stage
            </button>

            <span className="text-xs text-[#6B7280] font-medium">
              Stage {activeStepIndex + 1} of {concept.diagram.steps.length}
            </span>

            <button
              type="button"
              disabled={activeStepIndex === concept.diagram.steps.length - 1}
              onClick={() => onStepChange(activeStepIndex + 1)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                activeStepIndex === concept.diagram.steps.length - 1
                  ? 'opacity-40 cursor-not-allowed border-transparent text-[#9CA3AF]'
                  : 'bg-white border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#374151] cursor-pointer shadow-2xs'
              }`}
            >
              Next Stage →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
