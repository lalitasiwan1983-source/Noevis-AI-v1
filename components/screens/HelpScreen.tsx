'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Sparkles,
  UserCheck,
  GraduationCap,
  Settings as SettingsIcon,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Mail,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HelpScreenProps {
  onClose: () => void;
  onOpenSettings?: () => void;
  onResetOnboarding?: () => void;
}

interface QuickHelpCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  detailedContent: {
    overview: string;
    points: string[];
    actionLabel?: string;
    actionType?: 'settings' | 'onboarding' | 'contact';
  };
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const QUICK_HELP_ITEMS: QuickHelpCard[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Understand how Noevis works and start learning.',
    icon: Sparkles,
    detailedContent: {
      overview: 'Noevis transforms documents, lectures, recordings, and topics into structured, adaptive learning Desks.',
      points: [
        'Bring notes, PDFs, YouTube lectures, or voice recordings to begin.',
        'Noevis breaks materials down into modular concepts and interactive cards.',
        'Review explanations, test understanding with quick checks, and ask deep questions anytime.'
      ]
    }
  },
  {
    id: 'learning-profile',
    title: 'Your Learning Profile',
    description: 'Learn how Noevis personalizes your experience.',
    icon: UserCheck,
    detailedContent: {
      overview: 'Your learning profile guides the tone, depth, and pacing Noevis uses for explanations.',
      points: [
        'Tuned to your study level, academic background, and subject familiarity.',
        'Continuously adapts based on how you interact and answer knowledge checks.',
        'Can be adjusted or reset at any time from Account Settings.'
      ],
      actionLabel: 'Reset Learner Profile',
      actionType: 'onboarding'
    }
  },
  {
    id: 'learning-with-noevis',
    title: 'Learning with Noevis',
    description: 'Understand sessions, explanations, practice and progress.',
    icon: GraduationCap,
    detailedContent: {
      overview: 'Experience multidimensional learning designed for deep comprehension rather than rote memorization.',
      points: [
        'Explore visual diagrams, real-world analogies, and step-by-step breakdowns.',
        'Engage in practice drills with immediate feedback tailored to your misconceptions.',
        'Track concept mastery and review previous learning sessions in Activity.'
      ]
    }
  },
  {
    id: 'account-settings',
    title: 'Account & Settings',
    description: 'Manage your profile, preferences, language and appearance.',
    icon: SettingsIcon,
    detailedContent: {
      overview: 'Customize your workspace appearance, language, AI response styles, and data settings.',
      points: [
        'Switch between Light, Dark, and System appearance themes.',
        'Choose your preferred interface language between English and हिन्दी.',
        'Configure explanation depth, pacing, and AI response conciseness.'
      ],
      actionLabel: 'Open Settings',
      actionType: 'settings'
    }
  }
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-personalize',
    question: 'How does Noevis personalize my learning?',
    answer:
      'Noevis analyzes your study material, background context, and mastery level to craft custom adaptive explanations, pacing, and visual diagrams tailored specifically to how you learn best.',
    category: 'Personalization'
  },
  {
    id: 'faq-change-profile',
    question: 'Can I change my learner profile?',
    answer:
      'Yes. You can manage your preferences anytime in Settings → Account, or reset your onboarding to update your study focus, grade level, and confidence settings.',
    category: 'Profile'
  },
  {
    id: 'faq-change-language',
    question: 'How do I change the language?',
    answer:
      'Go to Settings → Personalization → Language, and choose between English or हिन्दी (Hindi). Your preference is saved across your sessions.',
    category: 'Preferences'
  },
  {
    id: 'faq-change-theme',
    question: 'How do I change the theme?',
    answer:
      'You can toggle Dark Mode directly from your Profile menu in the sidebar, or customize between Light, Dark, and System in Settings → Personalization → Theme.',
    category: 'Preferences'
  },
  {
    id: 'faq-reset-profile',
    question: 'How do I reset my learner profile?',
    answer:
      'Open your Profile menu in the lower sidebar or head to Settings → Account → Learner Profile, then click "Reset profile" to run the initial personalization setup again.',
    category: 'Profile'
  }
];

