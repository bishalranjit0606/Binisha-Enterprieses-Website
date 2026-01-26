import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshContent = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/content`);
            setContent(response.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch content", err);
            setError("Failed to load website content.");
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        refreshContent();
    }, []);

    const value = {
        ...(content || {}),
        setContent,
        refreshContent,
        loading,
        error
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
