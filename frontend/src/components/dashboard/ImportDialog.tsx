'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useImportDocument } from '../../features/documents/queries/useImportDocument';
import { FileText, UploadCloud } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportDialog({ isOpen, onOpenChange }: ImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const importDoc = useImportDocument();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleImport = () => {
    if (!file) return;

    importDoc.mutate(file, {
      onSuccess: (document) => {
        onOpenChange(false);
        setFile(null);
        router.push(`/documents/${document.id}`);
      },
    });
  };

  const handleCancel = () => {
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Document</DialogTitle>
          <DialogDescription>
            Upload a .txt or .md file up to 5MB to create a new document.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!file ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-gray-700">
                Drag & drop a file here, or click to select
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: .txt, .md (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 flex items-center gap-3 bg-gray-50">
              <div className="bg-blue-100 p-2 rounded">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500"
                onClick={() => setFile(null)}
                disabled={importDoc.isPending}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 mt-6 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={handleCancel} disabled={importDoc.isPending} className="sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || importDoc.isPending} className="sm:w-auto">
            {importDoc.isPending ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Importing...
              </>
            ) : (
              'Import'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
