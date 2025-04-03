import { addDocument } from '../../api/documentApi';
import { Button } from './index.styles';

const AddDocumentButton = () => {
  const handleClick = async () => {
    addDocument();
  };

  return <Button onClick={handleClick}>+ Добавить</Button>;
};

export default AddDocumentButton;
