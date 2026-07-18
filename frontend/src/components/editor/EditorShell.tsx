'use client';

import { ReactNode } from 'react';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { DocumentTitle } from './DocumentTitle';
import { SaveIndicator } from './SaveIndicator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface EditorShellProps {
  children: ReactNode;
  documentId: string;
  title: string;
  canEdit: boolean;
  onRename: (newTitle: string) => void;
}

export function EditorShell({ children, documentId, title, canEdit, onRename }: EditorShellProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50/50 overflow-hidden">
      <div className="flex items-center justify-between px-2 py-2 sm:px-4 border-b bg-white gap-2 shrink-0">
        <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
          <Link href="/dashboard" className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0" title="Back to Dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-4 w-px bg-gray-200 hidden sm:block shrink-0"></div>
          <div className="min-w-0 flex-1">
            <DocumentTitle title={title} onRename={onRename} canEdit={canEdit} />
          </div>
        </div>
        <div className="shrink-0">
          <SaveIndicator />
        </div>
      </div>
      
      {canEdit && <Toolbar />}
      
      <div className="flex-1 overflow-y-auto px-2 sm:px-6 md:px-8 py-4 sm:py-8">
        {children}
      </div>

      <StatusBar />
    </div>
  );
}
