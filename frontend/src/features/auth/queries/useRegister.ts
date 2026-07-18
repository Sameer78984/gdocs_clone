import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';

export function useRegister() {
  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (user) => {
      setUser(user);
      setAuthenticated(true);
    },
  });
}
