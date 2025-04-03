import MainPageHeader from '../../components/MainPageHeader/index';
import { Page } from './index.styles';
import DocumentList from '../../components/DocumentList';

const MainPage = () => {
  return (
    <Page>
      <MainPageHeader />
      <DocumentList />
    </Page>
  );
};

export default MainPage;
