'use client';

import React from 'react';
import {
  FileText,
  FileCode,
  Globe,
  Video,
  Camera,
  ExternalLink,
  Target,
  FilePlus2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ReferenceSourceType, ReferenceData } from './types';

interface ReferenceSourceViewProps {
  data: ReferenceData;
  onOpenSource?: () => void;
  onFocusSection?: () => void;
  onAddToNotes?: (text: string) => void;
}

export const ReferenceSourceView: React.FC<ReferenceSourceViewProps> = ({
  data,
  onOpenSource,
  onFocusSection,
  onAddToNotes,
}) => {
  const getSourceTypeBadge = (type: ReferenceSourceType) => {
    switch (type) {
      case 'file':
        return {
          label: 'Document / PDF',
          icon: FileText,
          tagColor: 'text-[#1E40AF] bg-[#EFF6FF] border-[#BFDBFE]',
        };
      case 'text':
        return {
          label: 'Curriculum Text',
          icon: FileCode,
          tagColor: 'text-[#374151] bg-[#F3F4F6] border-[#E5E7EB]',
        };
      case 'link':
        return {
          label: 'Web Reference',
          icon: Globe,
          tagColor: 'text-[#0D9488] bg-[#F0FDFA] border-[#99F6E4]',
        };
      case 'youtube':
        return {
          label: 'Lecture Clip',
          icon: Video,
          tagColor: 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]',
        };
      case 'photo':
        return {
          label: 'Captured Note',
          icon: Camera,
          tagColor: 'text-[#7C3AED] bg-[#F5F3FF] border-[#DDD6FE]',
        };
    }
  };

  const badgeInfo = getSourceTypeBadge(data.sourceType);
  const SourceIcon = badgeInfo.icon;

  return (
    <div id="reference-source-view" className="space-y-6 text-left">
      {/* 1. Source Header Card */}
      <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badgeInfo.tagColor}`}
          >
            <SourceIcon className="w-3.5 h-3.5" />
            <span>{badgeInfo.label}</span>
          </span>

          {data.sectionLocator && (
            <span className="text-[11px] font-medium text-[#6B7280] bg-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
              {data.sectionLocator}
            </span>
          )}
        </div>

        <div>
          <h4 className="text-[15px] font-bold text-[#111827] leading-snug">
            {data.sourceTitle}
          </h4>
          {data.sourceOrigin && (
            <p className="text-xs text-[#6B7280] mt-0.5">{data.sourceOrigin}</p>
          )}
        </div>

        {/* Quick Context Actions */}
        <div className="pt-2 border-t border-[#E5E7EB]/60 flex items-center gap-2 flex-wrap">
          {onOpenSource && (
            <button
              type="button"
              onClick={onOpenSource}
              className="h-8 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Open Source</span>
            </button>
          )}

          {onFocusSection && (
            <button
              type="button"
              onClick={onFocusSection}
              className="h-8 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Target className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Focus Section</span>
            </button>
          )}

          {onAddToNotes && data.excerpt && (
            <button
              type="button"
              onClick={() => onAddToNotes(data.excerpt!)}
              className="h-8 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#374151] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FilePlus2 className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Add to Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Direct Source Excerpt */}
      {data.excerpt && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
            Relevant Excerpt
          </span>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] border-l-4 border-l-[#111827] text-xs sm:text-[13.5px] text-[#374151] leading-relaxed italic shadow-2xs">
            &ldquo;{data.excerpt}&rdquo;
          </div>
        </div>
      )}

      {/* 3. Core Principles / Anchor Extract */}
      {data.keyPoints && data.keyPoints.length > 0 && (
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
            Source Key Takeaways
          </span>
          <div className="space-y-2">
            {data.keyPoints.map((point, index) => (
              <div
                key={`source-point-${index}`}
                className="p-3 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" />
                <p className="text-xs text-[#374151] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Timestamp / Verification Info */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-[#9CA3AF] border-t border-[#F3F4F6]">
        <span>Verified context mapping</span>
        {data.lastUpdated && <span>Sync: {data.lastUpdated}</span>}
      </div>
    </div>
  );
};
