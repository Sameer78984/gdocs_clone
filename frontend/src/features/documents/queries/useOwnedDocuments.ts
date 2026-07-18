import { useQuery } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useOwnedDocuments(params?: { page?: number; limit?: number; q?: string; sort?: string; order?: string }) {
  return useQuery({
    queryKey: ['documents', 'owned', params],
    queryFn: () => documentService.getOwnedDocuments(params),
    refetchOnMount: 'always',
  });
}
