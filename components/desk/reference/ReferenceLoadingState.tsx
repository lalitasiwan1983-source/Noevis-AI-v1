'use client';

import React from 'react';

export const ReferenceLoadingState: React.FC = () => {
  return (
    <div
      id="reference-loading-skeleton"
      className="w-full space-y-5 animate-pulse"
      aria-label="Loading reference context"
    >
      {/* Source header card skeleton */}
      <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-[#E5E7EB] rounded-md" />
          <div className="h-4 w-16 bg-[#E5E7EB] rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-[#E5E7EB] rounded-md" />
        <div className="h-3.5 w-1/2 bg-[#E5E7EB] rounded-md" />
      </div>

      {/* Excerpt box skeleton */}
      <div className="space-y-2">
        <div className="h-3.5 w-28 bg-[#E5E7EB] rounded" />
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] space-y-2.5">
          <div className="h-3.5 w-full bg-[#F3F4F6] rounded" />
          <div className="h-3.5 w-5/6 bg-[#F3F4F6] rounded" />
          <div className="h-3.5 w-4/6 bg-[#F3F4F6] rounded" />
        </div>
      </div>

      {/* Key points skeleton */}
      <div className="space-y-2.5">
        <div className="h-3.5 w-32 bg-[#E5E7EB] rounded" />
        <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2">
          <div className="h-4 w-1/3 bg-[#E5E7EB] rounded" />
          <div className="h-3 w-4/5 bg-[#F3F4F6] rounded" />
        </div>
        <div className="p-3.5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] space-y-2">
          <div className="h-4 w-2/5 bg-[#E5E7EB] rounded" />
          <div className="h-3 w-3/4 bg-[#F3F4F6] rounded" />
        </div>
      </div>
    </div>
  );
};
