import React, { useState, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';

import { updateDocumentContent } from '../../api/documentApi';
import DocumentChildren from '../DocumentChildren';
import {
  CodeBlock,
  DeleteButton,
  DeleteContainer,
  HeadingOne,
  ItemBlock,
  Paragraph,
} from './index.styles';
import useStore from '../../store';
import { CustomElement, DocumentItemProps } from './index.types';

const userRole = process.env.REACT_APP_USER_ROLE;

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
  const deleteDocumentFromStore = useStore(
    (state: { deleteDocument: any }) => state.deleteDocument,
  );
  const titleEditor = useMemo(() => withReact(createEditor()), []);
  const contentEditor = useMemo(() => withReact(createEditor()), []);

  const initialTitle = useMemo<Descendant[]>(
    () => [{ type: 'paragraph', children: [{ text: document.title || '' }] }],
    [document.title],
  );

  const initialContent = useMemo<Descendant[]>(
    () => document.content || [{ type: 'paragraph', children: [{ text: '' }] }],
    [document.content],
  );
  const [title, setTitle] = useState<Descendant[]>(initialTitle);
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

  const handleDelete = useCallback(() => {
    deleteDocumentFromStore(document.id);
  }, []);

  return (
    <ItemBlock>
      <DeleteContainer onClick={handleDelete}>
        <DeleteButton>Удалить</DeleteButton>
      </DeleteContainer>
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
