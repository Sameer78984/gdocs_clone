'use client';

import { Header } from '../../../components/dashboard/Header';
import { DocumentList } from '../../../components/dashboard/DocumentList';
import { useSharedDocuments } from '../../../features/documents/queries/useSharedDocuments';
import { useRenameDocument } from '../../../features/documents/queries/useRenameDocument';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorState } from '../../../components/common/ErrorState';

export default function SharedDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useSharedDocuments({ 
    q: debouncedQuery || undefined 
  });
  
  const renameDoc = useRenameDocument();

  const handleRename = (id: string, newTitle: string) => {
    if (newTitle) {
      renameDoc.mutate({ id, title: newTitle });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Shared With Me" />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner className="h-8 w-8 text-blue-600" />
        </div>
      ) : isError ? (
        <div className="p-8">
          <ErrorState action={<button onClick={() => refetch()} className="text-sm font-medium underline">Try again</button>} />
        </div>
      ) : (
        <DocumentList 
          documents={data?.documents || []}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRename={handleRename}
        />
      )}
    </div>
  );
}
