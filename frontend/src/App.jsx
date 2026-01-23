import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContentProvider } from './contexts/ContentContext';
import MainLayout from './MainLayout';
import ScrollToTop from './components/ScrollToTop';
import './styles/index.css';

import AdminLayout from './components/admin/AdminLayout';
import TranslationsManager from './components/admin/TranslationsManager';
import ServicesManager from './components/admin/ServicesManager';
import GalleryManager from './components/admin/GalleryManager';
import NewsManager from './components/admin/NewsManager';

import SettingsManager from './components/admin/SettingsManager';

import PublicPageLayout from './PublicPageLayout';
import AllNewsPage from './components/AllNewsPage';
import AllGalleryPage from './components/AllGalleryPage';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/content')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch content", err);
        setError("Failed to load website content.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FEFCF8', color: '#DC143C', fontSize: '1.5rem', fontFamily: 'serif' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
        {error}
      </div>
    );
  }

  return (
    <LanguageProvider initialTranslations={data.translations}>
      <ContentProvider initialContent={data}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/news" element={
            <PublicPageLayout>
              <AllNewsPage />
            </PublicPageLayout>
          } />
          <Route path="/gallery" element={
            <PublicPageLayout>
              <AllGalleryPage />
            </PublicPageLayout>
          } />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<TranslationsManager />} />
            <Route path="translations" element={<TranslationsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="news" element={<NewsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Routes>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;
