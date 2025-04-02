import { Document } from '../../types/document.type';
import { ChildBlock, Link } from './index.styles';

interface DocumentChildrenProps {
  documentId: string;
  documents: Document[];
  onDocumentClick: (documentId: string) => void;
}

function DocumentChildren({ documentId, documents, onDocumentClick }: DocumentChildrenProps) {
  const children = documents.filter((doc) => doc.parentId === documentId);

  if (children.length === 0) {
    return null;
  }

  return (
    <ChildBlock>
      {children.map((child) => (
        <Link key={child.id}>
          <a onClick={() => onDocumentClick(child.id)}>{child.title}</a>
        </Link>
      ))}
    </ChildBlock>
  );
}

export default DocumentChildren;
