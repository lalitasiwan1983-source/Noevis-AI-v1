'use client';

import React, { useState } from 'react';
import { HomeScreen, CanvasScreen } from '@/components/screens';

export default function DesksPage() {
  const [screen, setScreen] = useState<'home' | 'canvas'>('home');

  const handleStartCanvas = () => {
    setScreen('canvas');
  };

  if (screen === 'canvas') {
    return <CanvasScreen onBackToHome={() => setScreen('home')} />;
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#F7F8FA] text-[#111827] flex flex-col justify-between overflow-x-hidden">
      <HomeScreen
        initialNav="canvases"
        onStartCanvas={handleStartCanvas}
      />
    </div>
  );
}
