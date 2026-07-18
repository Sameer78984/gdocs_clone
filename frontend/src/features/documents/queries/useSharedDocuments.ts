import { useQuery } from '@tanstack/react-query';
import { documentService } from '../services/document.service';

export function useSharedDocuments(params?: { page?: number; limit?: number; q?: string; sort?: string; order?: string }) {
  return useQuery({
    queryKey: ['documents', 'shared', params],
    queryFn: () => documentService.getSharedDocuments(params),
    refetchOnMount: 'always',
  });
}
