'use client';

import { Editor } from '@tiptap/react';
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react/menus';
import { Button } from '../ui/button';
import { Heading1, List, ListOrdered } from 'lucide-react';

interface FloatingMenuProps {
  editor: Editor;
}

export function FloatingMenu({ editor }: FloatingMenuProps) {
  return (
    <TiptapFloatingMenu 
      editor={editor} 
      className="flex gap-1 overflow-hidden rounded-md border bg-background p-1 shadow-md"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
        title="Heading 1"
      >
        <Heading1 size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
        title="Bullet List"
      >
        <List size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
        title="Ordered List"
      >
        <ListOrdered size={14} />
      </Button>
    </TiptapFloatingMenu>
  );
}
