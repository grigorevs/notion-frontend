import GlobalStyle from './styles/GlobalStyles';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:documentId" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
