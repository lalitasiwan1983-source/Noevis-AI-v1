'use client';

import React, { useState } from 'react';
import {
  tokens,
  Logo,
  Display,
  PageTitle,
  SectionTitle,
  CardTitleText,
  Body,
  SecondaryText,
  LabelText,
  CodeText,
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Divider,
  ProgressBar,
  ProgressRing,
  Modal,
  BottomSheet,
  Tooltip,
  useToast,
  LoadingState,
  LoadingCard,
  Skeleton,
  Spinner,
  ErrorState,
  EmptyState,
} from '@/components/design-system';

import {
  Copy,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  Sliders,
  Maximize2,
  Minimize2,
  Eye,
  Layers,
  Palette,
  Type,
  LayoutGrid,
  Bell,
  AlertTriangle,
  RefreshCw,
  Info,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react';

export default function DesignSystemPage() {
  const { toast, success, error, warning, info } = useToast();

  // Interactive Sandbox State
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'states'>('tokens');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Interactive Component States
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [sampleInputValue, setSampleInputValue] = useState('Quantum Physics Fundamentals');
  const [sampleErrorInput, setSampleErrorInput] = useState('');
  const [sampleTextarea, setSampleTextarea] = useState(
    'Synthesize the key principles of thermodynamic equilibrium and entropy transfer in closed physical systems.'
  );
  const [selectedTopic, setSelectedTopic] = useState('physics');
  const [progressVal, setProgressVal] = useState(68);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedColor(text);
    success(`Copied ${label}`, `${text} has been copied to your clipboard.`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorPalette = [
    { name: 'Primary Background', hex: tokens.colors.background, token: 'tokens.colors.background', note: 'App base background' },
    { name: 'Surface', hex: tokens.colors.surface, token: 'tokens.colors.surface', note: 'Primary card/surface fill' },
    { name: 'Primary Text', hex: tokens.colors.textPrimary, token: 'tokens.colors.textPrimary', note: 'High-contrast headings & body' },
    { name: 'Secondary Text', hex: tokens.colors.textSecondary, token: 'tokens.colors.textSecondary', note: 'Subtitles & metadata' },
    { name: 'Border', hex: tokens.colors.border, token: 'tokens.colors.border', note: '1px structural dividers' },
    { name: 'Noevis Indigo', hex: tokens.colors.indigo, token: 'tokens.colors.indigo', note: 'Primary accent & active state' },
    { name: 'Soft Indigo', hex: tokens.colors.indigoSoft, token: 'tokens.colors.indigoSoft', note: 'Tonal pills & hover tint' },
    { name: 'Success', hex: tokens.colors.success, token: 'tokens.colors.success', note: 'Affirmative & verified status' },
    { name: 'Warning', hex: tokens.colors.warning, token: 'tokens.colors.warning', note: 'Advisories & caution' },
    { name: 'Error', hex: tokens.colors.error, token: 'tokens.colors.error', note: 'Destructive & system failures' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111827] flex flex-col items-center">
      {/* Top System Header */}
      <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="md" variant="full" />
            <div className="h-4 w-[1px] bg-[#E5E7EB] hidden sm:block" />
            <Badge variant="soft" size="sm" dot>
              V1 PHASE 0 FOUNDATION
            </Badge>
          </div>

          {/* Viewport & Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#F3F4F6] p-1 rounded-[10px] hidden md:flex items-center gap-1 border border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-[7px] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewportMode === 'desktop' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
                }`}
                title="Desktop Width (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('tablet')}
                className={`p-1.5 rounded-[7px] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewportMode === 'tablet' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-[7px] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewportMode === 'mobile' ? 'bg-white text-[#111827] shadow-xs' : 'text-[#667085] hover:text-[#111827]'
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <Button
              variant="soft"
              size="sm"
              leftIcon={<Bell className="w-3.5 h-3.5" />}
              onClick={() => info('Design System Locked', 'All future Noevis AI screens consume these exact tokens.')}
            >
              Test Toast
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container with Optional Viewport Resizer */}
      <main
        className={`w-full transition-all duration-300 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 ${
          viewportMode === 'mobile'
            ? 'max-w-[420px] bg-[#FFFFFF] shadow-xl my-6 rounded-[24px] border border-[#E5E7EB]'
            : viewportMode === 'tablet'
            ? 'max-w-[780px] bg-[#FFFFFF] shadow-lg my-6 rounded-[20px] border border-[#E5E7EB]'
            : 'max-w-7xl'
        }`}
      >
        {/* Foundation Introduction Banner */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold tracking-wider text-[#4B5BEA] uppercase bg-[#EEF0FF] px-2.5 py-1 rounded-[6px] border border-[#DCE1FD]">
              Strict Design System Foundation
            </span>
            <span className="text-[13px] text-[#667085]">• V1 Phase 0</span>
          </div>
          <Display className="mb-3">NOEVIS AI Visual System</Display>
          <Body className="text-[#667085] max-w-3xl">
            A locked, high-craft design foundation engineered for calm, intelligent learning workflows.
            Designed with iOS-inspired clarity, restrained Indigo accents, accessible WCAG AA contrast,
            and strict mathematical spacing.
          </Body>

          {/* Core Principles Pill Bar */}
          <div className="flex flex-wrap gap-2 mt-5">
            {['Calm & Intelligent', 'Student-Friendly', 'Strict Light Palette', 'Zero AI-Slop', 'Canvas-Ready Architecture'].map((item) => (
              <Badge key={item} variant="neutral" size="md">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-[#E5E7EB] mb-8 overflow-x-auto pb-px">
          {[
            { id: 'tokens', label: '1. Design Tokens & Tokens Spec', icon: <Palette className="w-4 h-4" /> },
            { id: 'components', label: '2. Core Components Library', icon: <LayoutGrid className="w-4 h-4" /> },
            { id: 'states', label: '3. Dialogs, Feedback & System States', icon: <Layers className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as 'tokens' | 'components' | 'states')}
              className={`flex items-center gap-2 px-4 py-2.5 text-[14px] font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#4B5BEA] text-[#4B5BEA]'
                  : 'border-transparent text-[#667085] hover:text-[#111827] hover:border-[#E5E7EB]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SECTION 1: DESIGN TOKENS */}
        {activeTab === 'tokens' && (
          <div className="space-y-12">
            {/* Color System */}
            <section id="section-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <SectionTitle>1. Color Palette System</SectionTitle>
                  <SecondaryText>Restrained, purposeful light palette with Noevis Indigo as a focused accent.</SecondaryText>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {colorPalette.map((c) => {
                  const isCopied = copiedColor === c.hex;
                  return (
                    <div
                      key={c.name}
                      onClick={() => copyToClipboard(c.hex, c.name)}
                      className="bg-white border border-[#E5E7EB] rounded-[14px] p-3.5 flex flex-col gap-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#D1D5DB] transition-all cursor-pointer group"
                    >
                      <div
                        className="w-full h-16 rounded-[10px] border border-[#E5E7EB] flex items-end justify-end p-2 relative shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs p-1 rounded-md text-[#111827]">
                          {isCopied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[13.5px] font-semibold text-[#111827]">{c.name}</span>
                          <span className="text-[12px] font-mono text-[#667085]">{c.hex}</span>
                        </div>
                        <span className="text-[12px] text-[#667085] leading-tight">{c.note}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Typography Hierarchy */}
            <section id="section-typography">
              <div className="mb-4">
                <SectionTitle>2. Typography Scale</SectionTitle>
                <SecondaryText>Inter / SF Pro-inspired modern sans-serif with tight tracking and calibrated line heights.</SecondaryText>
              </div>

              <Card variant="default">
                <CardContent className="divide-y divide-[#F0F2F5] p-0">
                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Display</span>
                      <p className="text-[12px] text-[#667085]">44px Desktop / 34px Mobile</p>
                    </div>
                    <div className="flex-1">
                      <Display>Empowering deep conceptual mastery</Display>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Page Title</span>
                      <p className="text-[12px] text-[#667085]">32px Desktop / 28px Mobile</p>
                    </div>
                    <div className="flex-1">
                      <PageTitle>Differential Calculus & Vector Fields</PageTitle>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Section Title</span>
                      <p className="text-[12px] text-[#667085]">22px Baseline</p>
                    </div>
                    <div className="flex-1">
                      <SectionTitle>Foundational Principles & Derivations</SectionTitle>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Card Title</span>
                      <p className="text-[12px] text-[#667085]">17–18px Medium</p>
                    </div>
                    <div className="flex-1">
                      <CardTitleText>Euler-Lagrange Equation System</CardTitleText>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Body Copy</span>
                      <p className="text-[12px] text-[#667085]">16px / Line-height 1.6</p>
                    </div>
                    <div className="flex-1">
                      <Body>
                        The path taken by a physical system between two states is the one for which the action integral is stationary to first order.
                      </Body>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Metadata / Secondary</span>
                      <p className="text-[12px] text-[#667085]">14px Secondary text</p>
                    </div>
                    <div className="flex-1">
                      <SecondaryText>Updated 4 minutes ago • Verified by Noevis Learning Kernel</SecondaryText>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="w-48 shrink-0">
                      <span className="text-[12px] font-mono font-medium text-[#4B5BEA] uppercase">Small Label & Code</span>
                      <p className="text-[12px] text-[#667085]">12px / Monospace</p>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <LabelText className="uppercase tracking-wider">SYSTEM ACTIVE</LabelText>
                      <CodeText>L(q, q̇, t) = T - V</CodeText>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Spacing & Radius Rules */}
            <section id="section-spacing-radius">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spacing Matrix */}
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>4px / 8px Spacing System</CardTitle>
                    <CardDescription>Mathematical baseline increments used across padding and margins.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { size: '4px', class: 'w-4', label: 'tokens.spacing[1]' },
                      { size: '8px', class: 'w-8', label: 'tokens.spacing[2]' },
                      { size: '12px', class: 'w-12', label: 'tokens.spacing[3]' },
                      { size: '16px', class: 'w-16', label: 'tokens.spacing[4] (Mobile Page Padding)' },
                      { size: '24px', class: 'w-24', label: 'tokens.spacing[6] (Tablet Horizontal)' },
                      { size: '32px', class: 'w-32', label: 'tokens.spacing[8] (Desktop Padding)' },
                      { size: '48px', class: 'w-48', label: 'tokens.spacing[12]' },
                      { size: '64px', class: 'w-64', label: 'tokens.spacing[16]' },
                    ].map((s) => (
                      <div key={s.size} className="flex items-center gap-3 text-xs">
                        <span className="w-12 font-mono text-[#111827] shrink-0">{s.size}</span>
                        <div className="flex-1 bg-[#F3F4F6] rounded-md h-5 flex items-center px-1">
                          <div className={`h-3 bg-[#4B5BEA] rounded-sm ${s.class}`} />
                        </div>
                        <span className="text-[#667085] text-[11px] font-mono shrink-0 hidden sm:inline">{s.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Radius Rules */}
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Corner Radius Geometry</CardTitle>
                    <CardDescription>Restrained rounded contours engineered to feel calm and modern.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3.5">
                    <div className="p-4 border border-[#E5E7EB] rounded-[16px] bg-[#FAFBFD] flex flex-col justify-between h-28">
                      <span className="text-xs font-semibold text-[#111827]">Cards & Containers</span>
                      <Badge variant="soft" size="sm">16px Radius</Badge>
                    </div>
                    <div className="p-4 border border-[#E5E7EB] rounded-[12px] bg-[#FAFBFD] flex flex-col justify-between h-28">
                      <span className="text-xs font-semibold text-[#111827]">Buttons & Inputs</span>
                      <Badge variant="soft" size="sm">12px Radius</Badge>
                    </div>
                    <div className="p-4 border border-[#E5E7EB] rounded-[20px] bg-[#FAFBFD] flex flex-col justify-between h-28">
                      <span className="text-xs font-semibold text-[#111827]">Modals & Sheets</span>
                      <Badge variant="soft" size="sm">20px Radius</Badge>
                    </div>
                    <div className="p-4 border border-[#E5E7EB] rounded-[8px] bg-[#FAFBFD] flex flex-col justify-between h-28">
                      <span className="text-xs font-semibold text-[#111827]">Badges & Microtags</span>
                      <Badge variant="soft" size="sm">8px Radius</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* SECTION 2: CORE COMPONENTS LIBRARY */}
        {activeTab === 'components' && (
          <div className="space-y-12">
            {/* Brand Logo Variants */}
            <section id="section-logo">
              <div className="mb-4">
                <SectionTitle>Brand Mark & Logo System</SectionTitle>
                <SecondaryText>Precision vector identity with indigo accent pill.</SecondaryText>
              </div>

              <Card variant="default">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center">
                    <div className="flex flex-col items-center gap-2 p-4 bg-[#F9FAFB] rounded-[14px] w-full border border-[#E5E7EB]">
                      <Logo size="lg" variant="full" />
                      <span className="text-xs text-[#667085] mt-2">Full Horizontal Variant</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-[#F9FAFB] rounded-[14px] w-full border border-[#E5E7EB]">
                      <Logo size="lg" variant="stacked" />
                      <span className="text-xs text-[#667085] mt-2">Stacked Variant</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-[#F9FAFB] rounded-[14px] w-full border border-[#E5E7EB]">
                      <Logo size="xl" variant="mark" />
                      <span className="text-xs text-[#667085] mt-2">Geometric Mark Only</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Button System */}
            <section id="section-buttons">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <SectionTitle>Button & Action System</SectionTitle>
                  <SecondaryText>44–48px touch-friendly heights with visible keyboard focus and distinct hierarchy.</SecondaryText>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setBtnLoading(!btnLoading)}
                  leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${btnLoading ? 'animate-spin' : ''}`} />}
                >
                  {btnLoading ? 'Stop Loading State' : 'Toggle Loading State'}
                </Button>
              </div>

              <Card variant="default">
                <CardContent className="p-6 space-y-6">
                  {/* Variants */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#667085] block mb-3">
                      Button Variants (Medium / 44–46px)
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary" isLoading={btnLoading}>
                        Primary Action
                      </Button>
                      <Button variant="secondary" isLoading={btnLoading}>
                        Secondary Action
                      </Button>
                      <Button variant="soft" isLoading={btnLoading}>
                        Soft Indigo
                      </Button>
                      <Button variant="outline" isLoading={btnLoading}>
                        Outline
                      </Button>
                      <Button variant="tertiary" isLoading={btnLoading}>
                        Tertiary Text
                      </Button>
                      <Button variant="destructive" isLoading={btnLoading}>
                        Destructive
                      </Button>
                      <Button variant="primary" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>

                  <Divider />

                  {/* Sizing & Icons */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#667085] block mb-3">
                      Sizes & Icon Integration
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="primary" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                        Small (36px)
                      </Button>
                      <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Medium (44px)
                      </Button>
                      <Button size="lg" variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
                        Large (52px)
                      </Button>
                    </div>
                  </div>

                  <Divider />

                  {/* Icon Buttons */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#667085] block mb-3">
                      Icon Buttons & Precision Toolbars
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Tooltip content="Search Library" placement="top">
                        <IconButton icon={<Search className="w-4 h-4" />} aria-label="Search" variant="secondary" size="md" />
                      </Tooltip>
                      <Tooltip content="System Parameters" placement="top">
                        <IconButton icon={<Sliders className="w-4 h-4" />} aria-label="Settings" variant="soft" size="md" />
                      </Tooltip>
                      <Tooltip content="Primary Action" placement="top">
                        <IconButton icon={<Sparkles className="w-4 h-4" />} aria-label="Generate" variant="primary" size="md" />
                      </Tooltip>
                      <Tooltip content="Rounded Full Variant" placement="top">
                        <IconButton icon={<ArrowRight className="w-4 h-4" />} aria-label="Next" variant="secondary" size="md" isRoundedFull />
                      </Tooltip>
                      <Tooltip content="Danger Action" placement="top">
                        <IconButton icon={<AlertTriangle className="w-4 h-4" />} aria-label="Warning" variant="destructive" size="md" />
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Input System & Form Controls */}
            <section id="section-inputs">
              <div className="mb-4">
                <SectionTitle>Input & Form Controls</SectionTitle>
                <SecondaryText>46–50px comfortable inputs, clear focus rings, custom dropdown select, and clean states.</SecondaryText>
              </div>

              <Card variant="default">
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Standard Input */}
                  <Input
                    label="Active Topic Query"
                    value={sampleInputValue}
                    onChange={(e) => setSampleInputValue(e.target.value)}
                    showClearButton
                    onClear={() => setSampleInputValue('')}
                    leftIcon={<Search className="w-4 h-4" />}
                    helperText="Input field with left icon and clear action."
                  />

                  {/* Error State Input */}
                  <Input
                    label="Required Identifier"
                    placeholder="e.g. USER-9402"
                    value={sampleErrorInput}
                    onChange={(e) => setSampleErrorInput(e.target.value)}
                    errorMessage={!sampleErrorInput ? 'Identifier field cannot be empty.' : undefined}
                    helperText="Type to clear the error validation state."
                  />

                  {/* Disabled Input */}
                  <Input
                    label="Read-Only Kernel ID"
                    value="NOEVIS-CORE-v1.0"
                    disabled
                    helperText="Disabled field with protected styling."
                  />

                  {/* Custom Accessible Select */}
                  <Select
                    label="Domain Specialization"
                    value={selectedTopic}
                    onChange={(val) => setSelectedTopic(val)}
                    options={[
                      { value: 'physics', label: 'Quantum & Theoretical Physics', description: 'Advanced wave mechanics' },
                      { value: 'math', label: 'Multivariable Calculus', description: 'Differential forms & manifolds' },
                      { value: 'cs', label: 'Algorithm Complexity', description: 'P vs NP & asymptotic notation' },
                      { value: 'biology', label: 'Cellular Biochemistry', description: 'Metabolic pathways' },
                    ]}
                    helperText="Custom styled accessible select dropdown."
                  />

                  {/* Textarea with Counter */}
                  <div className="md:col-span-2">
                    <Textarea
                      label="Synthesis Prompt / Reasoning Context"
                      value={sampleTextarea}
                      onChange={(e) => setSampleTextarea(e.target.value)}
                      maxLength={200}
                      showCharCount
                      helperText="Multi-line textarea with active character constraint count."
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Badges & Progress */}
            <section id="section-badges-progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Badges */}
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Badge & Status Tags</CardTitle>
                    <CardDescription>Single-line tags with optional dot indicator.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="soft" dot>Soft Indigo</Badge>
                      <Badge variant="indigo">Primary Indigo</Badge>
                      <Badge variant="success" dot>Verified 100%</Badge>
                      <Badge variant="warning" dot>Processing</Badge>
                      <Badge variant="error" dot>Error Detected</Badge>
                      <Badge variant="neutral">Neutral Tag</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>

                    <Divider />

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#667085]">Sizes:</span>
                      <Badge variant="soft" size="sm" dot>Small (22px)</Badge>
                      <Badge variant="soft" size="md" dot>Medium (26px)</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Indicators */}
                <Card variant="default">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Progress Indicators</CardTitle>
                      <span className="text-xs font-mono text-[#4B5BEA] font-semibold">{progressVal}%</span>
                    </div>
                    <CardDescription>Linear bars and SVG progress rings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <ProgressBar
                      value={progressVal}
                      label="Synthesis Completion"
                      showLabel
                      variant="indigo"
                    />

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <ProgressRing value={progressVal} showValue size={54} variant="indigo" />
                        <ProgressRing value={100} size={42} variant="success" showValue />
                        <ProgressRing value={45} size={42} variant="warning" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setProgressVal((p) => Math.max(0, p - 15))}
                        >
                          -15%
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setProgressVal((p) => Math.min(100, p + 15))}
                        >
                          +15%
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* SECTION 3: DIALOGS, FEEDBACK & SYSTEM STATES */}
        {activeTab === 'states' && (
          <div className="space-y-12">
            {/* Modal & BottomSheet Trigger Sandbox */}
            <section id="section-dialogs">
              <div className="mb-4">
                <SectionTitle>Overlay Systems (Modal & BottomSheet)</SectionTitle>
                <SecondaryText>iOS-inspired smooth dialogs, mobile sheets, and backdrop blur transitions.</SecondaryText>
              </div>

              <Card variant="default">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => setModalOpen(true)}
                      leftIcon={<Maximize2 className="w-4 h-4" />}
                    >
                      Open Sample Modal
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSheetOpen(true)}
                      leftIcon={<Smartphone className="w-4 h-4" />}
                    >
                      Open Mobile Bottom Sheet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Toast Triggers */}
            <section id="section-toasts">
              <div className="mb-4">
                <SectionTitle>Toast Notification Suite</SectionTitle>
                <SecondaryText>Non-intrusive feedback toasts with auto-dismiss timers.</SecondaryText>
              </div>

              <Card variant="default">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => success('Synthesis Complete', 'All concepts successfully indexed in memory.')}
                    >
                      Trigger Success Toast
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => error('Network Disruption', 'Unable to reach the Noevis knowledge kernel.')}
                    >
                      Trigger Error Toast
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => warning('High Token Consumption', 'Complex synthesis requested.')}
                    >
                      Trigger Warning Toast
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => info('Session Active', 'Collaborative learning session initialized.')}
                    >
                      Trigger Info Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* System States: Loading, Error, Empty */}
            <section id="section-system-states">
              <div className="mb-4">
                <SectionTitle>Standardized System States</SectionTitle>
                <SecondaryText>Reusable state representations for loading, errors, and empty views.</SecondaryText>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Loading Skeleton */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                    Loading Skeleton Surface
                  </span>
                  <LoadingCard />
                </div>

                {/* Error State Card */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                    Error Surface
                  </span>
                  <ErrorState
                    title="Source Extraction Failed"
                    description="Could not parse the mathematical notations from the provided document."
                    errorCode="ERR_PARSE_602"
                    onRetry={() => success('Retrying Extraction', 'Re-evaluating AST tokens...')}
                  />
                </div>

                {/* Empty State Card */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                    Calm Empty State
                  </span>
                  <EmptyState
                    title="No Learning Notes Yet"
                    description="When you start exploring ideas or generating synthesis paths, they will appear here."
                    primaryAction={{
                      label: 'Begin First Note',
                      onClick: () => success('Note Initialized', 'Ready for learning input.'),
                      icon: <Sparkles className="w-4 h-4" />,
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Interactive Modal Instance */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal Dialog Specification"
          description="A calibrated 20px radius modal with focus trapping and subtle entry transitions."
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setModalOpen(false);
                  success('Modal Action Confirmed', 'Changes were accepted.');
                }}
              >
                Confirm Action
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Body className="text-[#111827]">
              Modals in the Noevis design system adhere strictly to the 20px radius standard and feature a high-contrast
              header, comfortable padding, and full accessibility.
            </Body>
            <Input label="Workspace Parameter" placeholder="Enter configuration name..." />
          </div>
        </Modal>

        {/* Interactive Bottom Sheet Instance */}
        <BottomSheet
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Mobile Context Sheet"
          description="Slide-up container optimized for touch interactions."
          footer={
            <Button variant="primary" fullWidth onClick={() => setSheetOpen(false)}>
              Apply Context
            </Button>
          }
        >
          <div className="space-y-3">
            <Body>
              This bottom sheet is designed for single-column mobile viewports and tablet interactions with swipe-to-dismiss
              and clean touch targets.
            </Body>
            <Select
              label="Select Quick Preset"
              options={[
                { value: '1', label: 'Concise Summary' },
                { value: '2', label: 'Detailed Step-by-Step Derivation' },
                { value: '3', label: 'Flashcard Quiz Format' },
              ]}
            />
          </div>
        </BottomSheet>
      </main>

      {/* Design System Foundation Footer */}
      <footer className="w-full border-t border-[#E5E7EB] bg-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <div className="flex items-center gap-3">
            <Logo size="xs" variant="full" showBadge={false} />
            <span>• V1 Phase 0 Design System Foundation</span>
          </div>
          <div>
            Locked Visual Specification • Light Theme Standard
          </div>
        </div>
      </footer>
    </div>
  );
}
