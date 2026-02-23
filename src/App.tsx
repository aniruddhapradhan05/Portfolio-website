import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Certificates from './pages/Certificates';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
