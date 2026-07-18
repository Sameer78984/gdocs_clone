export interface DocumentPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  q?: string;
}

export interface CreateDocumentInput {
  title: string;
  content?: string;
}

export interface UpdateDocumentContentInput {
  content: string;
}

export interface RenameDocumentInput {
  title: string;
}
