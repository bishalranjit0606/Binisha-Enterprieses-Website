import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import News from './components/News';
import Feed from './components/Feed';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import useScrollAnimation from './hooks/useScrollAnimation';

const MainLayout = () => {
    useScrollAnimation();

    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <WhyUs />
            <Gallery />
            <News />
            <Feed />
            <Contact />
            <Footer />
            <FloatingWhatsApp />
        </>
    );
};

export default MainLayout;
