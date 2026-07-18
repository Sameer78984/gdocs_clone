import { useQuery } from '@tanstack/react-query';
import { shareService } from '../services/share.service';

export const useGetShares = (documentId: string) => {
  return useQuery({
    queryKey: ['shares', documentId],
    queryFn: () => shareService.getShares(documentId),
    enabled: !!documentId,
  });
};
