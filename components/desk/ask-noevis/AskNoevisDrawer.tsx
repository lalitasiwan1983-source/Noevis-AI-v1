'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, MessageSquare } from 'lucide-react';
import { DeskContextData } from '../types';
import {
  AskNoevisStatus,
  AskNoevisMessage,
  AskNoevisContext,
} from './types';
import { AskNoevisHeader } from './AskNoevisHeader';
import { AskNoevisSuggestions } from './AskNoevisSuggestions';
import { AskNoevisThinkingState } from './AskNoevisThinkingState';
import { AskNoevisErrorState } from './AskNoevisErrorState';
import { AskNoevisMessageBubble } from './AskNoevisMessageBubble';
import { AskNoevisComposer } from './AskNoevisComposer';
import { useToast } from '@/components/design-system/Toast';

interface AskNoevisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: DeskContextData;
  onAddToNotes?: (text: string) => void;
}

export const AskNoevisDrawer: React.FC<AskNoevisDrawerProps> = ({
  isOpen,
  onClose,
  contextData,
  onAddToNotes,
}) => {
  const { info, success } = useToast();
  const [status, setStatus] = useState<AskNoevisStatus>('empty');
  const [messages, setMessages] = useState<AskNoevisMessage[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll to bottom when messages or status change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, status]);

  if (!isOpen) return null;

  const currentContext: AskNoevisContext = {
    topic: contextData.topic,
    chapter: contextData.chapter,
    currentConcept: contextData.currentConcept,
    conceptIndex: contextData.conceptIndex,
    totalConcepts: contextData.totalConcepts,
    activeMode: contextData.activeMode,
  };

  const getStructuredResponseForPrompt = (prompt: string): AskNoevisMessage => {
    const concept = contextData.currentConcept || 'Autotrophic Nutrition';
    const isSimpler = prompt.toLowerCase().includes('simpler') || prompt.toLowerCase().includes('analogy');
    const isExample = prompt.toLowerCase().includes('example');
    const isVisual = prompt.toLowerCase().includes('visual');

    if (isSimpler) {
      return {
        id: `noevis-${Date.now()}`,
        sender: 'noevis',
        text: `Simplified explanation of ${concept}:`,
        timestamp: 'Just now',
        explanation:
          'Think of chloroplasts like tiny solar-powered kitchens. Sunlight is the electricity that turns water and atmospheric carbon into packaged glucose snacks.',
        keyRule: 'Solar Energy (Photons) + H₂O + CO₂ → Chemical Energy (Glucose) + O₂',
        steps: [
          'Photons hit the solar panels (chlorophyll thylakoids).',
          'Water is split like breaking raw eggs (releasing oxygen as steam/byproduct).',
          'Carbon is stirred in to bake glucose cakes (Calvin cycle storage).',
        ],
        example:
          'When a houseplant sits by the sunny windowsill, its leaves actively absorb red & blue light while reflecting green light back to your eyes.',
      };
    }

    if (isExample) {
      return {
        id: `noevis-${Date.now()}`,
        sender: 'noevis',
        text: `Real-world applied scenario for ${concept}:`,
        timestamp: 'Just now',
        explanation:
          'In desert plants (CAM photosynthesis), stomata stay tightly closed during hot daylight hours to prevent desiccation, opening only at night to fix CO₂ into malic acid.',
        keyRule: 'Stomatal pore aperture is governed by osmotic turgor pressure in surrounding guard cells.',
        steps: [
          'Night: Stomata open → CO₂ intake without transpirational water loss.',
          'Day: Stomata close → Sunlight powers ATP synthesis to convert stored malate into glucose.',
        ],
        example:
          'A desert cactus performs light reactions under midday sun using internally stored carbon fixed the previous night.',
      };
    }

    return {
      id: `noevis-${Date.now()}`,
      sender: 'noevis',
      text: `Reasoning summary for ${concept}:`,
      timestamp: 'Just now',
      explanation: `In ${contextData.chapter}, ${concept} constitutes the foundational biochemical mechanism converting electromagnetic solar radiation into stable organic bonds.`,
      keyRule: '6CO₂ + 12H₂O + Sunlight + Chlorophyll → C₆H₁₂O₆ + 6O₂ + 6H₂O',
      steps: [
        'Light Reaction: Photolysis of water in thylakoid membranes yields O₂, ATP, and NADPH.',
        'Dark Reaction: Enzymatic CO₂ reduction in stroma produces glucose hexose rings.',
        'Translocation: Phloem sieves transport sucrose to storage sinks like roots and tubers.',
      ],
      example:
        'Starch iodine test on a variegated leaf confirms photosynthesis occurs exclusively in chlorophyll-rich green zones.',
    };
  };

  const handleSendMessage = (userText: string) => {
    const userMsg: AskNoevisMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setStatus('thinking');

    // Simulate authentic reasoning transition
    setTimeout(() => {
      const responseMsg = getStructuredResponseForPrompt(userText);
      setMessages((prev) => [...prev, responseMsg]);
      setStatus('response');
    }, 1100);
  };

  const handleStatusSimulatorChange = (newStatus: AskNoevisStatus) => {
    setStatus(newStatus);
    if (newStatus === 'empty') {
      setMessages([]);
    } else if (newStatus === 'response' && messages.length === 0) {
      setMessages([
        {
          id: 'user-demo',
          sender: 'user',
          text: `Explain ${contextData.currentConcept} simply`,
          timestamp: '1 min ago',
        },
        getStructuredResponseForPrompt(`Explain ${contextData.currentConcept} simply`),
      ]);
    }
  };

  const handleAddToNotes = (text: string) => {
    if (onAddToNotes) {
      onAddToNotes(text);
      success('Added to Notes', 'Noevis explanation appended to your Desk notes.');
    } else {
      success('Copied to Clipboard', 'Explanation ready to paste in Notes.');
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="ask-noevis-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-50 transition-opacity"
        aria-hidden="true"
      />

      {/* Assistant Container: Desktop Side Panel vs Mobile Full-Height Bottom Sheet */}
      <motion.div
        key="ask-noevis-drawer"
        initial={{ x: '100%', y: 0 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: '100%', y: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[520px] lg:w-[560px] bg-[#FFFFFF] border-l border-[#E5E7EB] shadow-[-16px_0_48px_rgba(0,0,0,0.12)] flex flex-col justify-between"
        role="dialog"
        aria-label="Ask Noevis Assistant"
      >
        {/* 1. Header with Context Indicator */}
        <AskNoevisHeader
          context={currentContext}
          status={status}
          onStatusChange={handleStatusSimulatorChange}
          onClose={onClose}
        />

        {/* 2. Main Scrollable Conversation & Suggestion Area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
        >
          {/* If no conversation yet (Empty State) */}
          {messages.length === 0 && status !== 'thinking' && status !== 'error' && (
            <div id="ask-noevis-empty-state" className="space-y-6 text-center">
              <div className="py-8 px-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mx-auto shadow-2xs">
                  <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-[#111827]">
                    How can I help you understand this?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    Ask about formulas, confusing steps, visual analogies, or exam traps for{' '}
                    <span className="font-semibold text-[#111827]">
                      {contextData.currentConcept}
                    </span>.
                  </p>
                </div>
              </div>

              {/* Mode-Adaptive Suggested Prompt Cards */}
              <AskNoevisSuggestions
                activeMode={contextData.activeMode || 'learn'}
                onSelectSuggestion={handleSendMessage}
              />
            </div>
          )}

          {/* Conversation History */}
          {messages.length > 0 && (
            <div className="space-y-5">
              {messages.map((msg) => (
                <AskNoevisMessageBubble
                  key={msg.id}
                  message={msg}
                  onFollowUpAction={(actionPrompt) => handleSendMessage(actionPrompt)}
                  onAddToNotes={handleAddToNotes}
                />
              ))}
            </div>
          )}

          {/* Thinking State */}
          {status === 'thinking' && <AskNoevisThinkingState />}

          {/* Error State */}
          {status === 'error' && (
            <AskNoevisErrorState
              onRetry={() => {
                setStatus('thinking');
                setTimeout(() => {
                  const fallbackResponse = getStructuredResponseForPrompt('Explain this concept');
                  setMessages((prev) => [...prev, fallbackResponse]);
                  setStatus('response');
                }, 1000);
              }}
            />
          )}

          {/* Compact suggestions banner under active conversation */}
          {messages.length > 0 && status !== 'thinking' && (
            <div className="pt-2 border-t border-[#F3F4F6]">
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1.5 text-left">
                Related Prompts
              </span>
              <AskNoevisSuggestions
                activeMode={contextData.activeMode || 'learn'}
                onSelectSuggestion={handleSendMessage}
                compact
              />
            </div>
          )}
        </div>

        {/* 3. Message Composer at Bottom */}
        <AskNoevisComposer
          onSend={handleSendMessage}
          isSending={status === 'thinking'}
          placeholder={`Ask Noevis about ${contextData.currentConcept}…`}
        />
      </motion.div>
    </AnimatePresence>
  );
};
