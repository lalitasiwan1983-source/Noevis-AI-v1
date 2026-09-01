'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Palette,
  BookOpen,
  Cpu,
  CreditCard,
  Shield,
  ChevronLeft,
  ChevronDown,
  Check
} from 'lucide-react';

interface SettingsScreenProps {
  onClose: () => void;
  userEmail: string;
  userName: string;
  userInitials: string;
  onboardingData?: {
    studyContext?: string;
    confidenceLevel?: string;
    ageGroup?: string;
  };
  onResetOnboarding?: () => void;
}

type SettingsSection = 'Account' | 'Personalization' | 'Learning' | 'AI & Responses' | 'Plan & Billing' | 'Data & Privacy';

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: 'Account', label: 'Account', icon: User },
  { id: 'Personalization', label: 'Personalization', icon: Palette },
  { id: 'Learning', label: 'Learning', icon: BookOpen },
  { id: 'AI & Responses', label: 'AI & Responses', icon: Cpu },
  { id: 'Plan & Billing', label: 'Plan & Billing', icon: CreditCard },
  { id: 'Data & Privacy', label: 'Data & Privacy', icon: Shield },
];

interface SelectOption {
  value: string;
  label: string;
}

interface NoevisSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  minWidth?: string;
}

const NoevisSelect: React.FC<NoevisSelectProps> = ({
  value,
  onChange,
  options,
  minWidth = 'min-w-[190px]'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${minWidth}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 sm:h-12 px-4.5 rounded-[12px] bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] flex items-center justify-between gap-3 text-[15px] sm:text-[15.5px] font-medium text-[#111827] transition-all cursor-pointer shadow-none focus:outline-none"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : value}</span>
        <ChevronDown
          className={`w-4.5 h-4.5 text-[#667085] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#111827]' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+6px)] right-0 left-0 sm:left-auto sm:min-w-full sm:w-max z-30 bg-[#FFFFFF] rounded-[14px] border border-[#E5E7EB] shadow-[0_12px_32px_-6px_rgba(0,0,0,0.12)] p-1.5 overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] text-left text-[15px] transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F3F4F6] text-[#111827] font-semibold'
                        : 'text-[#374151] hover:text-[#111827] hover:bg-[#F3F4F6] font-medium'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4.5 h-4.5 text-[#111827] stroke-[2.2] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClose,
  userEmail,
  userName,
  userInitials,
  onResetOnboarding
}) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('Account');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true);

  // User Preferences State with LocalStorage Persistence
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window === 'undefined') return 'English';
    return localStorage.getItem('noevis_language') || 'English';
  });

  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'System';
    return localStorage.getItem('noevis_theme') || 'System';
  });

  const [tutorPersonality, setTutorPersonality] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Friendly';
    return localStorage.getItem('noevis_tutor_personality') || 'Friendly';
  });

  const [explanationDepth, setExplanationDepth] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Adaptive (Recommended)';
    return localStorage.getItem('noevis_explanation_depth') || 'Adaptive (Recommended)';
  });

  const [pacing, setPacing] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Standard';
    return localStorage.getItem('noevis_pacing') || 'Standard';
  });

  const [responseStyle, setResponseStyle] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Balanced';
    return localStorage.getItem('noevis_response_style') || 'Balanced';
  });

  const [visualExplanations, setVisualExplanations] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Always Generate';
    return localStorage.getItem('noevis_visual_explanations') || 'Always Generate';
  });

  // Apply theme changes to document
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (typeof window === 'undefined') return;
    localStorage.setItem('noevis_theme', newTheme);

    const root = document.documentElement;
    if (newTheme === 'Dark') {
      root.classList.add('dark');
    } else if (newTheme === 'Light') {
      root.classList.remove('dark');
    } else {
      // System
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isSystemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('noevis_language', newLang);
    }
  };

  // Transition for right-pane content
  const contentVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderSectionHeader = (title: string, subtitle: string) => (
    <div className="mb-10 border-b border-[#E5E7EB] pb-8">
      <h2 className="text-[30px] sm:text-[34px] font-bold text-[#111827] tracking-tight leading-tight">{title}</h2>
      <p className="text-[15px] sm:text-[16px] text-[#667085] mt-2.5 leading-relaxed">{subtitle}</p>
    </div>
  );

  const renderAccount = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('Account', 'Manage your Noevis AI account.')}
      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Profile</h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#111827] text-white flex items-center justify-center text-[20px] sm:text-[22px] font-bold shrink-0">
              {userInitials}
            </div>
            <div>
              <p className="text-[17px] sm:text-[18px] font-semibold text-[#111827] leading-tight">{userName}</p>
              <p className="text-[14.5px] sm:text-[15px] text-[#667085] mt-1">{userEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Learner Profile</h3>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Your learner profile</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[460px] leading-relaxed">
                Review or update the information Noevis uses to personalize your learning.
              </p>
            </div>
            {onResetOnboarding && (
              <button
                type="button"
                onClick={onResetOnboarding}
                className="h-11 sm:h-12 px-6 rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] text-[15px] font-medium text-[#111827] transition-colors shrink-0 cursor-pointer"
              >
                Reset profile
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Account Actions</h3>
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-6 border-b border-[#E5E7EB]">
            <button className="text-[16px] font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors text-left cursor-pointer py-1">
              Sign out
            </button>
          </div>
          <div className="flex items-center justify-between py-6">
            <button className="text-[16px] font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors text-left cursor-pointer py-1">
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPersonalization = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('Personalization', 'Control how Noevis AI adapts your learning experience.')}
      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Preferences</h3>
        <div className="flex flex-col">
          {/* Language Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Language</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 leading-relaxed">Select your preferred interface language.</p>
            </div>
            <NoevisSelect
              value={language}
              onChange={handleLanguageChange}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Hindi', label: 'Hindi' }
              ]}
              minWidth="min-w-[180px] sm:min-w-[200px]"
            />
          </div>

          {/* Theme Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Theme</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 leading-relaxed">Adjust the appearance of Noevis.</p>
            </div>
            <NoevisSelect
              value={theme}
              onChange={handleThemeChange}
              options={[
                { value: 'Light', label: 'Light' },
                { value: 'Dark', label: 'Dark' },
                { value: 'System', label: 'System' }
              ]}
              minWidth="min-w-[180px] sm:min-w-[200px]"
            />
          </div>

          {/* Tutor Personality Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Tutor Personality</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[420px] leading-relaxed">The tone Noevis will adopt while tutoring you.</p>
            </div>
            <NoevisSelect
              value={tutorPersonality}
              onChange={(val) => {
                setTutorPersonality(val);
                if (typeof window !== 'undefined') localStorage.setItem('noevis_tutor_personality', val);
              }}
              options={[
                { value: 'Friendly', label: 'Friendly' },
                { value: 'Focused', label: 'Focused' },
                { value: 'Strict', label: 'Strict' }
              ]}
              minWidth="min-w-[180px] sm:min-w-[200px]"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderLearning = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('Learning', 'Control your learning experience.')}
      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Learning Preferences</h3>
        <div className="flex flex-col">
          {/* Explanation Depth Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Explanation Depth</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[460px] leading-relaxed">How much context Noevis provides during lessons.</p>
            </div>
            <NoevisSelect
              value={explanationDepth}
              onChange={(val) => {
                setExplanationDepth(val);
                if (typeof window !== 'undefined') localStorage.setItem('noevis_explanation_depth', val);
              }}
              options={[
                { value: 'Adaptive (Recommended)', label: 'Adaptive (Recommended)' },
                { value: 'Brief', label: 'Brief' },
                { value: 'Comprehensive', label: 'Comprehensive' }
              ]}
              minWidth="min-w-[220px] sm:min-w-[240px]"
            />
          </div>

          {/* Pacing Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Pacing</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[460px] leading-relaxed">Adjust how quickly new concepts are introduced.</p>
            </div>
            <NoevisSelect
              value={pacing}
              onChange={(val) => {
                setPacing(val);
                if (typeof window !== 'undefined') localStorage.setItem('noevis_pacing', val);
              }}
              options={[
                { value: 'Standard', label: 'Standard' },
                { value: 'Relaxed', label: 'Relaxed' },
                { value: 'Accelerated', label: 'Accelerated' }
              ]}
              minWidth="min-w-[200px] sm:min-w-[220px]"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderAI = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('AI & Responses', 'Control how Noevis AI responds while you learn.')}
      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Response Behavior</h3>
        <div className="flex flex-col">
          {/* Response Style Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Response Style</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[460px] leading-relaxed">Length and detail of chat replies and insights.</p>
            </div>
            <NoevisSelect
              value={responseStyle}
              onChange={(val) => {
                setResponseStyle(val);
                if (typeof window !== 'undefined') localStorage.setItem('noevis_response_style', val);
              }}
              options={[
                { value: 'Balanced', label: 'Balanced' },
                { value: 'Concise', label: 'Concise' },
                { value: 'Detailed', label: 'Detailed' }
              ]}
              minWidth="min-w-[200px] sm:min-w-[220px]"
            />
          </div>
          
          {/* Visual Explanations Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 py-6 border-b border-[#E5E7EB]">
            <div className="pr-4">
              <p className="text-[16.5px] sm:text-[17.5px] font-semibold text-[#111827] leading-snug">Visual Explanations</p>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1.5 max-w-[460px] leading-relaxed">Should Noevis generate diagrams and code snippets?</p>
            </div>
            <NoevisSelect
              value={visualExplanations}
              onChange={(val) => {
                setVisualExplanations(val);
                if (typeof window !== 'undefined') localStorage.setItem('noevis_visual_explanations', val);
              }}
              options={[
                { value: 'Always Generate', label: 'Always Generate' },
                { value: 'Ask First', label: 'Ask First' }
              ]}
              minWidth="min-w-[200px] sm:min-w-[220px]"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderPlan = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('Plan & Billing', 'Manage your Noevis AI plan and subscription.')}
      <section>
        <div className="py-14 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF] mb-5">
            <CreditCard className="w-7 h-7 stroke-[1.8]" />
          </div>
          <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111827] mb-2">Billing not connected</h3>
          <p className="text-[14.5px] sm:text-[15px] text-[#667085] max-w-[380px] mb-8 leading-[1.6]">
            Billing management is not available in the current preview environment. Active subscriptions will appear here.
          </p>
          <button disabled className="h-11 sm:h-12 px-7 rounded-[12px] bg-[#F3F4F6] text-[#9CA3AF] text-[15px] font-medium cursor-not-allowed">
            Manage plan
          </button>
        </div>
      </section>
    </div>
  );

  const renderPrivacy = () => (
    <div className="flex flex-col gap-12">
      {renderSectionHeader('Data & Privacy', 'Control your data and account privacy.')}
      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Data</h3>
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-6 border-b border-[#E5E7EB]">
            <button className="text-[16px] font-medium text-[#111827] hover:text-[#4B5BEA] transition-colors text-left cursor-pointer py-1">
              Export my data
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#667085] uppercase tracking-wider mb-3">Account</h3>
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-6 border-b border-[#E5E7EB]">
            <button className="text-[16px] font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors text-left cursor-pointer py-1">
              Delete account
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderActiveContent = () => {
    switch (activeSection) {
      case 'Account': return renderAccount();
      case 'Personalization': return renderPersonalization();
      case 'Learning': return renderLearning();
      case 'AI & Responses': return renderAI();
      case 'Plan & Billing': return renderPlan();
      case 'Data & Privacy': return renderPrivacy();
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
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
        className="w-full h-full md:h-[85vh] md:max-h-[900px] md:w-[92vw] md:max-w-[1100px] bg-[#FFFFFF] md:rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row relative"
      >
        {/* MOBILE HEADER: Only visible on small screens when viewing a specific section */}
        {!isMobileNavOpen && (
          <div className="md:hidden flex items-center gap-3 p-4 border-b border-[#E5E7EB] shrink-0 bg-[#FFFFFF] z-10 sticky top-0">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>
            <span className="text-[17px] font-bold text-[#111827]">{activeSection}</span>
          </div>
        )}

        {/* MOBILE HEADER: Only visible on small screens when viewing main menu */}
        {isMobileNavOpen && (
          <div className="md:hidden flex items-center justify-between p-4 border-b border-[#E5E7EB] shrink-0 bg-[#FFFFFF] z-10 sticky top-0">
            <span className="text-[18px] font-bold text-[#111827] px-2">Settings</span>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2]" />
            </button>
          </div>
        )}

        {/* DESKTOP: Left Navigation (PURE WHITE) / MOBILE: Full List Menu */}
        <div
          className={`${
            isMobileNavOpen ? 'flex' : 'hidden md:flex'
          } w-full md:w-[290px] lg:w-[310px] shrink-0 flex-col bg-[#FFFFFF] border-r border-[#E5E7EB] h-full overflow-y-auto`}
        >
          {/* Desktop Title */}
          <div className="hidden md:flex items-center justify-between px-7 pt-10 pb-6">
            <span className="text-[13px] sm:text-[14px] font-semibold tracking-wider uppercase text-[#667085]">Settings</span>
          </div>

          {/* Navigation List */}
          <div className="flex flex-col px-3 md:px-4 py-4 md:py-0 gap-1.5 pb-10 md:pb-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileNavOpen(false); // On mobile, switch to content view
                  }}
                  className={`w-full flex items-center gap-3.5 px-4.5 py-3.5 min-h-[48px] rounded-[12px] text-[16px] sm:text-[16.5px] transition-colors duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#F3F4F6] text-[#111827] font-semibold'
                      : 'text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] font-medium'
                  }`}
                >
                  <Icon className={`w-[22px] h-[22px] sm:w-[23px] sm:h-[23px] stroke-[1.8] ${isActive ? 'text-[#111827]' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area (Desktop) / Full Page Content (Mobile) - PURE WHITE */}
        <div
          className={`${
            isMobileNavOpen ? 'hidden md:flex' : 'flex'
          } flex-1 flex-col h-full bg-[#FFFFFF] relative overflow-hidden`}
        >
          {/* Desktop Close Button */}
          <div className="hidden md:flex absolute top-8 right-8 z-20">
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-12 pb-24 md:pb-20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} {...contentVariants} className="w-full max-w-[760px] text-left mx-auto md:mx-0 pb-16">
                {renderActiveContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
