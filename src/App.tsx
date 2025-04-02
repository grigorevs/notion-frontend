import DocumentList from './components/DocumentList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/:documentId" element={<DocumentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
