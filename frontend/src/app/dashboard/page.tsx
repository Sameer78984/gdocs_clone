'use client';

import { Header } from '../../components/dashboard/Header';
import { DocumentList } from '../../components/dashboard/DocumentList';
import { useOwnedDocuments } from '../../features/documents/queries/useOwnedDocuments';
import { useDeleteDocument } from '../../features/documents/queries/useDeleteDocument';
import { useRenameDocument } from '../../features/documents/queries/useRenameDocument';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';
import { useCreateDocument } from '../../features/documents/queries/useCreateDocument';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useOwnedDocuments({ 
    q: debouncedQuery || undefined 
  });
  
  const deleteDoc = useDeleteDocument();
  const renameDoc = useRenameDocument();
  const createDoc = useCreateDocument();

  const handleDelete = (id: string) => {
    deleteDoc.mutate(id);
  };

  const handleRename = (id: string, newTitle: string) => {
    if (newTitle) {
      renameDoc.mutate({ id, title: newTitle });
    }
  };

  const handleCreate = () => {
    createDoc.mutate({ title: 'Untitled Document', content: '' }, {
      onSuccess: (doc) => {
        router.push(`/documents/${doc.id}`);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="My Documents" />
      
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
          onDelete={handleDelete}
          onRename={handleRename}
          onAction={handleCreate}
          actionLabel="Create Document"
        />
      )}
    </div>
  );
}
