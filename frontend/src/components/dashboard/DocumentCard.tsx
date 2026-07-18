'use client';

import { useState } from 'react';
import { DocumentDTO } from '../../features/documents/services/document.service';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { FileText, MoreVertical, Edit, Trash, Users, Share2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { formatDate } from '../../lib/utils';
import { ShareDialog } from './ShareDialog';
import { RenameDialog } from './RenameDialog';
import { DeleteDialog } from './DeleteDialog';
import Link from 'next/link';

interface DocumentCardProps {
  document: DocumentDTO;
  onDelete?: (id: string) => void;
  onRename?: (id: string, currentTitle: string) => void;
  onShare?: (id: string) => void;
}

export function DocumentCard({ document, onDelete, onRename, onShare }: DocumentCardProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Card className="group hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer relative">
      <Link href={`/documents/${document.id}`} className="absolute inset-0 z-10" />
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 relative z-20 pointer-events-none">
        <div className="flex gap-3 min-w-0 flex-1">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mt-0.5 shrink-0">
            <FileText size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base line-clamp-1">{document.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="shrink-0">{formatDate(document.updatedAt)}</span>
              {document.permission && document.permission !== 'OWNER' && (
                <>
                  <span className="shrink-0">•</span>
                  <span className="flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 truncate max-w-[120px]">
                    <Users size={10} className="shrink-0" />
                    {document.owner.name}
                  </span>
                </>
              )}
            </CardDescription>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="pointer-events-auto h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </Button>
          } />
          <DropdownMenuContent align="end">
            <>
              <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <ShareDialog
        documentId={document.id}
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
      />
      <RenameDialog
        isOpen={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        currentTitle={document.title}
        onRename={(newTitle) => onRename?.(document.id, newTitle)}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          onDelete?.(document.id);
          setIsDeleteDialogOpen(false);
        }}
      />
    </Card>
  );
}
