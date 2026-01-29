import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useContent } from './contexts/ContentContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

import MainLayout from './MainLayout';
import ScrollToTop from './components/ScrollToTop';
import './styles/index.css';

import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './components/admin/LoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import TranslationsManager from './components/admin/TranslationsManager';
import ServicesManager from './components/admin/ServicesManager';
import GalleryManager from './components/admin/GalleryManager';
import NewsManager from './components/admin/NewsManager';
import FeedManager from './components/admin/FeedManager';
import SettingsManager from './components/admin/SettingsManager';
import Dashboard from './components/admin/Dashboard';

import PublicPageLayout from './PublicPageLayout';
import AllNewsPage from './components/AllNewsPage';
import NewsDetail from './components/NewsDetail';
import AllFeedPage from './components/AllFeedPage';
import AllGalleryPage from './components/AllGalleryPage';

function App() {
  const { translations, loading, error } = useContent();

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
    <LanguageProvider initialTranslations={translations}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/news" element={
            <PublicPageLayout>
              <AllNewsPage />
            </PublicPageLayout>
          } />
          <Route path="/news/:id" element={
            <PublicPageLayout>
              <NewsDetail />
            </PublicPageLayout>
          } />
          <Route path="/feed" element={
            <PublicPageLayout>
              <AllFeedPage />
            </PublicPageLayout>
          } />
          <Route path="/gallery" element={
            <PublicPageLayout>
              <AllGalleryPage />
            </PublicPageLayout>
          } />

          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="translations" element={<TranslationsManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="news" element={<NewsManager />} />
              <Route path="feed" element={<FeedManager />} />
              <Route path="settings" element={<SettingsManager />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
