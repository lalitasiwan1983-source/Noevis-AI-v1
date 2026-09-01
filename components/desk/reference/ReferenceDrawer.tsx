'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  ChevronRight,
  Sparkles,
  FileText,
  FileCode,
  Globe,
  Video,
  Camera,
} from 'lucide-react';
import { DeskContextData } from '../types';
import { ReferenceSourceType, ReferenceViewStatus, ReferenceData } from './types';
import { ReferenceSourceView } from './ReferenceSourceView';
import { ReferenceEmptyState } from './ReferenceEmptyState';
import { ReferenceLoadingState } from './ReferenceLoadingState';
import { ReferenceErrorState } from './ReferenceErrorState';
import { useToast } from '@/components/design-system/Toast';

interface ReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: DeskContextData;
  onAddToNotes?: (excerpt: string) => void;
}

export const ReferenceDrawer: React.FC<ReferenceDrawerProps> = ({
  isOpen,
  onClose,
  contextData,
  onAddToNotes,
}) => {
  const { info, success } = useToast();

  // Internal visual status controller (defaults to 'loaded' with context-bound data)
  const [viewStatus, setViewStatus] = useState<ReferenceViewStatus>('loaded');
  const [selectedSourceType, setSelectedSourceType] = useState<ReferenceSourceType>(
    (contextData.sourceType as ReferenceSourceType) || 'file'
  );

  // Keyboard Escape Handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build authentic reference representation based on current context
  const getReferenceDataForType = (type: ReferenceSourceType): ReferenceData => {
    switch (type) {
      case 'file':
        return {
          sourceType: 'file',
          sourceTitle: contextData.sourceName || 'NCERT Class 10 Biology — Chapter 6.pdf',
          sourceOrigin: 'Textbook Curriculum Section 6.2 · Page 95–98',
          sectionLocator: `Page 96 · Section ${contextData.conceptIndex || 1}.1`,
          excerpt:
            'Autotrophic nutrition involves the intake of inorganic substances (CO₂ and H₂O) and their photochemical reduction to carbohydrates in the presence of sunlight and chlorophyll.',
          keyPoints: [
            'Light absorption by chlorophyll activates electron transport.',
            'Water photolysis splits H₂O into oxygen gas, electrons, and protons.',
            'Dark reaction reduces CO₂ into carbohydrate energy stores.',
          ],
          lastUpdated: 'Lesson Index Verified',
        };
      case 'text':
        return {
          sourceType: 'text',
          sourceTitle: 'Syllabus Note: Autotrophic Mechanism Details',
          sourceOrigin: 'Curriculum Core Standards · Unit 2',
          sectionLocator: 'Notes Block § 4',
          excerpt:
            'During daylight hours, stomatal pores open under turgor pressure in guard cells, allowing carbon dioxide diffusion into palisade mesophyll cells.',
          keyPoints: [
            'Guard cell swelling regulates gas exchange and transpirational pull.',
            'Starch grains serve as internal energy reserves in plant tissues.',
          ],
          lastUpdated: 'Curriculum Sync Active',
        };
      case 'link':
        return {
          sourceType: 'link',
          sourceTitle: 'Khan Academy Biology: Light-Dependent Reactions',
          sourceOrigin: 'https://khanacademy.org/science/biology/cellular-energetics',
          sectionLocator: 'Interactive Module 4.3',
          excerpt:
            'Photons strike Photosystem II, exciting electrons to a higher energy state which passes down the cytochrome b6f complex to pump protons into the thylakoid lumen.',
          keyPoints: [
            'Proton gradient drives ATP synthase to produce ATP.',
            'NADPH is generated at Photosystem I for Calvin cycle consumption.',
          ],
          lastUpdated: 'Web Resource Linked',
        };
      case 'youtube':
        return {
          sourceType: 'youtube',
          sourceTitle: 'Lecture Clip: Photosynthesis Molecular Mechanism',
          sourceOrigin: 'Prof. Dave Explains · Biology Series #14',
          sectionLocator: 'Timestamp 04:18 – 07:45',
          excerpt:
            'Notice the spatial orientation of the ATP synthase rotor embedded directly in the thylakoid membrane, converting electrochemical potential into chemical bonds.',
          keyPoints: [
            'Visual walkthrough of Z-scheme electron transport.',
            'Explanation of cyclic vs non-cyclic photophosphorylation.',
          ],
          lastUpdated: 'Video Timestamp Indexed',
        };
      case 'photo':
        return {
          sourceType: 'photo',
          sourceTitle: 'Whiteboard Capture: Chloroplast Anatomy',
          sourceOrigin: 'Classroom Lecture Snapshot · Session 6',
          sectionLocator: 'Snapshot #03',
          excerpt:
            'Diagram showing double membrane envelope, stroma thylakoid stacks (grana), and lumen compartment pH differential.',
          keyPoints: [
            'Handwritten annotation on stroma enzymes vs grana photosystems.',
          ],
          lastUpdated: 'Image OCR Verified',
        };
    }
  };

  const currentData = getReferenceDataForType(selectedSourceType);

  const handleOpenSource = () => {
    info('Source Material', `Opening external source locator for ${currentData.sourceTitle}`);
  };

  const handleFocusSection = () => {
    success('Focus Section', `Navigated to ${currentData.sectionLocator}`);
  };

  const handleAddToNotes = (text: string) => {
    if (onAddToNotes) {
      onAddToNotes(text);
      success('Added to Notes', 'Source excerpt appended to your Desk notes.');
    } else {
      success('Excerpt Copied', 'Source excerpt ready to paste in Notes.');
    }
  };

  const sourceTypes: { type: ReferenceSourceType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { type: 'file', label: 'File', icon: FileText },
    { type: 'text', label: 'Text', icon: FileCode },
    { type: 'link', label: 'Link', icon: Globe },
    { type: 'youtube', label: 'Video', icon: Video },
    { type: 'photo', label: 'Photo', icon: Camera },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="desk-reference-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-50 transition-opacity"
        aria-hidden="true"
      />

      {/* Main Reference Container: Desktop Side Panel vs Mobile Full-Height Bottom Sheet */}
      <motion.div
        key="desk-reference-drawer"
        initial={{ x: '100%', y: 0 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: '100%', y: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] md:w-[480px] lg:w-[500px] bg-[#FFFFFF] border-l border-[#E5E7EB] shadow-[-16px_0_48px_rgba(0,0,0,0.12)] flex flex-col justify-between"
        role="dialog"
        aria-label="Reference Inspector"
      >
        {/* 1. Header with Breadcrumb Context */}
        <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#FFFFFF] shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#111827] shadow-2xs">
                <BookOpen className="w-4.5 h-4.5 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#111827] leading-tight">
                  Reference Inspector
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Original material behind this learning context
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAFAFB] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              title="Close Reference Panel"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Context Strip: Topic › Chapter › Concept */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-[#FAFAFB] px-3 py-1.5 rounded-xl border border-[#E5E7EB] flex-wrap">
            <span className="font-semibold text-[#111827] truncate max-w-[120px]">
              {contextData.topic}
            </span>
            <ChevronRight className="w-3 h-3 text-[#9CA3AF] shrink-0" />
            <span className="text-[#4B5563] truncate max-w-[130px]">
              {contextData.chapter}
            </span>
            <ChevronRight className="w-3 h-3 text-[#9CA3AF] shrink-0" />
            <span className="text-[#6366F1] font-semibold truncate max-w-[130px]">
              {contextData.conceptIndex ? `Concept ${contextData.conceptIndex}` : contextData.currentConcept}
            </span>
          </div>

          {/* Source Type & Status Controls (For UI Testing & Real Switching) */}
          <div className="flex items-center justify-between gap-1 pt-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1">
              {sourceTypes.map((st) => {
                const isSelected = selectedSourceType === st.type && viewStatus === 'loaded';
                const Icon = st.icon;
                return (
                  <button
                    key={st.type}
                    type="button"
                    onClick={() => {
                      setSelectedSourceType(st.type);
                      setViewStatus('loaded');
                    }}
                    className={`h-7 px-2 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#111827] text-white'
                        : 'bg-[#FAFAFB] text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewStatus('empty')}
                className={`h-7 px-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                  viewStatus === 'empty'
                    ? 'bg-[#E5E7EB] text-[#111827]'
                    : 'text-[#9CA3AF] hover:text-[#374151]'
                }`}
                title="View empty state"
              >
                Empty
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewStatus('loading');
                  setTimeout(() => setViewStatus('loaded'), 1200);
                }}
                className={`h-7 px-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                  viewStatus === 'loading'
                    ? 'bg-[#E5E7EB] text-[#111827]'
                    : 'text-[#9CA3AF] hover:text-[#374151]'
                }`}
                title="Simulate loading state"
              >
                Load
              </button>
              <button
                type="button"
                onClick={() => setViewStatus('error')}
                className={`h-7 px-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
                  viewStatus === 'error'
                    ? 'bg-[#FEE2E2] text-[#DC2626]'
                    : 'text-[#9CA3AF] hover:text-[#DC2626]'
                }`}
                title="Simulate error state"
              >
                Err
              </button>
            </div>
          </div>
        </div>

        {/* 2. Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewStatus === 'loading' && <ReferenceLoadingState />}

          {viewStatus === 'error' && (
            <ReferenceErrorState onRetry={() => setViewStatus('loaded')} />
          )}

          {viewStatus === 'empty' && (
            <ReferenceEmptyState onAddSource={() => setViewStatus('loaded')} />
          )}

          {viewStatus === 'loaded' && (
            <ReferenceSourceView
              data={currentData}
              onOpenSource={handleOpenSource}
              onFocusSection={handleFocusSection}
              onAddToNotes={handleAddToNotes}
            />
          )}
        </div>

        {/* 3. Footer */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#FAFAFB] shrink-0 flex items-center justify-between text-xs text-[#6B7280]">
          <span className="truncate max-w-[200px]">
            Noevis Desk Inspector
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[38px] px-4 rounded-xl bg-[#111827] text-white text-xs font-bold hover:bg-[#1F2937] transition-colors cursor-pointer shadow-2xs"
          >
            Done
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
