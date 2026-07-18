import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ['documents', deletedId] });
      queryClient.invalidateQueries({ queryKey: ['documents', 'owned'] });
      queryClient.invalidateQueries({ queryKey: ['documents', 'shared'] });
    },
  });
}
