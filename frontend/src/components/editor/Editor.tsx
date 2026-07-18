'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Typography from '@tiptap/extension-typography';
import { useUpdateDocument } from '../../features/documents/queries/useUpdateDocument';
import { useEditorStore } from '../../store/editor.store';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { BubbleMenu } from './BubbleMenu';
import { FloatingMenu } from './FloatingMenu';
import { toast } from 'sonner';

interface EditorProps {
  documentId: string;
  initialContent?: string;
  canEdit: boolean;
}

export function Editor({ documentId, initialContent = '', canEdit }: EditorProps) {
  const { setDirty, setSaveStatus, setActiveEditor } = useEditorStore();
  const { mutate } = useUpdateDocument();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((content: string) => {
      setSaveStatus('Saving...');
      mutate(
        { id: documentId, content },
        {
          onSuccess: () => {
            setDirty(false);
            setSaveStatus('Saved');
          },
          onError: () => {
            setSaveStatus('Error');
            toast.error('Failed to save document. Please try again.');
          },
        }
      );
    }, 800),
    [documentId, mutate, setDirty, setSaveStatus]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Typography,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      CharacterCount,
    ],
    content: initialContent,
    editable: canEdit,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      setDirty(true);
      debouncedSave(editor.getHTML());
    },
  });

  // Manage active editor in store
  useEffect(() => {
    if (editor) {
      setActiveEditor(editor);
    }
    return () => {
      setActiveEditor(null);
    };
  }, [editor, setActiveEditor]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  if (!editor) {
    return null;
  }

  // We set the editor in window object for the Toolbar to access, or pass it via context.
  // A cleaner way is to render the Toolbar inside the Editor component or use a Context.
  // Since Toolbar is part of EditorShell and we don't have a context yet, we should probably
  // pass the editor instance out to the Shell, or we can use a Context.
  // Let's create an EditorContext or store the active editor in the Zustand store.
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (editor && canEdit) {
        debouncedSave(editor.getHTML());
        debouncedSave.flush();
      }
    }
  };

  return (
    <div 
      className="w-full max-w-[850px] mx-auto bg-white min-h-[500px] sm:min-h-[800px] md:min-h-[1056px] my-4 sm:my-8 shadow-sm border p-4 sm:p-10 md:p-16 lg:p-24 relative"
      onKeyDown={handleKeyDown}
    >
      {canEdit && <BubbleMenu editor={editor} />}
      {canEdit && <FloatingMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
