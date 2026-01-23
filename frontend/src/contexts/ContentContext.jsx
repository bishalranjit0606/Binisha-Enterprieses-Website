import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children, initialContent = {} }) => {
    const [content, setContent] = useState(initialContent);

    return (
        <ContentContext.Provider value={{ ...content, setContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
