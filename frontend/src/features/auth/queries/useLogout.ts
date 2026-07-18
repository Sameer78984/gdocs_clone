import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const { logout: clearStore } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearStore();
      queryClient.clear(); // Clear all cached queries
      router.push('/login');
    },
  });
}
