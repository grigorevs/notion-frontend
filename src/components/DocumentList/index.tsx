import React, { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Document } from '../../types/document.type';
import DocumentItem from '../DocumentItem';
import { ListBlock } from './index.styles';
// import AddDocumentButton from '../AddDocumentButton';
import useStore from '../../store';

function DocumentList() {
  const documents = useStore((state) => state.documents);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchDocuments = useStore((state) => state.fetchDocuments);

  const { documentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDocumentClick = useCallback(
    (documentId: string) => {
      navigate(`/${documentId}`);
    },
    [navigate],
  );

  const documentsToDisplay = useMemo(() => {
    if (loading || !documents) {
      return [];
    }

    if (documentId) {
      const selectedDocument = documents.find((doc) => doc.id === documentId);
      return selectedDocument ? [selectedDocument] : [];
    }

    return documents.filter((doc) => doc.parentId === null);
  }, [documents, documentId, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ListBlock>
        {documentsToDisplay.map((doc: Document) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            allDocuments={documents}
            onDocumentClick={handleDocumentClick}
          />
        ))}
        {/* <AddDocumentButton /> */}
      </ListBlock>
    </>
  );
}

export default DocumentList;
