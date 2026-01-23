import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const PublicPageLayout = ({ children }) => {
    return (
        <div style={{ paddingTop: '80px' }}> {/* Add padding to account for fixed navbar */}
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default PublicPageLayout;
