import { apiClient } from '../../../lib/axios';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export const authService = {
  async getCurrentUser(): Promise<UserDTO> {
    const { data } = await apiClient.get('/auth/me');
    return data.data; // response is { success: true, data: UserDTO }
  },
  
  async login(credentials: { email: string; password: string }): Promise<UserDTO> {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data.data;
  },

  async register(credentials: { email: string; password: string; name: string }): Promise<UserDTO> {
    const { data } = await apiClient.post('/auth/register', credentials);
    return data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }
};
