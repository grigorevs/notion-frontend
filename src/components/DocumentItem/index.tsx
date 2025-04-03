import React, { useState, useCallback, useMemo } from 'react';
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
  const titleEditor = useMemo(() => withReact(createEditor()), []);
  const contentEditor = useMemo(() => withReact(createEditor()), []);

  const initialTitle = useMemo<Descendant[]>(
    () => [{ type: 'paragraph', children: [{ text: document.title || '' }] }],
    [document.title],
  );
  const [title, setTitle] = useState<Descendant[]>(initialTitle);

  const initialContent = useMemo<Descendant[]>(
    () => document.content || [{ type: 'paragraph', children: [{ text: '' }] }],
    [document.content],
  );
  const [content, setContent] = useState<Descendant[]>(initialContent);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  const handleContentChange = useCallback(
    (value: Descendant[]) => {
      setContent(value);
      updateDocumentContent(document.id, { content: value }).catch((error) => {
        console.error('Failed to update content', error);
      });
    },
    [document.id],
  );

  const handleTitleChange = useCallback(
    (value: any[]) => {
      setTitle(value);
      const titleText = value[0]?.children[0]?.text || '';
      updateDocumentContent(document.id, { title: titleText }).catch((error) => {
        console.error('Failed to update title', error);
      });
    },
    [document.id],
  );

  return (
    <ItemBlock>
      <Slate editor={titleEditor} initialValue={title} onChange={handleTitleChange}>
        <Editable readOnly={userRole !== 'admin'} renderElement={renderElement} />
      </Slate>

      <Slate editor={contentEditor} initialValue={content} onChange={handleContentChange}>
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
