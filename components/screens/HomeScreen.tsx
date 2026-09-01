'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '@/components/design-system/Logo';
import { useToast } from '@/components/design-system/Toast';
import { OnboardingData } from './OnboardingScreen';
import {
  Sparkle,
  Diamond,
  LayoutGrid,
  ArrowUpRight,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  HelpCircle,
  Plus,
  Search,
  ArrowRight,
  FileText,
  FileUp,
  Clipboard,
  Link as LinkIcon,
  MoreHorizontal,
  Menu,
  X,
  RotateCcw,
  Youtube,
  Camera,
  Mic,
  Plug,
  Folder,
  FolderOpen,
  ChevronDown,
  Clock,
  FileCode,
  BookOpen,
  Home,
  Layers,
  Bookmark,
  History,
  Check,
  Monitor,
} from 'lucide-react';

interface HomeScreenProps {
  userEmail?: string;
  onboardingData?: Partial<OnboardingData>;
  onStartCanvas: (sourceType?: string) => void;
  onResetOnboarding?: () => void;
}

type NavItemType = 'home' | 'canvases' | 'library' | 'history' | 'settings' | 'help';
type SourceModalType = 'all' | 'upload' | 'paste' | 'link' | 'youtube' | 'camera' | 'voice' | 'connectors' | 'more' | 'record' | null;

interface CanvasItem {
  id: string;
  title: string;
  sourceType: 'pdf' | 'text' | 'link' | 'youtube' | 'voice';
  sourceName: string;
  updatedAt: string;
  elementsCount: {
    explanations: number;
    questions: number;
    visuals: number;
  };
}

