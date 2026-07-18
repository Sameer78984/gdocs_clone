'use client';

import { useEditorStore } from '../../store/editor.store';
import { Cloud, CloudCog, CloudOff } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SaveIndicator() {
  const { saveStatus } = useEditorStore();

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="hidden lg:flex items-center text-xs text-gray-400 font-medium tracking-wide">
        Press <kbd className="font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 ml-1 mr-1 text-[10px] shadow-sm">Ctrl + S</kbd> to save
      </span>
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium">
      {saveStatus === 'Saving...' && (
        <>
          <CloudCog className="h-4 w-4 text-blue-500 animate-pulse shrink-0" />
          <span className="hidden xs:inline text-blue-600">Saving...</span>
        </>
      )}
      {saveStatus === 'Saved' && (
        <>
          <Cloud className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Saved</span>
        </>
      )}
      {saveStatus === 'Unsaved changes' && (
        <>
          <CloudOff className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Unsaved</span>
        </>
      )}
      {saveStatus === 'Error' && (
        <>
          <CloudOff className="h-4 w-4 text-red-500 shrink-0" />
          <span className="hidden sm:inline text-red-500">Failed</span>
        </>
      )}
      </div>
    </div>
  );
}
