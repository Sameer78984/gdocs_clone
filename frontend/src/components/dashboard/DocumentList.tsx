'use client';

import { DocumentDTO } from '../../features/documents/services/document.service';
import { DocumentCard } from './DocumentCard';
import { EmptyState } from '../common/EmptyState';
import { FileText, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface DocumentListProps {
  documents: DocumentDTO[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, currentTitle: string) => void;
  onShare?: (id: string) => void;
  onAction?: () => void;
  actionLabel?: string;
}

export function DocumentList({ documents, searchQuery, onSearchChange, onDelete, onRename, onShare, onAction, actionLabel }: DocumentListProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 w-full sm:max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search documents..." 
          className="pl-9 bg-white w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {documents.length === 0 ? (
        <EmptyState 
          icon={<FileText />}
          title={searchQuery ? "No matching documents" : "No documents yet"}
          description={searchQuery ? "Try a different search term" : "Create your first document to get started."}
          className="bg-white py-16"
          action={
            !searchQuery && onAction && actionLabel ? (
              <Button onClick={onAction}>
                <Plus className="mr-2 h-4 w-4" />
                {actionLabel}
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <DocumentCard 
              key={doc.id} 
              document={doc} 
              onDelete={onDelete}
              onRename={onRename}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
