import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shareService } from '../services/share.service';
import { toast } from 'sonner';

export const useDeleteShare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, shareId }: { documentId: string; shareId: string }) => 
      shareService.removeShare(documentId, shareId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shares', variables.documentId] });
      toast.success('Access revoked');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to revoke access');
    },
  });
};