export const HelpScreen: React.FC<HelpScreenProps> = ({
  onClose,
  onOpenSettings,
  onResetOnboarding
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [selectedQuickCard, setSelectedQuickCard] = useState<QuickHelpCard | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showContactModal) setShowContactModal(false);
        else if (selectedQuickCard) setSelectedQuickCard(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showContactModal, selectedQuickCard]);

  // Filtered FAQ and Quick Help items based on search query
  const filteredQuickHelp = useMemo(() => {
    if (!searchQuery.trim()) return QUICK_HELP_ITEMS;
    const query = searchQuery.toLowerCase();
    return QUICK_HELP_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_ITEMS;
    const query = searchQuery.toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setShowContactModal(false);
      setContactSubject('');
      setContactMessage('');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-8 backdrop-blur-[8px] bg-[#111827]/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full md:h-[88vh] md:max-h-[920px] md:w-[92vw] md:max-w-[1080px] bg-[#FFFFFF] md:rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col relative text-left"
      >
        {/* TOP BAR / HEADER */}
        <div className="px-6 sm:px-12 lg:px-16 pt-8 sm:pt-10 pb-6 border-b border-[#E5E7EB] shrink-0 bg-[#FFFFFF] flex items-start justify-between gap-6 relative">
          <div>
            <h1 className="text-[30px] sm:text-[36px] font-bold text-[#111827] tracking-tight leading-tight">
              Help & Support
            </h1>
            <p className="text-[15.5px] sm:text-[17px] text-[#667085] mt-2 leading-relaxed">
              Get help with your learning experience.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer shrink-0 -mt-1 -mr-2"
            title="Close Help"
            aria-label="Close Help & Support"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-10 space-y-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* SEARCH INPUT */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#9CA3AF]">
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help..."
              className="w-full h-14 sm:h-16 pl-13 pr-12 rounded-[18px] bg-[#F3F4F6] border-0 text-[#111827] placeholder-[#9CA3AF] text-[16px] sm:text-[17.5px] font-medium focus:ring-2 focus:ring-[#111827]/10 focus:bg-[#FFFFFF] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4.5 flex items-center text-[#9CA3AF] hover:text-[#111827] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* QUICK HELP SECTION */}
          {filteredQuickHelp.length > 0 && (
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#667085] uppercase tracking-wider">
                  Quick Help
                </h2>
                {searchQuery && (
                  <span className="text-[13px] text-[#667085]">
                    {filteredQuickHelp.length} found
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {filteredQuickHelp.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedQuickCard(item)}
                      className="p-6 sm:p-7 rounded-[20px] bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB]/70 transition-all duration-150 flex flex-col text-left group cursor-pointer shadow-none hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                    >
                      <div className="w-12 h-12 rounded-[14px] bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#111827] mb-4 group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-6 h-6 stroke-[1.9]" />
                      </div>
                      <h3 className="text-[18px] sm:text-[19px] font-bold text-[#111827] leading-snug group-hover:text-[#000000]">
                        {item.title}
                      </h3>
                      <p className="text-[14.5px] sm:text-[15px] text-[#667085] mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ SECTION */}
          {filteredFaqs.length > 0 && (
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#667085] uppercase tracking-wider">
                  Frequently Asked Questions
                </h2>
                {searchQuery && (
                  <span className="text-[13px] text-[#667085]">
                    {filteredFaqs.length} questions
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-[18px] bg-[#F9FAFB] border border-[#E5E7EB]/80 overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F3F4F6]/70 transition-colors"
                      >
                        <span className="text-[16.5px] sm:text-[18px] font-semibold text-[#111827] leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[#667085] shrink-0 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#111827]' : ''
                          }`}
                        >
                          <ChevronDown className="w-5 h-5 stroke-[2]" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 text-[15px] sm:text-[15.5px] text-[#4B5563] leading-relaxed border-t border-[#E5E7EB]/50">
                              <p>{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* NO RESULTS VIEW */}
          {filteredQuickHelp.length === 0 && filteredFaqs.length === 0 && (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF] mb-4">
                <HelpCircle className="w-8 h-8 stroke-[1.8]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#111827]">No results found</h3>
              <p className="text-[15px] text-[#667085] max-w-[360px] mt-1.5 leading-relaxed">
                We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;language&rdquo;, &ldquo;profile&rdquo;, or &ldquo;theme&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 text-[15px] font-semibold text-[#111827] hover:underline cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          )}

          {/* SUPPORT / CONTACT FOOTER */}
          <section className="pt-6 pb-4">
            <div className="p-8 sm:p-10 rounded-[24px] bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
              <div>
                <h3 className="text-[20px] sm:text-[23px] font-bold text-[#111827] leading-tight">
                  Still need help?
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[#667085] mt-1.5 max-w-[440px] leading-relaxed">
                  We&apos;re here to help you get the most out of Noevis.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="h-12 sm:h-14 px-7 sm:px-8 rounded-[14px] bg-[#111827] hover:bg-[#000000] text-white text-[15.5px] sm:text-[16px] font-semibold transition-all duration-150 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer shadow-sm hover:shadow"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>
            </div>
          </section>

        </div>
      </motion.div>

      {/* QUICK HELP DETAIL MODAL */}
      <AnimatePresence>
        {selectedQuickCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-[10px] bg-[#111827]/40"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedQuickCard(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[560px] bg-[#FFFFFF] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-7 sm:p-9 text-left relative"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-[16px] bg-[#F3F4F6] flex items-center justify-center text-[#111827]">
                  {React.createElement(selectedQuickCard.icon, { className: 'w-7 h-7 stroke-[1.8]' })}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQuickCard(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              <h3 className="text-[22px] sm:text-[24px] font-bold text-[#111827] leading-tight">
                {selectedQuickCard.title}
              </h3>
              <p className="text-[15px] sm:text-[15.5px] text-[#667085] mt-2 leading-relaxed">
                {selectedQuickCard.detailedContent.overview}
              </p>

              <div className="my-6 space-y-3 pt-4 border-t border-[#E5E7EB]">
                {selectedQuickCard.detailedContent.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-[#374151] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#111827] mt-2 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                {selectedQuickCard.detailedContent.actionLabel && (
                  <button
                    type="button"
                    onClick={() => {
                      const type = selectedQuickCard.detailedContent.actionType;
                      setSelectedQuickCard(null);
                      onClose();
                      if (type === 'settings' && onOpenSettings) onOpenSettings();
                      if (type === 'onboarding' && onResetOnboarding) onResetOnboarding();
                    }}
                    className="h-11 px-5 rounded-[12px] bg-[#111827] text-white hover:bg-[#000000] text-[14.5px] font-semibold transition-colors cursor-pointer"
                  >
                    {selectedQuickCard.detailedContent.actionLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedQuickCard(null)}
                  className="h-11 px-5 rounded-[12px] bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] text-[14.5px] font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT SUPPORT MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-[10px] bg-[#111827]/40"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowContactModal(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[540px] bg-[#FFFFFF] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-7 sm:p-9 text-left relative"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-[#111827] leading-tight">
                    Contact Support
                  </h3>
                  <p className="text-[14.5px] text-[#667085] mt-1">
                    Send a note to the Noevis team. We usually respond within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {contactSubmitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#111827]">Message sent</h4>
                  <p className="text-[14.5px] text-[#667085] mt-1">
                    Thank you! Our support team will follow up via your account email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="e.g., Question about my learner profile"
                      required
                      className="w-full h-12 px-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] text-[15px] text-[#111827] focus:bg-white focus:outline-none focus:border-[#111827] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us what you need help with..."
                      required
                      className="w-full p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] text-[15px] text-[#111827] focus:bg-white focus:outline-none focus:border-[#111827] transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="h-11 px-5 rounded-[12px] bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] text-[14.5px] font-medium transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-[12px] bg-[#111827] text-white hover:bg-[#000000] text-[14.5px] font-semibold transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
