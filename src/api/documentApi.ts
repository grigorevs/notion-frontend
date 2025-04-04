import { Descendant } from 'slate';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
  const path = window.location.pathname;
  const id = path.substring(1);

  try {
    const title = 'Новый документ';
    const response = await fetch(`${backendUrl}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, parentId: id.length ? id : null }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating parentId:', error);
    throw error;
  }
}

async function deleteDocument(documentId: string): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: documentId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

export { updateDocumentContent, updateParentId, addDocument, deleteDocument };
