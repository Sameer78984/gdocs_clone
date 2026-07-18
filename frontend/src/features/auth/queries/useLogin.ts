import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';

export function useLogin() {
  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      setUser(user);
      setAuthenticated(true);
    },
  });
}
