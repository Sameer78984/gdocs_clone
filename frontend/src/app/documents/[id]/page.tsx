'use client';

import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';
import { useDocument } from '../../../features/documents/queries/useDocument';
import { useRenameDocument } from '../../../features/documents/queries/useRenameDocument';
import { EditorShell } from '../../../components/editor/EditorShell';
import { Editor } from '../../../components/editor/Editor';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorState } from '../../../components/common/ErrorState';
import { use } from 'react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: document, isLoading, isError } = useDocument(resolvedParams.id);
  const renameDoc = useRenameDocument();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner className="h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (isError || !document) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
        <ErrorState 
          title="Document unavailable"
          message="This document might have been deleted, or you don't have permission to view it."
          action={
            <Link href="/dashboard">
              <Button variant="outline">Return to Dashboard</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const canEdit = document.permission === 'OWNER' || document.permission === 'EDIT';

  const handleRename = (newTitle: string) => {
    renameDoc.mutate({ id: document.id, title: newTitle });
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <EditorShell 
        documentId={document.id} 
        title={document.title} 
        canEdit={canEdit}
        onRename={handleRename}
      >
        <Editor 
          documentId={document.id} 
          initialContent={document.content} 
          canEdit={canEdit} 
        />
      </EditorShell>
    </ProtectedRoute>
  );
}
