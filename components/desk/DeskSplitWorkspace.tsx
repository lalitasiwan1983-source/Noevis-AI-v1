'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Pencil,
  HelpCircle,
  Layers,
  FileText,
  Clock,
  Notebook,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Search,
  Bell,
  User,
  Sun,
  ChevronsLeft,
  Sliders,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowLeft,
  Send,
  Check,
  RotateCcw,
} from 'lucide-react';
import { DeskContextData, DeskWorkspaceMode, DeskTab, DeskToolType } from './types';
import { LearnExperience } from './learn';
import { PracticeExperience } from './practice';
import { QuizExperience } from './quiz';
import { ReviewExperience } from './review';
import { NotesExperience, DeskNote } from './notes';
import { MoreCapabilityView } from './more';
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

  // 1. SIDEBAR RESIZING & COLLAPSE STATE (persisted)
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('noevis_sidebar_width');
      if (saved) {
        const parsed = Number(saved);
        if (!isNaN(parsed)) return Math.max(260, Math.min(440, parsed));
      }
    }
    return 330;
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('noevis_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('noevis_sidebar_width', sidebarWidth.toString());
    }
  }, [sidebarWidth]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('noevis_sidebar_collapsed', isCollapsed.toString());
    }
  }, [isCollapsed]);

  // 2. SIDEBAR PANEL STATE: 'tools' | 'ask_noevis'
  const [sidebarPanel, setSidebarPanel] = useState<'tools' | 'ask_noevis'>('tools');

  // 3. ASK NOEVIS CHAT STATE INSIDE SIDEBAR
  const [askInput, setAskInput] = useState<string>('');
  const [askMessages, setAskMessages] = useState<Array<{ id: string; sender: 'user' | 'ai'; text: string }>>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I'm Noevis AI. How can I assist you with your active workspace context in ${contextData.topic}?`,
    },
  ]);
  const [isAiReplying, setIsAiReplying] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // 4. DYNAMIC WORKSPACE TABS STATE
  const [tabs, setTabs] = useState<DeskTab[]>([
    { id: 'tab-1', title: 'Learn — Photosynthesis', toolType: 'learn', contextName: 'Photosynthesis Overview' },
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('tab-1');

  // Fullscreen toggle state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (sidebarPanel === 'ask_noevis') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [askMessages, sidebarPanel]);

  // Sidebar drag resizer handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.max(260, Math.min(420, e.clientX));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Handle sidebar tool selection: open or activate tab
  const handleSelectTool = (toolType: DeskToolType) => {
    // Synchronize mode for backward compatibility
    if (toolType === 'learn') onChangeMode('learn');
    else if (toolType === 'practice') onChangeMode('practice');
    else if (toolType === 'quiz') onChangeMode('quiz');
    else if (toolType === 'review') onChangeMode('review');
    else if (toolType === 'notes') onChangeMode('notes');
    else onChangeMode('more');

    // Check if an existing tab for this tool exists
    const existingTab = tabs.find((t) => t.toolType === toolType);
    if (existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      // Create new workspace tab for this tool with meaningful title
      const toolLabelMap: Record<DeskToolType, string> = {
        learn: `Learn — ${contextData.currentConcept || 'Topic'}`,
        practice: `Practice — ${contextData.currentConcept || 'Applied'}`,
        quiz: `Quiz — ${contextData.currentConcept || 'Assessment'}`,
        flashcards: `Flashcards`,
        summary: `Summary — ${contextData.topic}`,
        review: `Review — Key Concepts`,
        notes: `Notes — ${contextData.currentConcept || 'Scratchpad'}`,
      };
      const newTab: DeskTab = {
        id: `tab-${Date.now()}`,
        title: toolLabelMap[toolType],
        toolType,
        contextName: contextData.currentConcept,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newTab.id);
    }
  };

  // Handle + New Tab creation
  const handleNewTab = () => {
    const newTab: DeskTab = {
      id: `tab-${Date.now()}`,
      title: 'New Workspace',
      toolType: 'empty',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  // Handle closing a tab
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    const targetIdx = tabs.findIndex((t) => t.id === tabId);
    if (targetIdx === -1) return;

    const remainingTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(remainingTabs);

    if (activeTabId === tabId) {
      if (remainingTabs.length > 0) {
        // Prefer previous adjacent tab, else next tab
        const newActiveIdx = Math.max(0, targetIdx - 1);
        setActiveTabId(remainingTabs[newActiveIdx].id);
      } else {
        setActiveTabId(null);
      }
    }
  };

  // Handle sending a message in Ask Noevis sidebar
  const handleSendAskMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askInput.trim() || isAiReplying) return;

    const userText = askInput.trim();
    const userMsgId = `usr-${Date.now()}`;
    setAskMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: userText }]);
    setAskInput('');
    setIsAiReplying(true);

    setTimeout(() => {
      const activeTab = tabs.find((t) => t.id === activeTabId);
      const activeToolName = activeTab ? activeTab.toolType : 'general';
      const aiReply = `Regarding ${contextData.currentConcept} (${activeToolName} workspace): ${
        userText.toLowerCase().includes('explain') || userText.toLowerCase().includes('what')
          ? 'Photosynthesis converts solar light energy into chemical energy stored in glucose via light-dependent reactions and the Calvin cycle.'
          : 'I have logged this query into your context memory. Let me know if you would like me to generate flashcards or practice questions.'
      }`;

      setAskMessages((prev) => [...prev, { id: `ai-${Date.now()}`, sender: 'ai', text: aiReply }]);
      setIsAiReplying(false);
    }, 700);
  };

  // Active Tab object
  const activeTab = tabs.find((t) => t.id === activeTabId);

  // Tools definition with colorful line icons matching reference image
  const DESK_TOOLS: Array<{
    id: DeskToolType;
    label: string;
    icon: React.FC<{ className?: string }>;
    colorClass: string;
    bgClass: string;
  }> = [
    { id: 'learn', label: 'Learn', icon: BookOpen, colorClass: 'text-[#3B82F6]', bgClass: 'bg-[#EFF6FF]' },
    { id: 'practice', label: 'Practice', icon: Pencil, colorClass: 'text-[#16A34A]', bgClass: 'bg-[#F0FDF4]' },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, colorClass: 'text-[#D97706]', bgClass: 'bg-[#FEF3C7]' },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, colorClass: 'text-[#9333EA]', bgClass: 'bg-[#F3E8FF]' },
    { id: 'summary', label: 'Summary', icon: FileText, colorClass: 'text-[#0D9488]', bgClass: 'bg-[#F0FDFA]' },
    { id: 'review', label: 'Review', icon: RotateCcw, colorClass: 'text-[#E11D48]', bgClass: 'bg-[#FFF1F2]' },
    { id: 'notes', label: 'Notes', icon: Notebook, colorClass: 'text-[#4F46E5]', bgClass: 'bg-[#EEF2FF]' },
  ];

  const userInitials = userEmail.substring(0, 2).toUpperCase() || 'SY';

  return (
    <div id="noevis-desk-environment" className="flex h-screen w-screen bg-[#F8F9FA] text-[#111827] overflow-hidden font-sans select-none">
      {/* ==================================================== */}
      {/* 1. LEFT DESK SIDEBAR (PERSISTENT & RESIZABLE)        */}
      {/* ==================================================== */}
      <aside
        ref={sidebarRef}
        style={{ width: isCollapsed ? 72 : sidebarWidth }}
        className="relative h-full bg-[#F8F9FA] border-r border-[#E5E7EB] flex flex-col shrink-0 transition-[width] duration-200 ease-out z-20 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {/* SIDEBAR PANEL 1: REGULAR TOOLS NAVIGATION */}
          {sidebarPanel === 'tools' && (
            <motion.div
              key="sidebar-tools"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col h-full justify-between px-6 py-5"
            >
              {/* Top Section: Brand & Desk Tools */}
              <div className="flex flex-col flex-1">
                {/* Header: NOEVIS Brand & Top Collapse Control */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl text-[#111827]">✦</span>
                    {!isCollapsed && (
                      <span className="font-bold text-[22px] text-[#111827] tracking-wider uppercase font-sans">
                        NOEVIS
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="w-8 h-8 rounded-lg hover:bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] transition-colors cursor-pointer"
                    title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    aria-label="Toggle sidebar"
                  >
                    <ChevronLeft className={`w-4.5 h-4.5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {!isCollapsed && (
                  <p className="text-[15px] text-[#6B7280] font-medium tracking-tight mb-4 px-0.5">
                    Desk
                  </p>
                )}

                {/* Tools Navigation List */}
                <nav className="space-y-1">
                  {DESK_TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = activeTab?.toolType === tool.id;

                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => handleSelectTool(tool.id)}
                        className={`w-full flex items-center gap-4 px-4 h-[54px] rounded-xl text-[16.5px] transition-all cursor-pointer relative group border-0 ${
                          isActive
                            ? 'bg-[#F4F4F5] text-[#111827] font-semibold'
                            : 'text-[#1F2937] font-medium hover:bg-[#F4F4F5] hover:text-[#111827]'
                        }`}
                        title={tool.label}
                      >
                        {/* Subtle left accent indicator line */}
                        {isActive && (
                          <span className={`absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-r-full ${tool.colorClass.replace('text-', 'bg-')}`} />
                        )}

                        <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${tool.colorClass}`}>
                          <Icon className="w-[24px] h-[24px] stroke-[2]" />
                        </div>

                        {!isCollapsed && (
                          <span className="truncate">{tool.label}</span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Natural Breathing Room then Bottom Section: ASK NOEVIS Composer */}
              <div className="mt-auto pt-4 shrink-0">
                {/* Single Subtle 1px Divider */}
                <div className="mb-4 border-t border-[#E5E7EB]" />

                {!isCollapsed && (
                  <p className="text-[12px] font-semibold text-[#9CA3AF] tracking-wider uppercase mb-2.5 px-1">
                    ASK NOEVIS
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setSidebarPanel('ask_noevis')}
                  className={`w-full flex items-center justify-between px-4 h-[54px] rounded-xl text-[16px] font-medium transition-all cursor-pointer group border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] ${
                    isCollapsed ? 'justify-center px-0' : ''
                  }`}
                  title="Ask Noevis AI"
                >
                  <div className="flex items-center gap-3.5 truncate">
                    <Sparkles className="w-[22px] h-[22px] text-[#7C3AED] stroke-[2] shrink-0" />
                    {!isCollapsed && <span className="text-[#6B7280] truncate">Ask Noevis…</span>}
                  </div>
                  {!isCollapsed && (
                    <ArrowUp className="w-4.5 h-4.5 text-[#9CA3AF] group-hover:text-[#111827] transition-colors shrink-0 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* SIDEBAR PANEL 2: DEDICATED ASK NOEVIS CHAT SURFACE */}
          {sidebarPanel === 'ask_noevis' && (
            <motion.div
              key="sidebar-asknoevis"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col h-full bg-[#F8F9FA] justify-between p-4"
            >
              {/* Header: Back to tools & New chat */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] shrink-0">
                <button
                  type="button"
                  onClick={() => setSidebarPanel('tools')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#374151] hover:text-[#111827] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {!isCollapsed && <span>Ask Noevis</span>}
                </button>

                {!isCollapsed && (
                  <button
                    type="button"
                    onClick={() => {
                      setAskMessages([
                        {
                          id: 'welcome',
                          sender: 'ai',
                          text: `New chat session. Ask me anything regarding ${contextData.currentConcept}!`,
                        },
                      ]);
                      success('New Chat Started', 'Ask Noevis conversation cleared.');
                    }}
                    className="w-7 h-7 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F3F4F6] flex items-center justify-center text-[#374151] transition-all cursor-pointer shadow-2xs"
                    title="New Chat"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Scrollable Conversation History */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs sm:text-sm">
                {askMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-2xl max-w-[92%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#111827] text-white ml-auto font-medium rounded-br-xs'
                        : 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#374151] mr-auto shadow-2xs rounded-bl-xs'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] mb-1">
                        <Sparkles className="w-3 h-3 fill-[#7C3AED]" />
                        <span>Noevis</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))}

                {isAiReplying && (
                  <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#6B7280] text-xs italic mr-auto shadow-2xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping" />
                    Reasoning over active workspace...
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Compact Composer at Bottom */}
              <form onSubmit={handleSendAskMessage} className="pt-2 shrink-0">
                <div className="relative flex items-center bg-[#FFFFFF] border border-[#E5E7EB] focus-within:border-[#111827] rounded-2xl p-1.5 shadow-2xs transition-all">
                  <input
                    type="text"
                    value={askInput}
                    onChange={(e) => setAskInput(e.target.value)}
                    placeholder="Ask something..."
                    className="w-full bg-transparent px-3 text-xs sm:text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!askInput.trim() || isAiReplying}
                    className="w-8 h-8 rounded-xl bg-[#111827] hover:bg-[#1F2937] disabled:bg-[#E5E7EB] text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                    title="Send message"
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Drag Resizer Handle */}
        <div
          onMouseDown={() => setIsResizing(true)}
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#3B82F6]/30 transition-colors flex items-center justify-center group z-30"
          title="Drag to resize sidebar"
        >
          <div className="w-1 h-8 rounded-full bg-[#D1D5DB] group-hover:bg-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </aside>

      {/* ==================================================== */}
      {/* 2. MAIN CENTER AREA (ACTIVE WORKSPACE + TABS)        */}
      {/* ==================================================== */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#FFFFFF] overflow-hidden">
        {/* TOP HEADER BAR (Tabs + Global Controls) */}
        <header className="h-14 bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
          {/* LEFT: WORKSPACE TABS */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 max-w-[80%]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-t-lg text-xs font-semibold transition-all cursor-pointer shrink-0 border-b-2 ${
                    isActive
                      ? 'border-[#3B82F6] text-[#111827] bg-[#FFFFFF]'
                      : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span>{tab.title}</span>
                  <button
                    type="button"
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="w-4 h-4 rounded-full hover:bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#111827] transition-colors"
                    title="Close tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            {/* + Add New Tab Button */}
            <button
              type="button"
              onClick={handleNewTab}
              className="w-8 h-8 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F3F4F6] flex items-center justify-center text-[#374151] transition-all cursor-pointer shrink-0 shadow-2xs"
              title="Open New Workspace Tab"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: SEARCH, NOTIFICATIONS, PROFILE */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenReference}
              className="w-9 h-9 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs"
              title="Search Desk (⌘K)"
            >
              <Search className="w-4.5 h-4.5 stroke-[1.8]" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => info('No pending alerts')}
              className="w-9 h-9 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs relative"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5 stroke-[1.8]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" />
            </button>

            {/* Profile Avatar */}
            <div
              className="w-9 h-9 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#111827] flex items-center justify-center text-xs font-bold shadow-2xs cursor-pointer"
              title={userEmail}
            >
              {userInitials}
            </div>
          </div>
        </header>

        {/* CENTER ACTIVE WORKSPACE SURFACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start bg-[#FFFFFF]">
          {/* SCENARIO A: EMPTY WORKSPACE STATE */}
          {(!activeTab || activeTab.toolType === 'empty') && (
            <div className="my-auto flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4 animate-fade-in py-16">
              {/* Stacked Layers Icon inside Soft Blue Circle */}
              <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#3B82F6] shadow-2xs">
                <Layers className="w-8 h-8 stroke-[1.6]" />
              </div>

              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  Your Desk is ready
                </h1>
                <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">
                  Select a tool from the sidebar or open a tab to get started.
                </p>
              </div>
            </div>
          )}

          {/* SCENARIO B: ACTIVE TOOL WORKSPACE */}
          {activeTab && activeTab.toolType !== 'empty' && (
            <div className="w-full h-full max-w-5xl mx-auto">
              {activeTab.toolType === 'learn' && (
                <LearnExperience
                  conceptIndex={conceptIndex}
                  totalConcepts={totalConcepts}
                  onNextConcept={onNextConcept}
                  onPrevConcept={onPrevConcept}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                  onOpenReference={onOpenReference}
                />
              )}

              {activeTab.toolType === 'practice' && (
                <PracticeExperience
                  currentConceptIndex={conceptIndex}
                  onSwitchToLearn={() => handleSelectTool('learn')}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                  onChangeMode={(m) => handleSelectTool(m as DeskToolType)}
                />
              )}

              {activeTab.toolType === 'quiz' && (
                <QuizExperience
                  topicTitle={contextData.topic}
                  chapterTitle={contextData.chapter}
                  currentConceptIndex={conceptIndex}
                  onSwitchToLearn={() => handleSelectTool('learn')}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                  onChangeMode={(m) => handleSelectTool(m as DeskToolType)}
                />
              )}

              {activeTab.toolType === 'review' && (
                <ReviewExperience
                  topicTitle={contextData.topic}
                  chapterTitle={contextData.chapter}
                  onSwitchMode={(m) => handleSelectTool(m as DeskToolType)}
                  onSelectConcept={onSelectConcept}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                />
              )}

              {activeTab.toolType === 'notes' && (
                <NotesExperience
                  topicTitle={contextData.topic}
                  chapterTitle={contextData.chapter}
                  conceptName={contextData.currentConcept}
                  conceptIndex={conceptIndex}
                  initialNote={note}
                  onNoteChange={onNoteChange}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                />
              )}

              {(activeTab.toolType === 'flashcards' || activeTab.toolType === 'summary') && (
                <MoreCapabilityView
                  toolId={activeTab.toolType === 'flashcards' ? 'study_aid' : activeTab.toolType}
                  topic={contextData.topic}
                  chapter={contextData.chapter}
                  conceptName={contextData.currentConcept}
                  conceptIndex={conceptIndex}
                  onBack={() => handleSelectTool('learn')}
                  onOpenAskNoevis={() => setSidebarPanel('ask_noevis')}
                  onOpenReference={onOpenReference}
                />
              )}
            </div>
          )}
        </main>

        {/* ==================================================== */}
        {/* 3. SUBTLE BOTTOM CONTEXT FOOTER                       */}
        {/* ==================================================== */}
        <footer className="h-14 bg-[#FFFFFF] border-t border-[#E5E7EB] px-4 sm:px-6 flex items-center justify-between shrink-0 font-sans text-xs text-[#6B7280] z-10">
          {/* LEFT CONTEXT SUMMARY */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenReference}
              className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs"
              title="Source Layers"
            >
              <Layers className="w-4 h-4 stroke-[1.8]" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-medium text-[#4B5563]">
                {contextData.sourceName ? contextData.sourceName : 'No active source'}
              </span>
              <span className="text-[#D1D5DB]">|</span>
              <span className="font-medium text-[#4B5563]">
                {contextData.currentConcept ? contextData.currentConcept : 'No active context'}
              </span>
            </div>
          </div>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenReference}
              className="h-8 px-3 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Context</span>
            </button>

            <button
              type="button"
              onClick={onOpenReference}
              className="w-8 h-8 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs"
              title="Reference Material"
            >
              <BookOpen className="w-4 h-4 stroke-[1.8]" />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="w-8 h-8 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] transition-all cursor-pointer shadow-2xs"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Workspace'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
