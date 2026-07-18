import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useRenameDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => 
      documentService.renameDocument(id, { title }),
    onSuccess: (updatedDoc) => {
      queryClient.setQueryData(['documents', updatedDoc.id], updatedDoc);
      queryClient.invalidateQueries({ queryKey: ['documents', 'owned'] });
      queryClient.invalidateQueries({ queryKey: ['documents', 'shared'] });
    },
  });
}
