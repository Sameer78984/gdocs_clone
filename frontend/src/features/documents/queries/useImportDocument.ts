import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadService } from '../services/upload.service';
import { toast } from 'sonner';

export const useImportDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadService.importDocument(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Upload successful');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to import document');
    },
  });
};
