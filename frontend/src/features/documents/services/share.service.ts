import { apiClient as api } from '../../../lib/axios';

export interface ShareUser {
  id: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  permission: 'OWNER' | 'READ' | 'EDIT';
}

export const shareService = {
  getShares: async (documentId: string): Promise<ShareUser[]> => {
    const response = await api.get(`/documents/${documentId}/shares`);
    return response.data.data;
  },

  shareDocument: async (documentId: string, email: string, permission: 'READ' | 'EDIT'): Promise<ShareUser> => {
    const response = await api.post(`/documents/${documentId}/shares`, { email, permission });
    return response.data.data;
  },

  updateShare: async (documentId: string, shareId: string, permission: 'READ' | 'EDIT'): Promise<ShareUser> => {
    const response = await api.patch(`/documents/${documentId}/shares/${shareId}`, { permission });
    return response.data.data;
  },

  removeShare: async (documentId: string, shareId: string): Promise<void> => {
    await api.delete(`/documents/${documentId}/shares/${shareId}`);
  },
};
