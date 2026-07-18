'use client';

import { useState } from 'react';
import { PageHeader } from '../common/PageHeader';
import { Button } from '../ui/button';
import { Upload, Plus, Menu } from 'lucide-react';
import { useCreateDocument } from '../../features/documents/queries/useCreateDocument';
import { useRouter } from 'next/navigation';
import { ImportDialog } from './ImportDialog';
import { useUIStore } from '../../store/ui.store';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const createDoc = useCreateDocument();
  const router = useRouter();
  const { setSidebarOpen } = useUIStore();

  const handleCreateNew = () => {
    createDoc.mutate(
      { title: 'Untitled Document', content: '' },
      {
        onSuccess: (doc) => {
          router.push(`/documents/${doc.id}`);
        }
      }
    );
  };

  return (
    <>
      <div className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 border-b bg-white flex items-center justify-between gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-2 min-w-0">
          {/* Hamburger — mobile only (hidden on md+) */}
          <button
            className="md:hidden p-2 -ml-1 rounded-md text-gray-500 hover:bg-gray-100 shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <PageHeader title={title} />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Import — icon-only on xs, label on sm+ */}
          <Button
            variant="outline"
            className="gap-2 px-2 sm:px-4"
            onClick={() => setIsImportOpen(true)}
            aria-label="Import document"
          >
            <Upload size={16} className="shrink-0" />
            <span className="hidden sm:inline">Import</span>
          </Button>

          {/* New Document — icon-only on xs, label on sm+ */}
          <Button
            onClick={handleCreateNew}
            disabled={createDoc.isPending}
            className="gap-2 px-2 sm:px-4"
            aria-label="New document"
          >
            <Plus size={16} className="shrink-0" />
            <span className="hidden sm:inline">New Document</span>
          </Button>
        </div>
      </div>

      <ImportDialog isOpen={isImportOpen} onOpenChange={setIsImportOpen} />
    </>
  );
}
