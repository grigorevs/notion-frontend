import { BaseElement } from 'slate';
import { Document } from '../../types/document.type';

export interface DocumentItemProps {
  document: Document;
  allDocuments: Document[];
  onDocumentClick: (documentId: string) => void;
}

export interface CustomElement extends BaseElement {
  type: 'paragraph' | 'heading-one' | 'code-block';
  children: any;
}
