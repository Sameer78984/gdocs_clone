import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    retry: false, // Don't retry auth checks if they fail (likely means 401)
  });
}
