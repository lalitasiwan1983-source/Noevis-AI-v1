'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { useToast } from '@/components/design-system/Toast';
import { OnboardingData } from './OnboardingScreen';
import {
  Home,
  Layers,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  Plus,
  Search,
  ArrowRight,
  Upload,
  FileText,
  Link as LinkIcon,
  MoreHorizontal,
  Menu,
  User,
  X,
  RotateCcw,
  Sparkles,
  BookOpen,
  Brain,
  Eye,
  Target,
  Youtube,
  Camera,
  Mic,
  Plug,
  ChevronRight,
  Clock,
  CheckCircle2,
  FileCode,
  FolderPlus,
  ExternalLink,
  Sliders,
  Shield,
  HelpCircle as QuestionIcon,
  Trash2,
  Share2,
  MoreVertical,
} from 'lucide-react';

interface HomeScreenProps {
  userEmail?: string;
  onboardingData?: Partial<OnboardingData>;
  onStartCanvas: (sourceType?: string) => void;
  onResetOnboarding?: () => void;
}

type NavItemType = 'home' | 'canvases' | 'library' | 'history' | 'settings' | 'help';
type SourceModalType = 'upload' | 'paste' | 'link' | 'youtube' | 'camera' | 'voice' | null;

interface CanvasItem {
  id: string;
  title: string;
  sourceType: 'pdf' | 'text' | 'link' | 'youtube';
  sourceName: string;
  updatedAt: string;
  elementsCount: {
    explanations: number;
    questions: number;
    visuals: number;
  };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userEmail = 'learner@noevis.ai',
  onboardingData,
  onStartCanvas,
  onResetOnboarding,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { success, info } = useToast();

  // Navigation State (Exact 6 destinations)
  const [activeNav, setActiveNav] = useState<NavItemType>('home');

  // Source Entry Modals & Popovers
  const [activeSourceModal, setActiveSourceModal] = useState<SourceModalType>(null);
  const [showMoreWays, setShowMoreWays] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Source Form Input States
  const [pasteText, setPasteText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessingSource, setIsProcessingSource] = useState(false);

  // Canvases State (Starts empty for new user; user can add to explore both states)
  const [canvases, setCanvases] = useState<CanvasItem[]>([]);

