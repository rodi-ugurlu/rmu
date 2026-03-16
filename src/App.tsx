import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ui/ScrollToTop';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import FilmDetailPage from './pages/FilmDetailPage';
import BiographyPage from './pages/BiographyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import PhotosPage from './pages/PhotosPage';
import MusicsPage from './pages/MusicsPage';
import ArtsPage from './pages/ArtsPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/films/:id" element={<FilmDetailPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/arts" element={<ArtsPage />} />
        <Route path="/musics" element={<MusicsPage />} />
        <Route path="/biography" element={<BiographyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
