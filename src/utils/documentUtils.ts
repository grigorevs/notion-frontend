import { Document } from '../types/document.type';

function isDescendant(documentId: string, potentialParentId: string, allDocs: Document[]): boolean {
  const children = allDocs.filter((doc) => doc.parentId === potentialParentId);
  if (children.some((child) => child.id === documentId)) {
    return true;
  }
  return children.some((child) => isDescendant(documentId, child.id, allDocs));
}

export { isDescendant };
