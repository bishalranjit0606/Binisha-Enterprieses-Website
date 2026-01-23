import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
    const { settings } = useContent();

    if (!settings?.whatsapp) return null;

    // Clean number for link (remove spaces, +)
    const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, '');

    return (
        <a
            href={`https://wa.me/${cleanNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp-icon"
            aria-label="Contact on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
};

export default FloatingWhatsApp;