  // Popover Refs
  const moreWaysRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreWaysRef.current && !moreWaysRef.current.contains(event.target as Node)) {
        setShowMoreWays(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const studyContext = onboardingData?.studyContext || 'College & University';
  const confidence = onboardingData?.confidenceLevel || 'Getting familiar';
  const ageGroup = onboardingData?.ageGroup || '18+';

  // Navigation items definition (Exact 6)
  const navItems = [
    { id: 'home' as NavItemType, label: 'Home', icon: Home },
    { id: 'canvases' as NavItemType, label: 'My Canvases', icon: Layers },
    { id: 'library' as NavItemType, label: 'Library', icon: Bookmark },
    { id: 'history' as NavItemType, label: 'History', icon: History },
    { id: 'settings' as NavItemType, label: 'Settings', icon: Settings },
    { id: 'help' as NavItemType, label: 'Help', icon: HelpCircle },
  ];

  const handleNavClick = (navItem: NavItemType) => {
    setActiveNav(navItem);
    setShowMobileMenu(false);
  };

  // Open source-adding flow
  const handleOpenSourceModal = (sourceType: SourceModalType) => {
    setShowMoreWays(false);
    setActiveSourceModal(sourceType);
  };

  // Handle direct start learning trigger
  const handleStartLearningClick = () => {
    setShowMoreWays(false);
    setActiveSourceModal('upload');
  };

  // Process and transition to Canvas
  const handleCompleteSourceEntry = (type: string, title?: string) => {
    setIsProcessingSource(true);
    setTimeout(() => {
      setIsProcessingSource(false);
      setActiveSourceModal(null);
      
      // Also register a new canvas item in list so user can see populated state
      const newCanvas: CanvasItem = {
        id: `canvas-${Date.now()}`,
        title: title || (type === 'upload' ? 'Quantum Mechanics Introduction' : type === 'paste' ? 'Linear Algebra Eigenvalues' : 'Photosynthesis & Cellular Respiration'),
        sourceType: (type === 'upload' ? 'pdf' : type === 'paste' ? 'text' : type === 'youtube' ? 'youtube' : 'link'),
        sourceName: title || (type === 'upload' ? 'Quantum_Notes.pdf' : type === 'paste' ? 'Pasted Study Text' : 'web_source.html'),
        updatedAt: 'Just now',
        elementsCount: {
          explanations: 3,
          questions: 8,
          visuals: 2,
        },
      };
      setCanvases((prev) => [newCanvas, ...prev]);

      success('Source Prepared', 'Launching your adaptive Canvas workspace...');
      onStartCanvas(type);
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleCompleteSourceEntry('upload', file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleAddSampleCanvas = () => {
    const sample: CanvasItem = {
      id: `canvas-sample-${Date.now()}`,
      title: 'Neural Networks & Backpropagation',
      sourceType: 'pdf',
      sourceName: 'DeepLearning_Chapter3.pdf',
      updatedAt: '2 hours ago',
      elementsCount: {
        explanations: 4,
        questions: 12,
        visuals: 3,
      },
    };
    setCanvases((prev) => [sample, ...prev]);
    info('Sample Canvas Added', 'Added a sample learning space to My Canvases.');
  };

  const transitionConfig = shouldReduceMotion
    ? { duration: 0.15 }
    : { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      id="noevis-home-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111827] select-none overflow-x-hidden flex"
    >
      {/* ================================================== */}
      {/* 1. DESKTOP FIXED LEFT SIDEBAR (1024px+)             */}
      {/* ================================================== */}
      <aside
        id="desktop-sidebar"
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] bg-[#FFFFFF] border-r border-[#E5E7EB] z-30 flex-col justify-between p-5 select-none"
      >
        {/* Top Section */}
        <div className="flex flex-col gap-6">
          {/* 1. NOEVIS AI Logo */}
          <div
            className="pt-1 px-1 cursor-pointer"
            onClick={() => setActiveNav('home')}
            title="NOEVIS AI Home"
          >
            <Logo size="sm" variant="full" showBadge={false} />
          </div>

          {/* 2. Primary CTA: + Start learning (Visually stronger than navigation items) */}
          <button
            type="button"
            id="sidebar-start-learning-btn"
            onClick={handleStartLearningClick}
            className="w-full h-[48px] px-4 bg-[#111827] hover:bg-[#1F2937] active:bg-[#030712] text-white rounded-[13px] font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Start learning</span>
          </button>

          {/* 3. Navigation Destinations (Exactly 6) */}
          <nav aria-label="Main Navigation" className="flex flex-col gap-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full h-[44px] px-3.5 rounded-[12px] flex items-center gap-3 text-[14.5px] transition-colors duration-180 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] ${
                    isActive
                      ? 'bg-[#EEF0FF] border border-[#DCE1FD] text-[#111827] font-semibold shadow-2xs'
                      : 'text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] font-medium'
                  }`}
                >
                  <Icon
                    className={`w-[19px] h-[19px] stroke-[2] transition-colors duration-180 ${
                      isActive ? 'text-[#4B5BEA]' : 'text-[#667085] group-hover:text-[#111827]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: User Profile & Account Affordance */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#111827] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <p className="text-[13px] font-semibold text-[#111827] truncate leading-snug">
                {userEmail}
              </p>
              <p className="text-[11.5px] text-[#667085] truncate">
                {studyContext}
              </p>
            </div>
            <Sliders className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>

          {onResetOnboarding && (
            <button
              type="button"
              onClick={onResetOnboarding}
              className="w-full px-2.5 py-1.5 text-[11.5px] font-medium text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              title="Reset Onboarding Setup"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span>Reset Learning Context</span>
            </button>
          )}
        </div>
      </aside>

      {/* ================================================== */}
      {/* 2. MAIN WORKSPACE CONTAINER (lg:pl-[260px])          */}
      {/* ================================================== */}
      <div className="flex-1 lg:pl-[260px] min-h-[100dvh] flex flex-col justify-between w-full">
        {/* TOP HEADER */}
        <header className="w-full h-[64px] sm:h-[70px] bg-[#FFFFFF] border-b border-[#E5E7EB] px-5 sm:px-8 md:px-12 flex items-center justify-between lg:justify-end shrink-0 z-20 sticky top-0">
          {/* Mobile/Tablet Left: Logo */}
          <div className="lg:hidden flex items-center">
            <Logo size="sm" variant="full" showBadge={false} />
          </div>

          {/* Right Controls: Search, Profile, Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Global Search Bar (Desktop) */}
            <div className="hidden md:flex items-center relative w-[280px] lg:w-[320px]">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleCompleteSourceEntry('paste', searchQuery.trim());
                  }
                }}
                placeholder="Search anything..."
                className="w-full h-[46px] pl-11 pr-4 bg-[#F7F8FA] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#4B5BEA] rounded-[13px] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none transition-all duration-150"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#111827] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Profile Avatar Button with Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                id="header-profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-[#EAECEF] hover:bg-[#D9DDE3] flex items-center justify-center text-[#111827] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
                aria-label="Profile"
                aria-expanded={showProfileMenu}
              >
                <User className="w-5 h-5 stroke-[2.2] text-[#374151]" />
              </button>

              {/* Profile Popover */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 z-50 text-left"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-[#F3F4F6]">
                      <div className="w-9 h-9 rounded-full bg-[#111827] text-white flex items-center justify-center text-sm font-bold">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-[#111827] truncate">{userEmail}</p>
                        <p className="text-xs text-[#667085]">Learner Profile</p>
                      </div>
                    </div>

                    <div className="py-3 border-b border-[#F3F4F6] flex flex-col gap-1.5 text-xs text-[#4B5563]">
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Age Group:</span>
                        <span className="font-semibold text-[#111827]">{ageGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Context:</span>
                        <span className="font-semibold text-[#111827]">{studyContext}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Confidence:</span>
                        <span className="font-semibold text-[#111827]">{confidence}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setActiveNav('settings');
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] flex items-center gap-2"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#667085]" />
                        <span>Manage Settings</span>
                      </button>

                      {onResetOnboarding && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileMenu(false);
                            onResetOnboarding();
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-[#4B5BEA] hover:bg-[#EEF0FF] flex items-center gap-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Onboarding Context</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#111827] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA]"
              aria-label="Menu"
              aria-expanded={showMobileMenu}
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </header>

        {/* ================================================== */}
        {/* MAIN BODY AREA — DEDICATED VIEW SWITCHER           */}
        {/* ================================================== */}
        <main className="w-full flex-1 flex flex-col items-center px-4 sm:px-8 md:px-12 py-8 sm:py-12 my-auto">
          {/* ------------------------------------------------ */}
          {/* TAB 1: HOME (THE MAIN LEARNING COMMAND CENTER)   */}
          {/* ------------------------------------------------ */}
          {activeNav === 'home' && (
            <motion.div
              key="home-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col items-center text-center"
            >
              {/* 1. HERO SECTION */}
              <div className="mb-8 sm:mb-10 text-center">
                <h1
                  id="home-hero-headline"
                  className="text-[34px] sm:text-[44px] md:text-[50px] font-bold text-[#111827] tracking-[-0.035em] leading-[1.08] mb-3"
                >
                  Start your learning journey.
                </h1>

                <p
                  id="home-hero-supporting"
                  className="text-[15.5px] sm:text-[17px] md:text-[18px] font-normal text-[#667085] tracking-[-0.01em] leading-[1.45] max-w-[620px] mx-auto"
                >
                  Bring something you want to learn. Noevis will turn it into an adaptive learning Canvas.
                </p>
              </div>

              {/* 2. PRIMARY START LEARNING CARD (LARGE, PREMIUM LIGHT SURFACE) */}
              <div
                id="start-learning-card"
                onClick={handleStartLearningClick}
                className="group w-full min-h-[145px] sm:min-h-[160px] md:min-h-[170px] p-5 sm:p-7 md:p-8 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#FCFDFF] rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] active:scale-[0.995] transition-all duration-200 cursor-pointer flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B5BEA] select-none"
              >
                {/* Left: Large Circular / Soft Icon Container */}
                <div className="w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] md:w-[114px] md:h-[114px] rounded-full border border-[#E5E7EB] bg-[#F9FAFB] group-hover:bg-[#F3F4F6] flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-[#111827] stroke-[1.8] group-hover:scale-110 transition-transform duration-200" />
                </div>

                {/* Center: Title & Supporting Copy */}
                <div className="flex-1 px-4 sm:px-6 md:px-8">
                  <h2 className="text-[20px] sm:text-[24px] md:text-[26px] font-bold text-[#111827] tracking-[-0.025em] leading-tight mb-1.5">
                    Start learning
                  </h2>
                  <p className="text-[14px] sm:text-[15.5px] md:text-[16.5px] font-normal text-[#667085] leading-[1.4] tracking-[-0.01em]">
                    Bring a source and Noevis will prepare your Canvas.
                  </p>
                </div>

                {/* Right: Forward Arrow */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 text-[#111827]">
                  <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2] group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </div>

              {/* 3. SOURCE INPUT ACTIONS (CLEAN HORIZONTAL ACTION ROW) */}
              <div className="w-full mt-6 sm:mt-8 relative" ref={moreWaysRef}>
                <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-1 sm:gap-x-2 text-sm font-medium text-[#111827]">
                  {/* Action 1: Upload a file */}
                  <button
                    type="button"
                    id="source-action-upload"
                    onClick={() => handleOpenSourceModal('upload')}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FFFFFF] hover:shadow-2xs rounded-xl hover:text-[#4B5BEA] border border-transparent hover:border-[#E5E7EB] transition-all cursor-pointer group"
                  >
                    <Upload className="w-4 h-4 text-[#667085] group-hover:text-[#4B5BEA] transition-colors stroke-[2]" />
                    <span>Upload a file</span>
                  </button>

                  <span className="hidden sm:inline-block h-4 w-[1px] bg-[#E5E7EB]" aria-hidden="true" />

                  {/* Action 2: Paste text */}
                  <button
                    type="button"
                    id="source-action-paste"
                    onClick={() => handleOpenSourceModal('paste')}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FFFFFF] hover:shadow-2xs rounded-xl hover:text-[#4B5BEA] border border-transparent hover:border-[#E5E7EB] transition-all cursor-pointer group"
                  >
                    <FileText className="w-4 h-4 text-[#667085] group-hover:text-[#4B5BEA] transition-colors stroke-[2]" />
                    <span>Paste text</span>
                  </button>

                  <span className="hidden sm:inline-block h-4 w-[1px] bg-[#E5E7EB]" aria-hidden="true" />

                  {/* Action 3: Add a link */}
                  <button
                    type="button"
                    id="source-action-link"
                    onClick={() => handleOpenSourceModal('link')}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FFFFFF] hover:shadow-2xs rounded-xl hover:text-[#4B5BEA] border border-transparent hover:border-[#E5E7EB] transition-all cursor-pointer group"
                  >
                    <LinkIcon className="w-4 h-4 text-[#667085] group-hover:text-[#4B5BEA] transition-colors stroke-[2]" />
                    <span>Add a link</span>
                  </button>

                  <span className="hidden sm:inline-block h-4 w-[1px] bg-[#E5E7EB]" aria-hidden="true" />

                  {/* Action 4: More ways (Opens clean Popover) */}
                  <button
                    type="button"
                    id="source-action-more"
                    onClick={() => setShowMoreWays(!showMoreWays)}
                    aria-expanded={showMoreWays}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#FFFFFF] hover:shadow-2xs rounded-xl hover:text-[#4B5BEA] border border-transparent hover:border-[#E5E7EB] transition-all cursor-pointer group"
                  >
                    <MoreHorizontal className="w-4 h-4 text-[#667085] group-hover:text-[#4B5BEA] transition-colors stroke-[2]" />
                    <span>More ways</span>
                  </button>
                </div>

                {/* Popover for "More ways" */}
                <AnimatePresence>
                  {showMoreWays && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2.5 w-60 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 text-left"
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenSourceModal('youtube')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F3F4F6] text-sm text-[#111827] font-medium transition-colors cursor-pointer"
                      >
                        <Youtube className="w-4 h-4 text-[#EF4444]" />
                        <span>YouTube Video</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenSourceModal('camera')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F3F4F6] text-sm text-[#111827] font-medium transition-colors cursor-pointer"
                      >
                        <Camera className="w-4 h-4 text-[#4B5BEA]" />
                        <span>Scan / Capture Note</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenSourceModal('voice')}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F3F4F6] text-sm text-[#111827] font-medium transition-colors cursor-pointer"
                      >
                        <Mic className="w-4 h-4 text-[#10B981]" />
                        <span>Voice Lecture</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowMoreWays(false);
                          info('Connectors', 'Google Drive, Notion, and Canvas LMS connectors enabled.');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#F3F4F6] text-sm text-[#111827] font-medium transition-colors cursor-pointer"
                      >
                        <Plug className="w-4 h-4 text-[#6366F1]" />
                        <span>Cloud Connectors</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. SHOW THE MAGIC: "WHAT CAN YOU LEARN WITH NOEVIS?" */}
              <div className="w-full mt-12 sm:mt-14 pt-8 border-t border-[#E5E7EB]/80 flex flex-col items-center">
                <span className="text-[11.5px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#667085] mb-4 sm:mb-5">
                  What can you learn with Noevis?
                </span>

                {/* Four Refined Lightweight Capability Cards */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
                  {/* Capability 1: Understand */}
                  <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#DCE1FD] hover:shadow-2xs transition-all flex flex-col justify-between group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] flex items-center justify-center text-[#4B5BEA]">
                        <Brain className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#111827]">Understand</h3>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Learn concepts clearly with adaptive explanations.
                    </p>
                  </div>

                  {/* Capability 2: Practice */}
                  <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#A7F3D0] hover:shadow-2xs transition-all flex flex-col justify-between group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
                        <Target className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#111827]">Practice</h3>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Test and strengthen your understanding with quiz loops.
                    </p>
                  </div>

                  {/* Capability 3: Visualize */}
                  <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#C7D2FE] hover:shadow-2xs transition-all flex flex-col justify-between group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#6366F1]">
                        <Eye className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#111827]">Visualize</h3>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Turn difficult ideas into visual knowledge graphs.
                    </p>
                  </div>

                  {/* Capability 4: Remember */}
                  <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#FDE68A] hover:shadow-2xs transition-all flex flex-col justify-between group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B]">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-[#111827]">Remember</h3>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Build recall with spaced revision and flashcard activities.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. MY CANVASES SECTION (NEW USER EMPTY STATE OR REAL CARDS) */}
              <div className="w-full mt-10 sm:mt-12 text-left">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                      My Canvases
                    </h3>
                    {canvases.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#EAECEF] text-xs font-semibold text-[#4B5563]">
                        {canvases.length}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {canvases.length === 0 ? (
                      <button
                        type="button"
                        onClick={handleAddSampleCanvas}
                        className="text-xs font-medium text-[#667085] hover:text-[#111827] underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        Preview Canvas Card
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveNav('canvases')}
                        className="text-xs font-semibold text-[#4B5BEA] hover:text-[#3B49C8] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View all</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* If user has zero canvases: SHOW BEAUTIFUL NEW-USER EMPTY STATE */}
                {canvases.length === 0 ? (
                  <div
                    id="new-user-empty-state"
                    className="w-full p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs"
                  >
                    <div className="text-center sm:text-left">
                      <h4 className="text-[15px] sm:text-base font-bold text-[#111827]">
                        Your learning spaces will appear here.
                      </h4>
                      <p className="text-xs sm:text-sm text-[#667085] mt-1 leading-relaxed">
                        Start with a file, text, or link and Noevis will prepare your first Canvas.
                      </p>
                    </div>

                    <button
                      type="button"
                      id="empty-state-start-canvas-btn"
                      onClick={() => handleOpenSourceModal('upload')}
                      className="h-[42px] px-5 rounded-[12px] bg-[#F7F8FA] hover:bg-[#EEF0FF] border border-[#E5E7EB] hover:border-[#DCE1FD] text-xs sm:text-sm font-semibold text-[#111827] hover:text-[#4B5BEA] flex items-center gap-2 transition-all cursor-pointer shrink-0"
                    >
                      <span>Start your first Canvas</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* If user has Canvases: LARGE PREMIUM CANVAS CARDS */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {canvases.map((canvas) => (
                      <div
                        key={canvas.id}
                        onClick={() => onStartCanvas(canvas.sourceType)}
                        className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#CBD5E1] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5BEA] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full border border-[#DCE1FD]">
                              {canvas.sourceType.toUpperCase()} SOURCE
                            </span>
                            <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {canvas.updatedAt}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-[#111827] group-hover:text-[#4B5BEA] transition-colors mb-1.5 line-clamp-1">
                            {canvas.title}
                          </h4>

                          <p className="text-xs text-[#667085] flex items-center gap-1.5 truncate mb-4">
                            <FileCode className="w-3.5 h-3.5 text-[#9CA3AF]" />
                            <span className="truncate">{canvas.sourceName}</span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#667085]">
                          <span className="font-medium">
                            {canvas.elementsCount.explanations} Explanations • {canvas.elementsCount.questions} MCQs
                          </span>
                          <span className="font-semibold text-[#111827] flex items-center gap-1 group-hover:text-[#4B5BEA] group-hover:translate-x-0.5 transition-all">
                            Open <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------ */}
          {/* TAB 2: MY CANVASES DEDICATED VIEW                */}
          {/* ------------------------------------------------ */}
          {activeNav === 'canvases' && (
            <motion.div
              key="canvases-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                    My Canvases
                  </h1>
                  <p className="text-sm text-[#667085] mt-0.5">
                    Your generated learning spaces, concept maps, and practice sessions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartLearningClick}
                  className="h-[42px] px-4 rounded-xl bg-[#111827] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#1F2937] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Canvas</span>
                </button>
              </div>

              {canvases.length === 0 ? (
                <div className="w-full p-10 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#4B5BEA] mb-3">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827]">No Canvases Created Yet</h3>
                  <p className="text-sm text-[#667085] max-w-sm mt-1 mb-6 leading-relaxed">
                    Upload a lecture PDF, paste raw notes, or link an article to create your first adaptive workspace.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenSourceModal('upload')}
                    className="px-5 py-2.5 rounded-xl bg-[#111827] text-white text-sm font-semibold hover:bg-[#1F2937] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Learning Source</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {canvases.map((canvas) => (
                    <div
                      key={canvas.id}
                      onClick={() => onStartCanvas(canvas.sourceType)}
                      className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-[#4B5BEA] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full border border-[#DCE1FD]">
                            {canvas.sourceType.toUpperCase()}
                          </span>
                          <span className="text-xs text-[#9CA3AF]">{canvas.updatedAt}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#111827] group-hover:text-[#4B5BEA] transition-colors mb-1">
                          {canvas.title}
                        </h3>
                        <p className="text-xs text-[#667085]">{canvas.sourceName}</p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#667085]">
                        <span>{canvas.elementsCount.explanations} Explanations • {canvas.elementsCount.questions} Questions</span>
                        <span className="font-semibold text-[#111827] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Open Canvas →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ------------------------------------------------ */}
          {/* TAB 3: LIBRARY DEDICATED VIEW                    */}
          {/* ------------------------------------------------ */}
          {activeNav === 'library' && (
            <motion.div
              key="library-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col text-left"
            >
              <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                  Library
                </h1>
                <p className="text-sm text-[#667085] mt-0.5">
                  Organized repository of summaries, flashcard decks, and revision sheets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] text-[#4B5BEA] flex items-center justify-center mb-3">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827]">Adaptive Notes</h3>
                  <p className="text-xs text-[#667085] mt-1">Generated structured notes from your uploaded materials.</p>
                  <span className="inline-block mt-4 text-[11px] font-semibold text-[#9CA3AF]">0 Saved</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-3">
                    <Target className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827]">Flashcard Decks</h3>
                  <p className="text-xs text-[#667085] mt-1">Spaced repetition decks ready for recall drills.</p>
                  <span className="inline-block mt-4 text-[11px] font-semibold text-[#9CA3AF]">0 Decks</span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:shadow-2xs transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center mb-3">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827]">Visual Maps</h3>
                  <p className="text-xs text-[#667085] mt-1">Connected concept graphs and relationship diagrams.</p>
                  <span className="inline-block mt-4 text-[11px] font-semibold text-[#9CA3AF]">0 Maps</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------ */}
          {/* TAB 4: HISTORY DEDICATED VIEW                    */}
          {/* ------------------------------------------------ */}
          {activeNav === 'history' && (
            <motion.div
              key="history-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col text-left"
            >
              <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                  Learning History
                </h1>
                <p className="text-sm text-[#667085] mt-0.5">
                  Timeline of your interactions, practice evaluations, and study milestones.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center text-center">
                <Clock className="w-8 h-8 text-[#9CA3AF] mb-2" />
                <h3 className="text-sm font-semibold text-[#111827]">History will track your learning journey</h3>
                <p className="text-xs text-[#667085] mt-1 max-w-sm">
                  As you complete adaptive quizzes and review concept breakdowns, your chronological records will appear here.
                </p>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------ */}
          {/* TAB 5: SETTINGS DEDICATED VIEW                   */}
          {/* ------------------------------------------------ */}
          {activeNav === 'settings' && (
            <motion.div
              key="settings-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col text-left"
            >
              <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                  Settings & Preferences
                </h1>
                <p className="text-sm text-[#667085] mt-0.5">
                  Calibrate your adaptive learning model and manage account details.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-[#111827]">Adaptive Profile Calibration</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block mb-1">Study Context</span>
                      <span className="font-semibold text-[#111827]">{studyContext}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block mb-1">Confidence Trajectory</span>
                      <span className="font-semibold text-[#111827]">{confidence}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                      <span className="text-[#9CA3AF] block mb-1">Target Age Cohort</span>
                      <span className="font-semibold text-[#111827]">{ageGroup}</span>
                    </div>
                  </div>

                  {onResetOnboarding && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onResetOnboarding}
                        className="px-4 py-2 rounded-xl bg-[#F7F8FA] hover:bg-[#EEF0FF] border border-[#E5E7EB] text-xs font-semibold text-[#4B5BEA] transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-run Onboarding Diagnostic</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">Account Information</h3>
                    <p className="text-xs text-[#667085] mt-0.5">Signed in as {userEmail}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#10B981]">
                    Active Learner
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------ */}
          {/* TAB 6: HELP DEDICATED VIEW                       */}
          {/* ------------------------------------------------ */}
          {activeNav === 'help' && (
            <motion.div
              key="help-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[800px] flex flex-col text-left"
            >
              <div className="mb-6 pb-4 border-b border-[#E5E7EB]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                  Help & Documentation
                </h1>
                <p className="text-sm text-[#667085] mt-0.5">
                  Guides on bringing sources, adaptive Canvas tools, and keyboard shortcuts.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-5 bg-white border border-[#E5E7EB] rounded-2xl">
                  <h3 className="text-sm font-bold text-[#111827] mb-1">How does source ingestion work?</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Upload any PDF, textbook chapter, lecture slide, or raw transcript. Noevis extracts core concepts, creates prerequisite relationships, and drafts interactive diagnostic questions automatically.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#E5E7EB] rounded-2xl">
                  <h3 className="text-sm font-bold text-[#111827] mb-1">What is an adaptive Canvas?</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    A Canvas is your personal learning environment. Unlike standard static chat, it pairs step-by-step explanations with dynamic difficulty adjustments that respond in real-time to your quiz performance.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="w-full pb-6 px-5 shrink-0" aria-hidden="true" />
      </div>

      {/* ================================================== */}
      {/* 3. INTERACTIVE SOURCE ENTRY MODALS                 */}
      {/* ================================================== */}
      <AnimatePresence>
        {activeSourceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setActiveSourceModal(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[22px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#E5E7EB] text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#4B5BEA] flex items-center justify-center">
                    {activeSourceModal === 'upload' && <Upload className="w-4 h-4" />}
                    {activeSourceModal === 'paste' && <FileText className="w-4 h-4" />}
                    {activeSourceModal === 'link' && <LinkIcon className="w-4 h-4" />}
                    {activeSourceModal === 'youtube' && <Youtube className="w-4 h-4 text-[#EF4444]" />}
                    {activeSourceModal === 'camera' && <Camera className="w-4 h-4" />}
                    {activeSourceModal === 'voice' && <Mic className="w-4 h-4 text-[#10B981]" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111827] capitalize">
                      {activeSourceModal === 'upload' && 'Upload Learning File'}
                      {activeSourceModal === 'paste' && 'Paste Study Material'}
                      {activeSourceModal === 'link' && 'Add Article or Doc Link'}
                      {activeSourceModal === 'youtube' && 'Add YouTube Lecture'}
                      {activeSourceModal === 'camera' && 'Scan Handwritten Notes'}
                      {activeSourceModal === 'voice' && 'Record Voice Lecture'}
                    </h3>
                    <p className="text-xs text-[#667085]">
                      Noevis will analyze this source and build your Canvas.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSourceModal(null)}
                  className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Based on Type */}
              <div className="py-5">
                {/* 1. UPLOAD FILE */}
                {activeSourceModal === 'upload' && (
                  <div className="flex flex-col gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.txt,.epub,.pptx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#D1D5DB] hover:border-[#4B5BEA] bg-[#F9FAFB] hover:bg-[#EEF0FF]/30 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-center text-[#4B5BEA] shadow-2xs mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-[#111827]">
                        Click to select or drag and drop a file
                      </p>
                      <p className="text-xs text-[#667085] mt-1">
                        PDF, DOCX, TXT, EPUB, or PPTX up to 50MB
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-2">
                        Or test with sample materials:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleCompleteSourceEntry('upload', 'Quantum Mechanics Principles')}
                          className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-xs font-medium text-[#111827] transition-colors cursor-pointer"
                        >
                          📄 Quantum Mechanics.pdf
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCompleteSourceEntry('upload', 'Cellular Biology Chapter 4')}
                          className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-xs font-medium text-[#111827] transition-colors cursor-pointer"
                        >
                          📄 Cellular Biology.pdf
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PASTE TEXT */}
                {activeSourceModal === 'paste' && (
                  <div className="flex flex-col gap-3">
                    <textarea
                      rows={5}
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      placeholder="Paste textbook excerpts, lecture transcripts, or raw notes here..."
                      className="w-full p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:bg-[#FFFFFF] rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none resize-none transition-all"
                    />

                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span>{pasteText.length} characters</span>
                      <button
                        type="button"
                        onClick={() =>
                          setPasteText(
                            'Photosynthesis is a biological process used by plants, algae, and certain bacteria to convert light energy into chemical energy stored in glucose molecules. Chloroplasts contain chlorophyll pigments that absorb blue and red light while reflecting green.'
                          )
                        }
                        className="text-[#4B5BEA] hover:underline cursor-pointer font-medium"
                      >
                        Insert sample excerpt
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. ADD LINK */}
                {activeSourceModal === 'link' && (
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://en.wikipedia.org/wiki/Neural_network"
                        className="w-full h-11 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:bg-white rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-[#667085]">
                      Noevis will scrape and summarize the clean text from the provided webpage.
                    </p>
                  </div>
                )}

                {/* 4. YOUTUBE */}
                {activeSourceModal === 'youtube' && (
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Youtube className="w-4 h-4 text-[#EF4444] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full h-11 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#4B5BEA] focus:bg-white rounded-xl text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-[#667085]">
                      Noevis extracts the video transcript and timestamped chapters.
                    </p>
                  </div>
                )}

                {/* 5. SCAN / CAMERA */}
                {activeSourceModal === 'camera' && (
                  <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex flex-col items-center text-center">
                    <Camera className="w-10 h-10 text-[#4B5BEA] mb-2" />
                    <p className="text-sm font-semibold text-[#111827]">Optical OCR Ready</p>
                    <p className="text-xs text-[#667085] mt-1 max-w-xs">
                      Take a photo or upload an image of handwritten notes or whiteboard diagrams.
                    </p>
                  </div>
                )}

                {/* 6. VOICE */}
                {activeSourceModal === 'voice' && (
                  <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-2 animate-pulse">
                      <Mic className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#111827]">Voice Dictation Ready</p>
                    <p className="text-xs text-[#667085] mt-1 max-w-xs">
                      Speak or record a lecture segment. Speech-to-text will transcribe your notes.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setActiveSourceModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isProcessingSource}
                  onClick={() => {
                    if (activeSourceModal === 'paste') {
                      handleCompleteSourceEntry('paste', 'Pasted Study Excerpt');
                    } else if (activeSourceModal === 'link') {
                      handleCompleteSourceEntry('link', linkUrl || 'Web Article Study Space');
                    } else if (activeSourceModal === 'youtube') {
                      handleCompleteSourceEntry('youtube', 'YouTube Lecture Workspace');
                    } else {
                      handleCompleteSourceEntry(activeSourceModal || 'upload');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  {isProcessingSource ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Analyzing Source...</span>
                    </div>
                  ) : (
                    <span>Create Canvas</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================== */}
      {/* 4. MOBILE SEARCH MODAL OVERLAY                      */}
      {/* ================================================== */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-start justify-center p-4 pt-16"
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-4 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-5 h-5 text-[#9CA3AF]" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        setShowSearchModal(false);
                        handleCompleteSourceEntry('paste', searchQuery.trim());
                      }
                    }}
                    placeholder="Search anything..."
                    className="w-full bg-transparent text-base text-[#111827] focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="p-1 rounded-full text-[#667085] hover:bg-[#F3F4F6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider px-1">
                  Quick Topics
                </span>
                {['Machine Learning Concepts', 'Linear Algebra Proofs', 'Organic Chemistry Basics'].map(
                  (topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setShowSearchModal(false);
                        handleCompleteSourceEntry('paste', topic);
                      }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-[#F7F8FA] text-sm text-[#111827] flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#4B5BEA]" />
                      <span>{topic}</span>
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================== */}
      {/* 5. MOBILE NAVIGATION DRAWER (<1024px)               */}
      {/* ================================================== */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-[280px] sm:w-[300px] bg-[#FFFFFF] border-r border-[#E5E7EB] z-50 p-5 flex flex-col justify-between lg:hidden shadow-2xl"
            >
              {/* Header inside drawer */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3F4F6]">
                  <Logo size="sm" variant="full" showBadge={false} />
                  <button
                    type="button"
                    onClick={() => setShowMobileMenu(false)}
                    className="p-1 text-[#667085] hover:text-[#111827] rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleStartLearningClick();
                  }}
                  className="w-full h-[46px] px-4 bg-[#111827] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Start learning</span>
                </button>

                {/* Drawer Navigation (Exact 6 Destinations) */}
                <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full h-[44px] px-3.5 rounded-xl flex items-center gap-3 text-[14.5px] transition-colors cursor-pointer text-left ${
                          isActive
                            ? 'bg-[#EEF0FF] border border-[#DCE1FD] text-[#111827] font-semibold'
                            : 'text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] font-medium'
                        }`}
                      >
                        <Icon
                          className={`w-[19px] h-[19px] stroke-[2] ${
                            isActive ? 'text-[#4B5BEA]' : 'text-[#667085]'
                          }`}
                        />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Profile Section in Drawer */}
              <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="w-9 h-9 rounded-full bg-[#111827] text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-[#111827] truncate">{userEmail}</p>
                    <p className="text-[11px] text-[#667085]">Context: {studyContext}</p>
                  </div>
                </div>

                {onResetOnboarding && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileMenu(false);
                      onResetOnboarding();
                    }}
                    className="w-full px-2 py-1.5 text-[11.5px] font-medium text-[#667085] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span>Reset Onboarding Context</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
