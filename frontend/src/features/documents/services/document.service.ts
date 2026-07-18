import { apiClient } from '../../../lib/axios';

export interface DocumentOwnerDTO {
  id: string;
  name: string;
}

export interface DocumentDTO {
  id: string;
  title: string;
  content?: string;
  owner: DocumentOwnerDTO;
  permission?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPaginationResponse {
  documents: DocumentDTO[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const documentService = {
  async getOwnedDocuments(params?: { page?: number; limit?: number; q?: string; sort?: string; order?: string }): Promise<DocumentPaginationResponse> {
    const { data } = await apiClient.get('/documents/owned', { params });
    return { documents: data.data, meta: data.meta };
  },

  async getSharedDocuments(params?: { page?: number; limit?: number; q?: string; sort?: string; order?: string }): Promise<DocumentPaginationResponse> {
    const { data } = await apiClient.get('/documents/shared', { params });
    return { documents: data.data, meta: data.meta };
  },

  async getDocumentById(id: string): Promise<DocumentDTO> {
    const { data } = await apiClient.get(`/documents/${id}`);
    return data.data;
  },

  async createDocument(payload: { title: string; content?: string }): Promise<DocumentDTO> {
    const { data } = await apiClient.post('/documents', payload);
    return data.data;
  },

  async renameDocument(id: string, payload: { title: string }): Promise<DocumentDTO> {
    const { data } = await apiClient.patch(`/documents/${id}/title`, payload);
    return data.data;
  },

  async updateDocument(id: string, payload: { content: string }): Promise<DocumentDTO> {
    const { data } = await apiClient.patch(`/documents/${id}`, payload);
    return data.data;
  },

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  }
};
