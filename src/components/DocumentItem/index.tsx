import { useState, useCallback, useMemo, useEffect } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Document } from '../../types/document.type';
import { updateDocumentContent } from '../../api/documentApi';
import DocumentChildren from '../DocumentChildren';
import { ItemBlock } from './index.styles';

interface DocumentItemProps {
  document: Document;
  allDocuments: Document[];
  onDocumentClick: (documentId: string) => void;
}

function DocumentItem({ document, allDocuments, onDocumentClick }: DocumentItemProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(
    document.content || [{ type: 'paragraph', children: [{ text: '' }] }],
  );

  useEffect(() => {
    setValue(document.content || [{ type: 'paragraph', children: [{ text: '' }] }]);
  }, [document.content]);

  const handleChange = useCallback(
    (value: Descendant[]) => {
      setValue(value);
      updateDocumentContent(document.id, value).catch((error) => {
        console.error('Failed to update content', error);
      });
    },
    [document.id],
  );

  return (
    <ItemBlock>
      <h3>{document.title}</h3>
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Editable />
      </Slate>
      <DocumentChildren
        documentId={document.id}
        documents={allDocuments}
        onDocumentClick={onDocumentClick}
      />
    </ItemBlock>
  );
}

export default DocumentItem;
