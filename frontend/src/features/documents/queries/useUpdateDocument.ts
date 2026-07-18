import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => 
      documentService.updateDocument(id, { content }),
    onSuccess: (updatedDoc) => {
      queryClient.setQueryData(['documents', updatedDoc.id], updatedDoc);
      queryClient.invalidateQueries({ queryKey: ['documents', 'owned'] });
      queryClient.invalidateQueries({ queryKey: ['documents', 'shared'] });
    },
  });
}
