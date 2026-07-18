'use client';

import { Input } from '../ui/input';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

interface DocumentTitleProps {
  title: string;
  onRename: (newTitle: string) => void;
  canEdit: boolean;
}

export function DocumentTitle({ title, onRename, canEdit }: DocumentTitleProps) {
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleRename = debounce((newTitle: string) => {
    if (newTitle.trim() && newTitle !== title) {
      onRename(newTitle);
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalTitle(val);
    handleRename(val);
  };

  if (!canEdit) {
    return <h1 className="text-lg font-semibold px-3 py-1.5">{title}</h1>;
  }

  return (
    <Input
      value={localTitle}
      onChange={handleChange}
      className="text-sm sm:text-base font-semibold border-transparent hover:border-gray-300 focus:border-blue-500 bg-transparent px-2 py-1 sm:px-3 sm:py-1.5 min-w-0 w-full max-w-[150px] sm:max-w-[260px] md:max-w-sm lg:max-w-md h-auto shadow-none focus-visible:ring-0"
    />
  );
}
