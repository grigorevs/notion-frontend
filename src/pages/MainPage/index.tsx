import { Page } from './index.styles';
import DocumentList from '../../components/DocumentList';
import AddDocumentButton from '../../components/AddDocumentButton';

const MainPage = () => {
  return (
    <Page>
      <DocumentList />
      <AddDocumentButton />
    </Page>
  );
};

export default MainPage;