const CanvasMenuPopover: React.FC<{
  canvas: CanvasItem;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}> = ({ canvas, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(canvas.title);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', clickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative shrink-0 flex items-center" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-7 h-7 rounded-lg hover:bg-[#EFEFEF] flex items-center justify-center text-[#6B7280] hover:text-[#111111] cursor-pointer"
        title="More actions"
        aria-label="More actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 w-[160px] bg-white border border-[#E5E7EB] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-1 z-50 flex flex-col">
          {isRenaming ? (
            <div className="p-1.5 flex flex-col gap-1.5">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && renameValue.trim()) {
                    onRename(renameValue.trim());
                    setIsRenaming(false);
                    setIsOpen(false);
                  }
                }}
                className="w-full text-xs border border-[#E5E7EB] rounded px-1.5 py-1 text-[#111111] focus:outline-none focus:border-[#111111]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  if (renameValue.trim()) {
                    onRename(renameValue.trim());
                    setIsRenaming(false);
                    setIsOpen(false);
                  }
                }}
                className="w-full bg-[#111111] hover:bg-[#222222] text-white text-[10px] font-semibold py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenaming(true);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-[#F5F5F5] text-xs text-[#111111] font-medium"
              >
                Rename
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-red-50 text-xs text-red-600 font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userEmail = 'satyam@example.com',
  onboardingData,
  onStartCanvas,
  onResetOnboarding,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { success, info } = useToast();

  // Navigation State (Exact 6 destinations)
  const [activeNav, setActiveNav] = useState<NavItemType>('home');

  // Sidebar Open / Collapsed State (Desktop)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Source Entry Modals & Popovers
  const [activeSourceModal, setActiveSourceModal] = useState<SourceModalType>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Source Form Input States
  const [pasteText, setPasteText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessingSource, setIsProcessingSource] = useState(false);

  // New premium interactive source analysis and progress states
  const [selectedUploadFile, setSelectedUploadFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const [successCanvasType, setSuccessCanvasType] = useState<string>('upload');
  const [successCanvasTitle, setSuccessCanvasTitle] = useState<string>('');

  // Canvases State (Starts clean and empty for new user)
  const [canvases, setCanvases] = useState<CanvasItem[]>([]);

  // Refs
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive display user name and initials
  const userName = userEmail.includes('satyam')
    ? 'Satyam Yadav'
    : userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const userInitials = userEmail.includes('satyam')
    ? 'SY'
    : userEmail.substring(0, 2).toUpperCase();

  const studyContext = onboardingData?.studyContext || 'College & University';
  const confidence = onboardingData?.confidenceLevel || 'Getting familiar';
  const ageGroup = onboardingData?.ageGroup || '18+';

  const handleTryCloseModal = () => {
    const hasUnsaved = (pasteText && pasteText.trim() !== '') || (linkUrl && linkUrl.trim() !== '') || (youtubeUrl && youtubeUrl.trim() !== '') || selectedUploadFile !== null;
    if (hasUnsaved) {
      if (window.confirm('Do you want to discard your learning material draft?')) {
        setPasteText('');
        setLinkUrl('');
        setYoutubeUrl('');
        setSelectedUploadFile(null);
        setUploadProgress(0);
        setIsUploading(false);
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        setShowSuccessState(false);
        setActiveSourceModal(null);
      }
    } else {
      // Just clear helper states as well on simple close
      setPasteText('');
      setLinkUrl('');
      setYoutubeUrl('');
      setSelectedUploadFile(null);
      setUploadProgress(0);
      setIsUploading(false);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setShowSuccessState(false);
      setActiveSourceModal(null);
    }
  };

  // Global Escape handler and click outside
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMobileDrawer(false);
        // Safely close the active source modal with unsaved draft detection
        if (activeSourceModal) {
          handleTryCloseModal();
        }
        setShowProfileMenu(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pasteText, linkUrl, youtubeUrl, selectedUploadFile, activeSourceModal]);

  // Navigation items definition (Exact 6 destinations)
  const mainNavItems = [
    { id: 'home' as NavItemType, label: 'Start', icon: Sparkle },
    { id: 'canvases' as NavItemType, label: 'Canvases', icon: Diamond },
    { id: 'library' as NavItemType, label: 'Library', icon: LayoutGrid },
    { id: 'history' as NavItemType, label: 'Activity', icon: ArrowUpRight },
  ];

  const systemNavItems = [
    { id: 'settings' as NavItemType, label: 'Settings', icon: Settings },
    { id: 'help' as NavItemType, label: 'Help', icon: HelpCircle },
  ];

  const handleNavClick = (navItem: NavItemType) => {
    setActiveNav(navItem);
    setShowMobileDrawer(false);
  };

  // 1. Direct native file upload trigger
  const handleDirectUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Helper to trigger simulated file upload inside the panel
  const startFileUploadingSimulation = (fileName: string, fileSize: string) => {
    setSelectedUploadFile({ name: fileName, size: fileSize });
    setUploadProgress(0);
    setIsUploading(true);
    setActiveSourceModal('upload');

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsUploading(false);
      }
      setUploadProgress(currentProgress);
    }, 150);
  };

  // Handle actual file picked from native dialog
  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      startFileUploadingSimulation(file.name, sizeStr);
    }
  };

  // 2. Direct Paste trigger
  const handleDirectPasteClick = () => {
    setActiveSourceModal('paste');
  };

  // 3. Direct Link trigger
  const handleDirectLinkClick = () => {
    setActiveSourceModal('link');
  };

  // 4. More trigger (remaining sources)
  const handleDirectMoreClick = () => {
    setActiveSourceModal('more');
  };

  // 5. Large Start Learning Card trigger (all supported sources)
  const handleUniversalStartLearningClick = () => {
    setActiveSourceModal('all');
  };

  // Simulated premium interactive analysis flow leading to Success State
  const handleAnalyzeAndLaunch = (type: string, title?: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setSuccessCanvasType(type);
    
    const formattedTitle = title || (
      type === 'upload' ? (selectedUploadFile?.name.replace(/\.[^/.]+$/, '') || 'Uploaded Study Material') :
      type === 'paste' ? 'Structured Text Notes' :
      type === 'youtube' ? 'YouTube Lecture Workspace' :
      type === 'link' ? 'Web Article Analysis' :
      type === 'camera' ? 'Scan / Photo OCR Workspace' :
      type === 'voice' ? 'Voice Lecture Concept Workspace' :
      'Adaptive Learning Space'
    );
    setSuccessCanvasTitle(formattedTitle);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsAnalyzing(false);
        setShowSuccessState(true);
      }
      setAnalysisProgress(progress);
    }, 180);
  };

  // Executed on confirming success state to start the workspace
  const handleFinalLaunch = () => {
    const type = successCanvasType;
    const title = successCanvasTitle;

    // Reset helper states
    setPasteText('');
    setLinkUrl('');
    setYoutubeUrl('');
    setSelectedUploadFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setShowSuccessState(false);
    setActiveSourceModal(null);

    // Register canvas item in list so user can see it in home grid
    const newCanvas: CanvasItem = {
      id: `canvas-${Date.now()}`,
      title: title,
      sourceType:
        type === 'upload' ? 'pdf' : type === 'paste' ? 'text' : type === 'youtube' ? 'youtube' : 'link',
      sourceName:
        type === 'upload' ? (selectedUploadFile?.name || 'Lecture_Notes.pdf') :
        type === 'paste' ? 'Pasted Text Excerpt' :
        type === 'youtube' ? (youtubeUrl || 'youtube_video.mp4') :
        type === 'link' ? (linkUrl || 'web_source.html') :
        'source_material.txt',
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
  };

  // Fallback for legacy calls
  const handleProcessAndLaunch = (type: string, title?: string) => {
    handleAnalyzeAndLaunch(type, title);
  };

  const transitionConfig = shouldReduceMotion
    ? { duration: 0.15 }
    : { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div
      id="noevis-home-screen"
      className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111111] select-none overflow-x-hidden flex"
    >
      {/* Hidden native file input for direct upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.mp3,.mp4,.wav,.m4a,.png,.jpg,.jpeg"
        onChange={handleNativeFileUpload}
        className="hidden"
      />

      {/* ================================================== */}
      {/* 1. DESKTOP SIDEBAR (EXPANDED 280px / COLLAPSED 72px) */}
      {/* ================================================== */}
      <aside
        id="desktop-sidebar"
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 bg-[#FFFFFF] border-r border-[#E5E7EB] z-30 flex-col justify-between select-none transition-all duration-200 ease-out ${
          isSidebarOpen ? 'w-[280px] p-5' : 'w-[72px] py-5 px-3 items-center'
        }`}
      >
        {isSidebarOpen ? (
          /* ---------------- EXPANDED SIDEBAR (280px) ---------------- */
          <div className="flex flex-col h-full w-full justify-between overflow-hidden">
            {/* Top Container */}
            <div className="flex flex-col gap-5 w-full shrink-0">
              {/* Header: Logo and PanelLeftClose Collapse Control */}
              <div className="flex items-center justify-between pt-1">
                <div
                  className="cursor-pointer"
                  onClick={() => setActiveNav('home')}
                  title="NOEVIS AI Home"
                >
                  <Logo size="sm" variant="full" showBadge={false} />
                </div>

                {/* Collapse Button */}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  title="Collapse navigation"
                  aria-label="Collapse navigation"
                >
                  <PanelLeftClose className="w-5 h-5 stroke-[1.9] text-[#111111]" />
                </button>
              </div>

              {/* Start Learning Action Button */}
              <button
                type="button"
                id="sidebar-start-learning-btn"
                onClick={handleUniversalStartLearningClick}
                className="w-full h-[50px] px-4 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EFEFEF] border border-[#E5E7EB] rounded-[12px] text-[15px] font-semibold text-[#111111] flex items-center gap-3 transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus-visible:outline-none"
              >
                <Plus className="w-5 h-5 stroke-[2.2] text-[#111111]" />
                <span>Start learning</span>
              </button>

              {/* Primary Navigation Items */}
              <nav aria-label="Main Navigation" className="flex flex-col gap-2">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <button
                      key={item.id}
                      id={`sidebar-nav-${item.id}`}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full h-[50px] px-4 rounded-[12px] flex items-center gap-3.5 text-[17px] transition-colors duration-150 cursor-pointer text-left focus-visible:outline-none ${
                        isActive
                          ? 'bg-[#F1F1F1] text-[#111111] font-semibold'
                          : 'text-[#111111] hover:bg-[#F5F5F5] font-medium'
                      }`}
                    >
                      <Icon className="w-[23px] h-[23px] stroke-[1.8] text-[#111111]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Middle Section (Scrollable Dynamic Content) */}
            <div className="flex-1 overflow-y-auto my-3 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {canvases.length > 0 && (
                <div className="flex flex-col gap-5">
                  {/* Recent List */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between px-3 text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase">
                      <span>Recent</span>
                      <button
                        type="button"
                        onClick={() => setActiveNav('history')}
                        className="hover:underline text-[11px] normal-case font-medium text-[#111111] cursor-pointer"
                      >
                        View all
                      </button>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {canvases.slice(0, 4).map((canvas) => (
                        <button
                          key={`recent-${canvas.id}`}
                          type="button"
                          onClick={() => onStartCanvas(canvas.sourceType)}
                          className="w-full h-[38px] px-3 rounded-[10px] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2.5 text-[14px] text-left text-[#111111] font-medium truncate cursor-pointer"
                        >
                          <Clock className="w-4 h-4 text-[#6B7280] shrink-0" />
                          <span className="truncate flex-1">{canvas.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Canvases List */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between px-3 text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase">
                      <span>Canvases</span>
                      <button
                        type="button"
                        onClick={() => setActiveNav('canvases')}
                        className="hover:underline text-[11px] normal-case font-medium text-[#111111] cursor-pointer"
                      >
                        View all
                      </button>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {canvases.map((canvas) => (
                        <div
                          key={`canvas-sidebar-${canvas.id}`}
                          className="w-full h-[38px] px-3 rounded-[10px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-between gap-2 text-[14px] text-[#111111] font-medium group relative"
                        >
                          <button
                            type="button"
                            onClick={() => onStartCanvas(canvas.sourceType)}
                            className="flex-1 flex items-center gap-2.5 text-left truncate cursor-pointer h-full"
                          >
                            <Diamond className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                            <span className="truncate">{canvas.title}</span>
                          </button>
                          
                          <CanvasMenuPopover
                            canvas={canvas}
                            onDelete={() => {
                              setCanvases((prev) => prev.filter((c) => c.id !== canvas.id));
                              success('Canvas deleted', 'Learning workspace has been removed.');
                            }}
                            onRename={(newTitle) => {
                              setCanvases((prev) =>
                                prev.map((c) => (c.id === canvas.id ? { ...c, title: newTitle } : c))
                              );
                              success('Canvas renamed', `Workspace title updated to "${newTitle}"`);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Container */}
            <div className="flex flex-col gap-4 pt-3 border-t border-[#E5E7EB] shrink-0">
              {/* System Navigation Items */}
              <nav aria-label="System Navigation" className="flex flex-col gap-2">
                {systemNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <button
                      key={item.id}
                      id={`sidebar-nav-${item.id}`}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full h-[48px] px-4 rounded-[12px] flex items-center gap-3.5 text-[17px] transition-colors duration-150 cursor-pointer text-left focus-visible:outline-none ${
                        isActive
                          ? 'bg-[#F1F1F1] text-[#111111] font-semibold'
                          : 'text-[#111111] hover:bg-[#F5F5F5] font-medium'
                      }`}
                    >
                      <Icon className="w-[23px] h-[23px] stroke-[1.8] text-[#111111]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Profile area */}
              <div className="relative" ref={profileMenuRef}>
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-full h-[58px] bg-[#FFFFFF] border border-[#E5E7EB] rounded-[14px] p-2.5 flex items-center justify-between hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-9 h-9 rounded-full bg-[#111111] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                      {userInitials}
                    </div>
                    <div className="truncate text-left">
                      <p className="text-[13.5px] font-semibold text-[#111111] truncate leading-tight">
                        {userName}
                      </p>
                      <p className="text-[11.5px] text-[#6B7280] truncate mt-0.5">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#111111] shrink-0 ml-1.5" />
                </div>

                {/* Profile popover */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-[66px] left-0 right-0 bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-2.5 text-left flex flex-col gap-1 z-50"
                    >
                      <div className="px-2 py-1.5 border-b border-[#E5E7EB] text-xs text-[#6B7280]">
                        <p className="font-semibold text-[#111111] text-[13px]">{userName}</p>
                        <p className="text-[11px] mt-0.5">{studyContext} • {confidence}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setActiveNav('settings');
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#6B7280]" />
                        <span>Manage Settings</span>
                      </button>

                      {onResetOnboarding && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileMenu(false);
                            onResetOnboarding();
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Reset Onboarding</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          /* ---------------- COLLAPSED RAIL (72px) ---------------- */
          <div className="flex flex-col h-full w-full justify-between items-center overflow-hidden">
            {/* Top section */}
            <div className="flex flex-col items-center gap-5 w-full">
              {/* Logo Mark & Reopen */}
              <div className="flex flex-col items-center gap-3 w-full">
                <div
                  className="cursor-pointer py-1 flex items-center justify-center"
                  onClick={() => setActiveNav('home')}
                  title="NOEVIS AI Home"
                >
                  <Logo size="xs" variant="mark" showBadge={false} />
                </div>

                {/* Expand Button */}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  title="Expand navigation"
                  aria-label="Expand navigation"
                >
                  <PanelLeftOpen className="w-5 h-5 stroke-[1.9] text-[#111111]" />
                </button>
              </div>

              {/* Start Learning (Plus Only) */}
              <div className="relative group w-full flex justify-center">
                <button
                  type="button"
                  onClick={handleUniversalStartLearningClick}
                  className="w-11 h-11 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EFEFEF] border border-[#E5E7EB] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Start learning"
                >
                  <Plus className="w-5 h-5 stroke-[2.2] text-[#111111]" />
                </button>
                {/* Premium Tooltip */}
                <div className="pointer-events-none absolute left-[56px] top-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-[#E5E7EB] text-[#111111] text-xs font-semibold px-2.5 py-1 rounded-[8px] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.06)] z-50">
                  Start learning
                </div>
              </div>

              {/* Main Navigation Icons */}
              <nav aria-label="Rail Main Navigation" className="flex flex-col gap-1.5 w-full items-center">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <div key={item.id} className="relative group w-full flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-11 h-11 rounded-[12px] flex items-center justify-center transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#F1F1F1] text-[#111111]'
                            : 'text-[#111111] hover:bg-[#F5F5F5]'
                        }`}
                        aria-label={item.label}
                      >
                        <Icon className="w-5 h-5 stroke-[1.8] text-[#111111]" />
                      </button>
                      {/* Premium Tooltip */}
                      <div className="pointer-events-none absolute left-[56px] top-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-[#E5E7EB] text-[#111111] text-xs font-semibold px-2.5 py-1 rounded-[8px] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.06)] z-50">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* System Navigation Icons */}
              <nav aria-label="Rail System Navigation" className="flex flex-col gap-1.5 w-full items-center">
                {systemNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <div key={item.id} className="relative group w-full flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-11 h-11 rounded-[12px] flex items-center justify-center transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#F1F1F1] text-[#111111]'
                            : 'text-[#111111] hover:bg-[#F5F5F5]'
                        }`}
                        aria-label={item.label}
                      >
                        <Icon className="w-5 h-5 stroke-[1.8] text-[#111111]" />
                      </button>
                      {/* Premium Tooltip */}
                      <div className="pointer-events-none absolute left-[56px] top-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-[#E5E7EB] text-[#111111] text-xs font-semibold px-2.5 py-1 rounded-[8px] whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.06)] z-50">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Profile Avatar */}
              <div className="relative flex justify-center pb-1">
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-[#111111] text-white text-[12px] font-bold flex items-center justify-center shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                  title={userName}
                >
                  {userInitials}
                </div>

                {/* Collapsed Profile Popover */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.97, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-0 left-[56px] w-[220px] bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-2.5 text-left flex flex-col gap-1 z-50"
                    >
                      <div className="px-2 py-1.5 border-b border-[#E5E7EB] text-xs text-[#6B7280]">
                        <p className="font-semibold text-[#111111] text-[13px]">{userName}</p>
                        <p className="text-[11px] mt-0.5">{userEmail}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setActiveNav('settings');
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-[#6B7280]" />
                        <span>Manage Settings</span>
                      </button>

                      {onResetOnboarding && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileMenu(false);
                            onResetOnboarding();
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-[10px] text-xs font-medium text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Reset Onboarding</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ================================================== */}
      {/* 2. MAIN CONTENT VIEWPORT CONTAINER                 */}
      {/* ================================================== */}
      <div
        className={`flex-1 min-h-[100dvh] flex flex-col justify-between w-full transition-all duration-200 ease-out ${
          isSidebarOpen ? 'lg:pl-[280px] lg:blur-[2px] lg:opacity-[0.88]' : 'lg:pl-[72px] lg:blur-0 lg:opacity-100'
        }`}
      >
        {/* TOP HEADER AREA (NO full-width divider line across page) */}
        <header className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 pb-2 flex items-center justify-between shrink-0 z-20">
          {/* Left: Mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setShowMobileDrawer(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Logo size="xs" variant="full" showBadge={false} />
            </div>
          </div>

          {/* Right: Search input & Avatar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input (280-340px desktop, 46-50px height) */}
            <div className="relative">
              <div className="flex items-center w-[200px] sm:w-[260px] md:w-[300px] lg:w-[320px] h-[46px] px-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[14px] text-sm focus-within:border-[#111111] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                <Search className="w-4 h-4 text-[#9CA3AF] mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleProcessAndLaunch('paste', searchQuery.trim());
                    }
                  }}
                  placeholder="Search anything..."
                  className="w-full bg-transparent text-xs sm:text-[13.5px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
                />
              </div>
            </div>

            {/* User Avatar Circle */}
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center shrink-0">
                {userInitials}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#111111]" />
            </div>
          </div>
        </header>

        {/* ================================================== */}
        {/* MAIN BODY AREA — HOME VIEW                         */}
        {/* ================================================== */}
        <main className="w-full flex-1 flex flex-col items-center px-6 sm:px-10 lg:px-12 py-6 sm:py-8 my-auto">
          {/* TAB: HOME VIEW */}
          {activeNav === 'home' && (
            <motion.div
              key="home-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col items-start text-left"
            >
              {/* 1. HERO SECTION (Spacious, deliberate desktop rhythm) */}
              <div className="mt-8 sm:mt-12 lg:mt-14 mb-8 sm:mb-10 text-left">
                <h1
                  id="home-hero-headline"
                  className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[54px] font-bold text-[#111111] tracking-[-0.035em] leading-[1.08] mb-3"
                >
                  Ready when you are.
                </h1>

                <p
                  id="home-hero-subheading"
                  className="text-[15.5px] sm:text-[17px] md:text-[18px] font-normal text-[#6B7280] tracking-[-0.01em] leading-[1.4]"
                >
                  Start with something you’re learning.
                </p>
              </div>

              {/* 2. PRIMARY START LEARNING CARD (LARGE HORIZONTAL ROUNDED CARD) */}
              <div
                id="start-learning-card"
                onClick={handleUniversalStartLearningClick}
                className="group w-full min-h-[190px] sm:min-h-[200px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F7F7F7] rounded-[24px] p-7 sm:p-9 transition-all duration-200 ease-out cursor-pointer flex items-center justify-between text-left shadow-[0_2px_12px_rgba(0,0,0,0.02)] select-none"
              >
                {/* Left: Large subtle plus circle (88-104px diameter) */}
                <div className="w-[88px] h-[88px] sm:w-[98px] sm:h-[98px] rounded-full border border-dashed border-[#CBD5E1] bg-white flex items-center justify-center shrink-0 transition-colors">
                  <Plus className="w-8 h-8 text-[#111111] stroke-[1.6]" />
                </div>

                {/* Center: Title & Supporting Copy */}
                <div className="flex-1 px-6 sm:px-8">
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-[#111111] tracking-[-0.025em] leading-tight mb-1.5">
                    Start learning
                  </h2>
                  <p className="text-[15px] sm:text-[16.5px] font-normal text-[#6B7280] leading-[1.4] tracking-[-0.01em]">
                    Bring something you’re learning.
                  </p>
                </div>

                {/* Right: Circular outline with right arrow (52-60px) */}
                <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full border border-[#E5E7EB] bg-white group-hover:border-[#CBD5E1] flex items-center justify-center shrink-0 text-[#111111] transition-colors">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

              {/* 3. SOURCE ACTIONS ROW (LIGHTWEIGHT UTILITY ROW) */}
              <div className="w-full mt-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                {/* Action 1: Upload (Direct File Picker) */}
                <button
                  type="button"
                  id="source-action-upload"
                  onClick={handleDirectUploadClick}
                  className="flex-1 flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[14px] hover:bg-[#F5F5F5] transition-colors cursor-pointer text-left group"
                >
                  <FileText className="w-5 h-5 text-[#111111] stroke-[1.8] shrink-0" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111] leading-tight">
                      Upload
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 leading-tight">
                      File, audio, video
                    </p>
                  </div>
                </button>

                {/* Action 2: Paste (Direct Text Input) */}
                <button
                  type="button"
                  id="source-action-paste"
                  onClick={handleDirectPasteClick}
                  className="flex-1 flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[14px] hover:bg-[#F5F5F5] transition-colors cursor-pointer text-left group"
                >
                  <Clipboard className="w-5 h-5 text-[#111111] stroke-[1.8] shrink-0" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111] leading-tight">
                      Paste
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 leading-tight">
                      Text or content
                    </p>
                  </div>
                </button>

                {/* Action 3: Link (Direct URL Input) */}
                <button
                  type="button"
                  id="source-action-link"
                  onClick={handleDirectLinkClick}
                  className="flex-1 flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[14px] hover:bg-[#F5F5F5] transition-colors cursor-pointer text-left group"
                >
                  <LinkIcon className="w-5 h-5 text-[#111111] stroke-[1.8] shrink-0" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111] leading-tight">
                      Link
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 leading-tight">
                      YouTube, website or any link
                    </p>
                  </div>
                </button>

                {/* Action 4: More (Remaining Sources) */}
                <button
                  type="button"
                  id="source-action-more"
                  onClick={handleDirectMoreClick}
                  className="flex-1 flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[14px] hover:bg-[#F5F5F5] transition-colors cursor-pointer text-left group"
                >
                  <MoreHorizontal className="w-5 h-5 text-[#111111] stroke-[1.8] shrink-0" />
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111] leading-tight">
                      More
                    </h3>
                    <p className="text-[12px] text-[#6B7280] mt-0.5 leading-tight">
                      YouTube, scan, voice & more
                    </p>
                  </div>
                </button>
              </div>

              {/* 4. MY CANVASES SECTION */}
              <div className="w-full mt-12 sm:mt-14 text-left">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#111111] tracking-[-0.02em]">
                    My Canvases
                  </h3>

                  <button
                    type="button"
                    onClick={() => setActiveNav('canvases')}
                    className="text-[13.5px] font-medium text-[#111111] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Premium Dashed Creation Card */}
                  <div
                    onClick={handleUniversalStartLearningClick}
                    className="p-5 min-h-[160px] rounded-[20px] bg-[#FFFFFF] border border-dashed border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9F9] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <Plus className="w-5 h-5 text-[#6B7280] group-hover:text-[#111111] group-hover:scale-110 transition-transform stroke-[2] mb-3" />
                    <h4 className="text-[15px] font-bold text-[#111111] mb-1">New Canvas</h4>
                    <p className="text-xs text-[#6B7280]">Create your first learning Canvas</p>
                  </div>

                  {canvases.map((canvas) => (
                    <div
                      key={canvas.id}
                      onClick={() => onStartCanvas(canvas.sourceType)}
                      className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F7F7F7] transition-all duration-150 cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F1F1F1] px-2.5 py-0.5 rounded-full">
                            {canvas.sourceType}
                          </span>
                          <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {canvas.updatedAt}
                          </span>
                        </div>

                        <h4 className="text-[15px] font-bold text-[#111111] mb-1 line-clamp-1">
                          {canvas.title}
                        </h4>

                        <p className="text-xs text-[#6B7280] flex items-center gap-1.5 truncate mb-3">
                          <FileCode className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          <span className="truncate">{canvas.sourceName}</span>
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                        <span>
                          {canvas.elementsCount.explanations} Explanations • {canvas.elementsCount.questions} Questions
                        </span>
                        <span className="font-semibold text-[#111111] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Open <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: MY CANVASES */}
          {activeNav === 'canvases' && (
            <motion.div
              key="canvases-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#111111]">My Canvases</h1>
                  <p className="text-sm text-[#6B7280] mt-0.5">Your generated learning workspaces</p>
                </div>

                <button
                  type="button"
                  onClick={handleUniversalStartLearningClick}
                  className="h-10 px-4 rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F5F5F5] text-xs sm:text-sm font-semibold text-[#111111] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Canvas</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Premium Dashed Creation Card */}
                <div
                  onClick={handleUniversalStartLearningClick}
                  className="p-5 min-h-[160px] rounded-[20px] bg-[#FFFFFF] border border-dashed border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9F9] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group"
                >
                  <Plus className="w-5 h-5 text-[#6B7280] group-hover:text-[#111111] group-hover:scale-110 transition-transform stroke-[2] mb-3" />
                  <h4 className="text-[15px] font-bold text-[#111111] mb-1">New Canvas</h4>
                  <p className="text-xs text-[#6B7280]">Create your first learning Canvas</p>
                </div>

                {canvases.map((canvas) => (
                  <div
                    key={canvas.id}
                    onClick={() => onStartCanvas(canvas.sourceType)}
                    className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F7F7F7] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-[#6B7280] bg-[#F1F1F1] px-2.5 py-0.5 rounded-full">
                        {canvas.sourceType}
                      </span>
                      <h4 className="text-base font-bold text-[#111111] mt-2 mb-1">{canvas.title}</h4>
                      <p className="text-xs text-[#6B7280]">{canvas.sourceName}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                      <span>{canvas.elementsCount.explanations} Explanations</span>
                      <span className="font-semibold text-[#111111] flex items-center gap-1">Open Canvas →</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB: LIBRARY */}
          {activeNav === 'library' && (
            <motion.div
              key="library-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col text-left"
            >
              <div className="pb-4 border-b border-[#E5E7EB] mb-6">
                <h1 className="text-2xl font-bold text-[#111111]">Library</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Saved study cards, flashcard decks, and summaries</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB]">
                  <BookOpen className="w-5 h-5 text-[#111111] mb-3 stroke-[1.8]" />
                  <h3 className="text-sm font-bold text-[#111111]">Structured Notes</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Organized conceptual summaries</p>
                  <span className="inline-block mt-3 text-[11px] font-medium text-[#9CA3AF]">0 Saved</span>
                </div>
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB]">
                  <Layers className="w-5 h-5 text-[#111111] mb-3 stroke-[1.8]" />
                  <h3 className="text-sm font-bold text-[#111111]">Flashcard Decks</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Recall and quiz sets</p>
                  <span className="inline-block mt-3 text-[11px] font-medium text-[#9CA3AF]">0 Decks</span>
                </div>
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB]">
                  <Bookmark className="w-5 h-5 text-[#111111] mb-3 stroke-[1.8]" />
                  <h3 className="text-sm font-bold text-[#111111]">Key Formulas</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Extracted rules and theorems</p>
                  <span className="inline-block mt-3 text-[11px] font-medium text-[#9CA3AF]">0 Items</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: HISTORY */}
          {activeNav === 'history' && (
            <motion.div
              key="history-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col text-left"
            >
              <div className="pb-4 border-b border-[#E5E7EB] mb-6">
                <h1 className="text-2xl font-bold text-[#111111]">History</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Timeline of learning sessions and quiz completions</p>
              </div>

              <div className="p-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] flex flex-col items-center text-center">
                <Clock className="w-8 h-8 text-[#9CA3AF] mb-2 stroke-[1.5]" />
                <h3 className="text-sm font-semibold text-[#111111]">No session history yet</h3>
                <p className="text-xs text-[#6B7280] mt-1 max-w-sm">
                  As you interact with learning canvases and practice quiz questions, your history will be recorded here.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB: SETTINGS */}
          {activeNav === 'settings' && (
            <motion.div
              key="settings-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col text-left"
            >
              <div className="pb-4 border-b border-[#E5E7EB] mb-6">
                <h1 className="text-2xl font-bold text-[#111111]">Settings</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">Manage learning model preferences and account context</p>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[20px] flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[#111111]">Learning Context Calibration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block mb-1">Study Context</span>
                    <span className="font-semibold text-[#111111]">{studyContext}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block mb-1">Confidence</span>
                    <span className="font-semibold text-[#111111]">{confidence}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                    <span className="text-[#6B7280] block mb-1">Age Cohort</span>
                    <span className="font-semibold text-[#111111]">{ageGroup}</span>
                  </div>
                </div>

                {onResetOnboarding && (
                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">Recalibrate adaptive persona</span>
                    <button
                      type="button"
                      onClick={onResetOnboarding}
                      className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F5F5F5] text-xs font-semibold text-[#111111] transition-colors cursor-pointer"
                    >
                      Reset Onboarding
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB: HELP */}
          {activeNav === 'help' && (
            <motion.div
              key="help-tab-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionConfig}
              className="w-full max-w-[840px] flex flex-col text-left"
            >
              <div className="pb-4 border-b border-[#E5E7EB] mb-6">
                <h1 className="text-2xl font-bold text-[#111111]">Help & Documentation</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">How to get the most out of Noevis AI</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#111111] mb-1">How does the Canvas work?</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    When you bring a document, video, or pasted text, Noevis extracts core learning concepts, builds step-by-step explanations, creates interactive quizzes, and generates visual diagrams.
                  </p>
                </div>
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#111111] mb-1">Supported file formats</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    PDF, DOCX, PPTX, MP3, MP4, WAV, YouTube video links, web URLs, and direct text paste.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* ================================================== */}
      {/* 3. UNIVERSAL SOURCE SELECTION MODALS               */}
      {/* ================================================== */}
      <AnimatePresence>
        {activeSourceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(20, 24, 30, 0.32)' }}
            className="fixed inset-0 backdrop-blur-[8px] z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              // Click outside check
              if (e.target === e.currentTarget) {
                handleTryCloseModal();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth:
                  isAnalyzing || showSuccessState
                    ? '480px'
                    : activeSourceModal === 'all' || activeSourceModal === 'more'
                    ? '780px'
                    : activeSourceModal === 'record'
                    ? '560px'
                    : '640px',
                maxHeight:
                  activeSourceModal === 'all' || activeSourceModal === 'more'
                    ? '78vh'
                    : '72vh'
              }}
              className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden text-left flex flex-col relative"
            >
              {/* Header block (Not shown if in success or analyzing states) */}
              {!isAnalyzing && !showSuccessState && (
                <div className="px-6 md:px-8 pt-6 md:pt-7 pb-3 flex items-start justify-between gap-4 shrink-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111] tracking-[-0.02em] leading-tight">
                      {activeSourceModal === 'all' || activeSourceModal === 'more'
                        ? 'Choose a learning source'
                        : activeSourceModal === 'upload'
                        ? 'Upload File'
                        : activeSourceModal === 'paste'
                        ? 'Paste study notes or text'
                        : activeSourceModal === 'link'
                        ? 'Web Link'
                        : activeSourceModal === 'youtube'
                        ? 'YouTube Lecture'
                        : activeSourceModal === 'camera'
                        ? 'Scan / Photo'
                        : activeSourceModal === 'voice'
                        ? 'Voice Lecture'
                        : activeSourceModal === 'record'
                        ? 'Record Lecture'
                        : 'Learning Source'}
                    </h3>
                    <p className="text-xs md:text-[13px] text-[#6B7280] mt-1 leading-normal">
                      {activeSourceModal === 'all' || activeSourceModal === 'more'
                        ? 'Noevis will analyze your material and generate an adaptive Canvas.'
                        : activeSourceModal === 'upload'
                        ? 'Select or drag study materials to start learning.'
                        : activeSourceModal === 'paste'
                        ? 'Bring your study excerpts, transcripts, or notes.'
                        : activeSourceModal === 'link'
                        ? 'Add website articles, web links, or learning resources.'
                        : activeSourceModal === 'youtube'
                        ? 'Turn a lecture into an adaptive Canvas.'
                        : activeSourceModal === 'camera'
                        ? 'Capture notes, pages or whiteboards.'
                        : activeSourceModal === 'voice'
                        ? 'Audio transcription and key concepts.'
                        : activeSourceModal === 'record'
                        ? 'Capture and transcribe spoken lectures or browser audio.'
                        : 'Noevis will process and create your adaptive Workspace.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleTryCloseModal}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F5F5F5] transition-all cursor-pointer shrink-0"
                    title="Close selection"
                    aria-label="Close learning source panel"
                  >
                    <X className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              )}

              {/* Scrollable Container Body */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-7 pt-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                
                {/* 1. ANALYZING / PROCESSING VIEW */}
                {isAnalyzing && (
                  <div className="py-10 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                    <div className="w-14 h-14 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#111111] mb-5 animate-pulse">
                      <Sparkle className="w-6 h-6 stroke-[1.2]" />
                    </div>
                    
                    <h4 className="text-base md:text-lg font-bold text-[#111111] mb-1.5 tracking-tight">
                      Analyzing your material
                    </h4>
                    
                    <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">
                      {analysisProgress < 50
                        ? 'Extracting core learning concepts and outlines...'
                        : analysisProgress < 90
                        ? 'Building your adaptive Canvas explanations and quizzes...'
                        : 'Finalizing your cognitive study environment...'}
                    </p>

                    {/* Progress Indicator */}
                    <div className="w-full bg-[#E5E7EB] h-1 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-[#111111] h-full transition-all duration-300 ease-out"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                    
                    <span className="text-xs font-semibold text-[#111111]">
                      {analysisProgress}% Complete
                    </span>
                  </div>
                )}

                {/* 2. SUCCESS VIEW */}
                {showSuccessState && (
                  <div className="py-10 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 scale-110">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    <h4 className="text-lg md:text-xl font-bold text-[#111111] mb-1.5 tracking-tight">
                      Canvas ready
                    </h4>
                    
                    <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                      We have successfully constructed your adaptive workspace:
                    </p>

                    {/* Meta Card */}
                    <div className="w-full bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl p-4 mb-6 text-left">
                      <span className="text-[10px] font-bold text-[#6B7280] bg-[#EFEFEF] px-2 py-0.5 rounded uppercase tracking-wider">
                        {successCanvasType === 'pdf' || successCanvasType === 'upload' ? 'PDF SOURCE' : successCanvasType.toUpperCase()}
                      </span>
                      <h5 className="text-[14px] font-bold text-[#111111] mt-2 line-clamp-1 leading-tight">
                        {successCanvasTitle}
                      </h5>
                      <p className="text-[11px] text-[#6B7280] mt-1">
                        3 Explanations • 8 Practice Questions • Concept Roadmap
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleFinalLaunch}
                      className="w-full h-10 rounded-[11px] bg-[#111111] hover:bg-[#222222] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.985] transition-all cursor-pointer"
                    >
                      <span>Open Canvas</span>
                      <ArrowRight className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                )}

                {/* 3. SELECTION GRID STATE (ALL / MORE) */}
                {!isAnalyzing && !showSuccessState && (activeSourceModal === 'all' || activeSourceModal === 'more') && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      
                      {/* CARD 1: Upload File */}
                      <button
                        type="button"
                        onClick={() => {
                          handleDirectUploadClick();
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <FileUp className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Upload File
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            PDF, DOCX, PPTX, audio, video
                          </p>
                        </div>
                      </button>

                      {/* CARD 2: Paste Text */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('paste');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Clipboard className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Paste Text
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Raw study notes, copied text or content
                          </p>
                        </div>
                      </button>

                      {/* CARD 3: Web Link */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('link');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <LinkIcon className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Web Link
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Webpage, documentation or article
                          </p>
                        </div>
                      </button>

                      {/* CARD 4: YouTube Lecture */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('youtube');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Youtube className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            YouTube Lecture
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Turn a lecture into an adaptive Canvas
                          </p>
                        </div>
                      </button>

                      {/* CARD 5: Scan / Photo */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('camera');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Camera className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Scan / Photo
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Capture notes, pages or whiteboards
                          </p>
                        </div>
                      </button>

                      {/* CARD 6: Voice Lecture */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('voice');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Mic className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Voice Lecture
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Audio transcription and key concepts
                          </p>
                        </div>
                      </button>

                      {/* CARD 7: Record Lecture */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('record');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Monitor className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                            Record Lecture
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Record voice, lectures, or browser tabs
                          </p>
                        </div>
                      </button>

                      {/* CARD 8: Connect Accounts (Full Width) */}
                      <button
                        type="button"
                        onClick={() => {
                          info('Cloud integrations ready', 'OneDrive, Notion, and Google Drive account connector workspace initialized.');
                        }}
                        className="px-5 py-3.5 h-[84px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group sm:col-span-2"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Plug className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[15px] font-bold text-[#111111] tracking-tight leading-tight">
                              Connect Accounts
                            </h4>
                            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal truncate">
                            Google Drive, Notion, LMS, GitHub and more
                          </p>
                        </div>
                      </button>

                    </div>
                  </div>
                )}

                {/* 4. LEVEL-2 INPUT: FILE UPLOAD STATE */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'upload' && selectedUploadFile && (
                  <div className="flex flex-col gap-4 pt-1">
                    <div className="p-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center shrink-0 border border-slate-100 text-[#111111]">
                          <FileText className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-sm font-bold text-[#111111] truncate leading-tight">
                            {selectedUploadFile.name}
                          </h5>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {selectedUploadFile.size} • {isUploading ? 'Uploading...' : 'Upload complete'}
                          </p>
                        </div>
                      </div>

                      {isUploading ? (
                        <span className="text-xs font-bold text-[#111111]">
                          {uploadProgress}%
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUploadFile(null);
                            setUploadProgress(0);
                            setIsUploading(false);
                            setActiveSourceModal('all');
                          }}
                          className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {isUploading && (
                      <div className="w-full bg-[#E5E7EB] h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-[#111111] h-full transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUploadFile(null);
                          setUploadProgress(0);
                          setIsUploading(false);
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => handleAnalyzeAndLaunch('upload')}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Analyze & Create Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. LEVEL-2 INPUT: PASTE TEXT */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'paste' && (
                  <div className="flex flex-col gap-4 pt-1">
                    <textarea
                      rows={6}
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      placeholder="Paste your study notes, essay draft, syllabus, book or copied learning material here."
                      className="w-full h-[160px] min-h-[150px] max-h-[180px] p-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#111111] rounded-[16px] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none resize-none leading-relaxed transition-colors shadow-inner"
                    />
                    
                    <div className="flex items-center justify-between text-[11.5px] text-[#6B7280] -mt-1">
                      <span>{pasteText.length} characters</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setPasteText(
                              'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.'
                            )
                          }
                          className="underline hover:text-[#111111] cursor-pointer font-medium"
                        >
                          Insert sample excerpt
                        </button>
                        <span>•</span>
                        <span>Max 50,000 characters</span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        disabled={!pasteText.trim()}
                        onClick={() => handleAnalyzeAndLaunch('paste', 'Pasted Text Notes')}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Create Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. LEVEL-2 INPUT: WEB LINK */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'link' && (
                  <div className="flex flex-col gap-4 pt-1">
                    <div className="relative flex items-center">
                      <LinkIcon className="absolute left-4 w-4.5 h-4.5 text-[#9CA3AF] stroke-[1.8]" />
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="Paste a YouTube, website, or supported file URL"
                        className="w-full h-12 pl-11 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#111111] rounded-[14px] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                      />
                    </div>

                    {linkUrl.trim() !== '' && (
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2.5 animate-fade-in">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11.5px] font-semibold text-slate-700 truncate">
                          Valid format detected. Ready to extract content.
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-[#6B7280] leading-normal px-1">
                      Noevis extracts content, key sections, citations, and builds your interactive canvas.
                    </p>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        disabled={!linkUrl.trim()}
                        onClick={() => handleAnalyzeAndLaunch('link', linkUrl)}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* 7. LEVEL-2 INPUT: YOUTUBE LECTURE */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'youtube' && (
                  <div className="flex flex-col gap-4 pt-1">
                    <div className="relative flex items-center">
                      <Youtube className="absolute left-4 w-4.5 h-4.5 text-[#9CA3AF] stroke-[1.8]" />
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full h-12 pl-11 pr-4 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#111111] rounded-[14px] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none transition-colors"
                      />
                    </div>

                    {youtubeUrl.trim() !== '' && (
                      <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl flex items-center gap-2.5 animate-fade-in">
                        <Youtube className="w-4 h-4 text-red-600" />
                        <span className="text-[11.5px] font-semibold text-red-700 truncate">
                          YouTube lecture stream verified. Ready for automatic video transcription.
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-[#6B7280] leading-normal px-1">
                      Noevis transcribes video audio, identifies key timestamps, and generates practice questions.
                    </p>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        disabled={!youtubeUrl.trim()}
                        onClick={() => handleAnalyzeAndLaunch('youtube', 'YouTube Lecture Workspace')}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Create Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* 8. LEVEL-2 INPUT: SCAN / PHOTO OCR */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'camera' && (
                  <div className="flex flex-col gap-4 pt-1">
                    <div className="p-6 bg-[#FFFFFF] border border-dashed border-[#E5E7EB] hover:border-[#111111] transition-all rounded-[16px] flex flex-col items-center text-center cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-[#F7F8FA] group-hover:bg-[#111111] group-hover:text-white transition-colors flex items-center justify-center text-[#111111] mb-3">
                        <Camera className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <h5 className="text-[14px] font-bold text-[#111111]">Drop handwritten notes or select photo</h5>
                      <p className="text-[11.5px] text-[#6B7280] mt-1 max-w-sm leading-normal">
                        Supports high-fidelity diagram extraction and whiteboard snapshot OCR indexing.
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnalyzeAndLaunch('camera', 'Snapshot OCR Canvas')}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Create Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* 9. LEVEL-2 INPUT: VOICE LECTURE */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'voice' && (
                  <div className="flex flex-col gap-4 pt-1">
                    <div className="p-6 bg-[#FFFFFF] border border-dashed border-[#E5E7EB] hover:border-[#111111] transition-all rounded-[16px] flex flex-col items-center text-center cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-[#F7F8FA] group-hover:bg-[#111111] group-hover:text-white transition-colors flex items-center justify-center text-[#111111] mb-3">
                        <Mic className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <h5 className="text-[14px] font-bold text-[#111111]">Upload audio file (MP3, WAV, M4A)</h5>
                      <p className="text-[11.5px] text-[#6B7280] mt-1 max-w-sm leading-normal">
                        Noevis converts speech summaries to structured timelines and key concept maps.
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnalyzeAndLaunch('voice', 'Voice Lecture Transcripts')}
                        className="h-10 px-5 rounded-[11px] bg-[#111111] hover:bg-[#222222] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        Create Canvas
                      </button>
                    </div>
                  </div>
                )}

                {/* 10. LEVEL-2 INPUT: RECORD LECTURE */}
                {!isAnalyzing && !showSuccessState && activeSourceModal === 'record' && (
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex flex-col gap-2.5">
                      {/* Option 1: Microphone */}
                      <button
                        type="button"
                        onClick={() => {
                          handleAnalyzeAndLaunch('voice', 'Voice Recording Session');
                        }}
                        className="p-4 h-[78px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Mic className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[14.5px] font-bold text-[#111111] tracking-tight leading-tight">
                            Microphone
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal">
                            Record your voice or class
                          </p>
                        </div>
                      </button>

                      {/* Option 2: Browser Tab */}
                      <button
                        type="button"
                        onClick={() => {
                          handleAnalyzeAndLaunch('voice', 'Browser Tab Audio Session');
                        }}
                        className="p-4 h-[78px] rounded-[16px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#111111] hover:bg-[#F9F9FA] active:scale-[0.985] transition-all duration-150 text-left flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#F7F8FA] text-[#111111] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Monitor className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[14.5px] font-bold text-[#111111] tracking-tight leading-tight">
                            Browser Tab
                          </h4>
                          <p className="text-xs text-[#6B7280] mt-0.5 leading-normal">
                            Capture audio playing in a browser tab
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSourceModal('all');
                        }}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================== */}
      {/* 4. MOBILE / OVERLAY DRAWER WITH SOFT BACKDROP BLUR */}
      {/* ================================================== */}
      <AnimatePresence>
        {showMobileDrawer && (
          <>
            {/* Backdrop with soft blur and subtle neutral translucent veil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileDrawer(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-[8px] z-40 lg:hidden"
            />

            {/* Premium Mobile Drawer (300px, rounded-r-[20px]) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-[300px] bg-[#FFFFFF] border-r border-[#E5E7EB] rounded-r-[20px] z-50 p-5 flex flex-col justify-between lg:hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col h-full w-full justify-between overflow-hidden">
                {/* Top Section */}
                <div className="flex flex-col gap-5 w-full shrink-0">
                  {/* Header */}
                  <div className="flex items-center justify-between pt-1 pb-3 border-b border-[#E5E7EB]">
                    <Logo size="sm" variant="full" showBadge={false} />
                    <button
                      type="button"
                      onClick={() => setShowMobileDrawer(false)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                      aria-label="Close sidebar"
                    >
                      <X className="w-5 h-5 stroke-[2] text-[#111111]" />
                    </button>
                  </div>

                  {/* Primary Action Button: + Start learning */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileDrawer(false);
                      handleUniversalStartLearningClick();
                    }}
                    className="w-full h-[50px] px-4 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EFEFEF] border border-[#E5E7EB] rounded-[12px] text-[15px] font-semibold text-[#111111] flex items-center gap-3 transition-colors cursor-pointer focus-visible:outline-none"
                  >
                    <Plus className="w-[20px] h-[20px] stroke-[2.2] text-[#111111]" />
                    <span>Start learning</span>
                  </button>

                  {/* Primary Navigation */}
                  <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
                    {mainNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNav === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full h-[46px] px-4 rounded-[12px] flex items-center gap-3 text-[15.5px] transition-colors duration-150 cursor-pointer text-left focus-visible:outline-none ${
                            isActive
                              ? 'bg-[#F1F1F1] text-[#111111] font-semibold'
                              : 'text-[#111111] hover:bg-[#F5F5F5] font-medium'
                          }`}
                        >
                          <Icon className="w-[20px] h-[20px] stroke-[1.8] text-[#111111]" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Middle Scroll Section (Dynamic Content) */}
                <div className="flex-1 overflow-y-auto my-3 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {canvases.length > 0 && (
                    <div className="flex flex-col gap-5">
                      {/* Recent List */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-3 text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase">
                          <span>Recent</span>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileDrawer(false);
                              setActiveNav('history');
                            }}
                            className="hover:underline text-[11px] normal-case font-medium text-[#111111] cursor-pointer"
                          >
                            View all
                          </button>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {canvases.slice(0, 4).map((canvas) => (
                            <button
                              key={`mob-recent-${canvas.id}`}
                              type="button"
                              onClick={() => {
                                setShowMobileDrawer(false);
                                onStartCanvas(canvas.sourceType);
                              }}
                              className="w-full h-[38px] px-3 rounded-[10px] hover:bg-[#F5F5F5] transition-colors flex items-center gap-2.5 text-[14px] text-left text-[#111111] font-medium truncate cursor-pointer"
                            >
                              <Clock className="w-4 h-4 text-[#6B7280] shrink-0" />
                              <span className="truncate flex-1">{canvas.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Canvases List */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-3 text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase">
                          <span>Canvases</span>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileDrawer(false);
                              setActiveNav('canvases');
                            }}
                            className="hover:underline text-[11px] normal-case font-medium text-[#111111] cursor-pointer"
                          >
                            View all
                          </button>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {canvases.map((canvas) => (
                            <div
                              key={`mob-canvas-${canvas.id}`}
                              className="w-full h-[38px] px-3 rounded-[10px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-between gap-2 text-[14px] text-[#111111] font-medium group relative"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setShowMobileDrawer(false);
                                  onStartCanvas(canvas.sourceType);
                                }}
                                className="flex-1 flex items-center gap-2.5 text-left truncate cursor-pointer h-full"
                              >
                                <Diamond className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                                <span className="truncate">{canvas.title}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col gap-4 pt-3 border-t border-[#E5E7EB] shrink-0">
                  {/* System Navigation */}
                  <nav aria-label="Mobile System Navigation" className="flex flex-col gap-1">
                    {systemNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNav === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full h-[44px] px-4 rounded-[12px] flex items-center gap-3 text-[15.5px] transition-colors duration-150 cursor-pointer text-left focus-visible:outline-none ${
                            isActive
                              ? 'bg-[#F1F1F1] text-[#111111] font-semibold'
                              : 'text-[#111111] hover:bg-[#F5F5F5] font-medium'
                          }`}
                        >
                          <Icon className="w-[20px] h-[20px] stroke-[1.8] text-[#111111]" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Profile Block */}
                  <div className="flex items-center gap-3 p-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-[14px]">
                    <div className="w-9 h-9 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {userInitials}
                    </div>
                    <div className="truncate text-left">
                      <p className="text-xs font-semibold text-[#111111] truncate">{userName}</p>
                      <p className="text-[11px] text-[#6B7280] truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
