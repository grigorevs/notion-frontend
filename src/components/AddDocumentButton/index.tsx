import useStore from '../../store';
import { Button } from './index.styles';

const AddDocumentButton = () => {
  const addDocument = useStore((state) => state.addDocument);
  const handleClick = async () => {
    try {
      await addDocument('');
    } catch (error) {
      console.error('Failed to add document:', error);
    }
  };

  return <Button onClick={handleClick}>+ Добавить документ</Button>;
};

export default AddDocumentButton;
