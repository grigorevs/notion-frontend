import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Document } from '../../types/document.type';
import { fetchData } from '../../api/documentApi';
import DocumentItem from '../DocumentItem';
import { ListBlock } from './index.styles';
import AddDocumentButton from '../AddDocumentButton';

function DocumentList() {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { documentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDocuments() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchData();
        setDocuments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  const handleDocumentClick = useCallback(
    (documentId: string) => {
      navigate(`/${documentId}`);
    },
    [navigate],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!documents) {
    return <div>No documents found.</div>;
  }

  let documentsToDisplay: Document[];
  if (documentId) {
    const selectedDocument = documents.find((doc) => doc.id === documentId);
    if (selectedDocument) {
      documentsToDisplay = [selectedDocument];
    } else {
      return <div>Document not found</div>;
    }
  } else {
    documentsToDisplay = documents.filter((doc) => doc.parentId === null);
  }

  return (
    <>
      <ListBlock>
        {documentsToDisplay.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            allDocuments={documents}
            onDocumentClick={handleDocumentClick}
          />
        ))}
        <AddDocumentButton />
      </ListBlock>
    </>
  );
}

export default DocumentList;
