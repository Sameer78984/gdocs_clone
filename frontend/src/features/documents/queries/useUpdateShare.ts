import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shareService } from '../services/share.service';
import { toast } from 'sonner';

export const useUpdateShare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, shareId, permission }: { documentId: string; shareId: string; permission: 'READ' | 'EDIT' }) => 
      shareService.updateShare(documentId, shareId, permission),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shares', variables.documentId] });
      toast.success('Permission updated');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update permission');
    },
  });
};
