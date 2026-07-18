import { create } from 'zustand';
import { Editor } from '@tiptap/react';

type SaveStatus = 'Saved' | 'Saving...' | 'Unsaved changes' | 'Error';

interface EditorState {
  isDirty: boolean;
  saveStatus: SaveStatus;
  activeEditor: Editor | null;
  setDirty: (isDirty: boolean) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setActiveEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isDirty: false,
  saveStatus: 'Saved',
  activeEditor: null,
  setDirty: (isDirty) => set({ isDirty, saveStatus: isDirty ? 'Unsaved changes' : 'Saved' }),
  setSaveStatus: (status) => set({ saveStatus: status }),
  setActiveEditor: (editor) => set({ activeEditor: editor }),
}));
