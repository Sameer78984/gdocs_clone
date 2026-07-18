import { apiClient as api } from '../../../lib/axios';
import { DocumentDTO } from './document.service';

export const uploadService = {
  importDocument: async (file: File): Promise<DocumentDTO> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/documents/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  },
};
