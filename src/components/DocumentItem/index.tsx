import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { BaseElement, createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import { Document } from '../../types/document.type';
import { updateDocumentContent } from '../../api/documentApi';
import DocumentChildren from '../DocumentChildren';
import { CodeBlock, HeadingOne, ItemBlock, Paragraph } from './index.styles';

const userRole = process.env.REACT_APP_USER_ROLE;

interface DocumentItemProps {
  document: Document;
  allDocuments: Document[];
  onDocumentClick: (documentId: string) => void;
}

interface CustomElement extends BaseElement {
  type: 'paragraph' | 'heading-one' | 'code-block';
  children: any;
}

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  const el = element as CustomElement;
  switch (el.type) {
    case 'code-block':
      return <CodeBlock {...attributes}>{children}</CodeBlock>;
    case 'heading-one':
      return <HeadingOne {...attributes}>{children}</HeadingOne>;
    default:
      return <Paragraph {...attributes}>{children}</Paragraph>;
  }
};

function DocumentItem({ document, allDocuments, onDocumentClick }: DocumentItemProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(
    document.content || [{ type: 'paragraph', children: [{ text: '' }] }],
  );

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  useEffect(() => {
    if (document.content !== value) {
      setValue(document.content || [{ type: 'paragraph', children: [{ text: '' }] }]);
    }
  }, [document.content, setValue, value]);

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
        <Editable readOnly={userRole !== 'admin'} renderElement={renderElement} />
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
