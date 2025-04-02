import { Descendant } from 'slate';
import { Document } from '../types/document.type';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

async function fetchData(): Promise<Document[]> {
  try {
    const response = await fetch(`${backendUrl}/documents`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function updateDocumentContent(documentId: string, content: Descendant[]): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/documents/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating document content:', error);
    throw error;
  }
}

async function updateParentId(documentId: string, parentId: string | null): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/documents/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating parentId:', error);
    throw error;
  }
}

export { fetchData, updateDocumentContent, updateParentId };
