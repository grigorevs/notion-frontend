import { create } from 'zustand';
import { Document } from '../types/document.type';

interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  addDocument: (documentId: string) => Promise<void>;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const useStore = create<DocumentState>((set) => ({
  documents: [],
  loading: false,
  error: null,

  fetchDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${backendUrl}/documents`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as Document[];
      set({ documents: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      const response = await fetch(`${backendUrl}/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== documentId),
      }));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  addDocument: async (documentId) => {
    try {
      const title = 'Новый документ';
      const response = await fetch(`${backendUrl}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, parentId: documentId.length ? documentId : null }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createdDocument = (await response.json()) as Document;
      set((state) => ({
        documents: [...state.documents, createdDocument],
      }));
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },
}));

export default useStore;
