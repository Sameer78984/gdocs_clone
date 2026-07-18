import { useQuery } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useDocument(id: string) {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  });
}
