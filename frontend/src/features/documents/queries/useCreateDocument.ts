import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.createDocument,
    onSuccess: (newDoc) => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'owned'] });
      queryClient.setQueryData(['documents', newDoc.id], newDoc);
    },
  });
}
