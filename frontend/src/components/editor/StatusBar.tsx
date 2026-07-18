'use client';

import { useEditorStore } from '../../store/editor.store';

export function StatusBar() {
  const { activeEditor: editor } = useEditorStore();

  if (!editor) {
    return null;
  }

  const words = editor.storage.characterCount.words();
  const characters = editor.storage.characterCount.characters();

  return (
    <div className="border-t bg-white px-4 py-1.5 flex justify-between items-center text-xs text-gray-500 shrink-0">
      <div className="flex gap-3 sm:gap-4">
        <span>{words} {words === 1 ? 'word' : 'words'}</span>
        <span className="hidden sm:inline">{characters} {characters === 1 ? 'character' : 'characters'}</span>
      </div>
    </div>
  );
}
