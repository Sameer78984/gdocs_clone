'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useGetShares } from '../../features/documents/queries/useGetShares';
import { useShareDocument } from '../../features/documents/queries/useShareDocument';
import { useUpdateShare } from '../../features/documents/queries/useUpdateShare';
import { useDeleteShare } from '../../features/documents/queries/useDeleteShare';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ShareDialogProps {
  documentId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ documentId, isOpen, onOpenChange }: ShareDialogProps) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'READ' | 'EDIT'>('READ');

  const { data: shares, isLoading } = useGetShares(isOpen ? documentId : '');
  const shareDoc = useShareDocument();
  const updateShare = useUpdateShare();
  const deleteShare = useDeleteShare();

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    shareDoc.mutate(
      { documentId, email, permission },
      {
        onSuccess: () => {
          setEmail('');
          setPermission('READ');
        },
      }
    );
  };

  const handleUpdate = (shareId: string, newPermission: 'READ' | 'EDIT') => {
    updateShare.mutate({ documentId, shareId, permission: newPermission });
  };

  const handleRemove = (shareId: string) => {
    deleteShare.mutate({ documentId, shareId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleShare} className="flex flex-col gap-2 mt-4 sm:flex-row">
          <Input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={shareDoc.isPending}
            className="flex-1"
            type="email"
          />
          <div className="flex gap-2">
            <Select
              value={permission}
              onValueChange={(val) => {
                if (val === 'READ' || val === 'EDIT') setPermission(val);
              }}
              disabled={shareDoc.isPending}
            >
              <SelectTrigger className="w-[100px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="READ">READ</SelectItem>
                <SelectItem value="EDIT">EDIT</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!email.trim() || shareDoc.isPending} className="flex-1 sm:flex-none">
              Share
            </Button>
          </div>
        </form>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Current Collaborators</h4>
          
          <ScrollArea className="h-[200px] pr-4">
            {isLoading ? (
              <div className="flex justify-center p-4">
                <LoadingSpinner />
              </div>
            ) : shares?.length === 0 ? (
              <div className="text-sm text-gray-500 text-center p-4">
                This document isn't shared with anyone yet.
              </div>
            ) : (
              <div className="space-y-4">
                {shares?.map((share) => (
                  <div key={share.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                          {share.user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{share.user?.name || 'Unknown User'}</span>
                        <span className="text-xs text-muted-foreground mt-1">{share.user?.email || 'No email'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {share.permission === 'OWNER' ? (
                        <Badge variant="secondary" className="font-normal text-xs">
                          Owner
                        </Badge>
                      ) : (
                        <>
                          <Select
                            value={share.permission}
                            onValueChange={(val) => {
                              if (val === 'READ' || val === 'EDIT') handleUpdate(share.id, val);
                            }}
                            disabled={updateShare.isPending}
                          >
                            <SelectTrigger className="h-7 w-[80px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="READ" className="text-xs">READ</SelectItem>
                              <SelectItem value="EDIT" className="text-xs">EDIT</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemove(share.id)}
                            disabled={deleteShare.isPending}
                          >
                            Remove
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
