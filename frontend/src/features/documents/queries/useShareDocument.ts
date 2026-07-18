import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shareService } from '../services/share.service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useShareDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, email, permission }: { documentId: string; email: string; permission: 'READ' | 'EDIT' }) => 
      shareService.shareDocument(documentId, email, permission),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shares', variables.documentId] });
      toast.success('Shared successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to share document';
      toast.error(message);
    },
  });
};
