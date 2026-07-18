'use client';

import { Editor } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { Button } from '../ui/button';
import { Bold, Italic, Underline } from 'lucide-react';

interface BubbleMenuProps {
  editor: Editor;
}

export function BubbleMenu({ editor }: BubbleMenuProps) {
  return (
    <TiptapBubbleMenu 
      editor={editor} 
      className="flex overflow-hidden rounded-md border bg-background shadow-md"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`h-8 w-8 p-0 rounded-none ${editor.isActive('bold') ? 'bg-muted' : ''}`}
      >
        <Bold size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 w-8 p-0 rounded-none border-x ${editor.isActive('italic') ? 'bg-muted' : ''}`}
      >
        <Italic size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`h-8 w-8 p-0 rounded-none ${editor.isActive('underline') ? 'bg-muted' : ''}`}
      >
        <Underline size={14} />
      </Button>
    </TiptapBubbleMenu>
  );
}
