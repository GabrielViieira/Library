// src/hooks/useAuthUser.ts
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/user.api';

export function useAuthUser() {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5, 
  })
}
