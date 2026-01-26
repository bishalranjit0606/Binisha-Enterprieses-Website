import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children, initialTranslations = {} }) => {
    const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');
    const [translations, setTranslations] = useState(initialTranslations);

    useEffect(() => {
        if (initialTranslations && Object.keys(initialTranslations).length > 0) {
            setTranslations(initialTranslations);
        }
    }, [initialTranslations]);

    const switchLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
    };

    const t = (key) => {
        if (!translations[key]) return key;
        return translations[key][language] || translations[key]['en'] || key;
    };

    // To handle HTML content in translations (like spans), we might need a helper
    const tHtml = (key) => {
        const text = t(key);
        return { __html: text };
    };

    const value = {
        language,
        switchLanguage,
        t,
        tHtml,
        setTranslations
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
