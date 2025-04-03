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

async function updateDocumentContent(
  documentId: string,
  { content, title }: { content?: Descendant[]; title?: string },
): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/documents/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, title }),
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
      method: 'PUT',
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

async function addDocument(): Promise<void> {
  try {
    const title = 'Новый документ';
    const response = await fetch(`${backendUrl}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating parentId:', error);
    throw error;
  }
}

export { fetchData, updateDocumentContent, updateParentId, addDocument };
