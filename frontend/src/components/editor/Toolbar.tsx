'use client';

import { useEditorStore } from '../../store/editor.store';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo,
  Redo,
  RemoveFormatting
} from 'lucide-react';

export function Toolbar() {
  const { activeEditor: editor } = useEditorStore();
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const update = () => setTick((t) => t + 1);
    editor.on('transaction', update);

    return () => {
      editor.off('transaction', update);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b bg-white px-2 sm:px-4 py-1.5 flex flex-wrap items-center gap-0.5 sm:gap-1 sticky top-0 z-10 overflow-x-hidden shrink-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        title="Bold"
      >
        <Bold size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        title="Italic"
      >
        <Italic size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
        title="Underline"
      >
        <Underline size={16} />
      </Button>
      
      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        title="Bullet List"
      >
        <List size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={16} />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        title="Clear Formatting"
      >
        <RemoveFormatting size={16} />
      </Button>
    </div>
  );
}
