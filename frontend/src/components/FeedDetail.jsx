import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/index.css';

const FeedDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [feedItem, setFeedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/feed/${id}`)
            .then(res => {
                setFeedItem(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(language === 'en' ? 'Update not found' : 'अपडेट फेला परेन');
                setLoading(false);
            });
    }, [id, language]);

    if (loading) return (
        <div style={{ padding: '100px', textAlign: 'center', minHeight: '60vh' }}>
            Loading...
        </div>
    );

    if (error) return (
        <div style={{ padding: '100px', textAlign: 'center', minHeight: '60vh', color: 'red' }}>
            {error}
            <br />
            <button onClick={() => navigate('/')} className="admin-btn admin-btn-secondary" style={{ marginTop: '20px' }}>
                {language === 'en' ? 'Back to Home' : 'होमपेजमा फर्कनुहोस्'}
            </button>
        </div>
    );

    return (
        <div className="news-detail-container" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        color: '#666'
                    }}
                >
                    <FaArrowLeft /> {language === 'en' ? 'Back' : 'फर्कनुहोस्'}
                </button>

                {feedItem.image_url && (
                    <div className="news-detail-image" style={{ 
                        marginBottom: '40px', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)' 
                    }}>
                        <img
                            src={getImageUrl(feedItem.image_url)}
                            alt="Update"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                )}

                <div className="feed-detail-caption" style={{ 
                    fontSize: '1.2rem', 
                    color: '#333', 
                    lineHeight: '1.8',
                    whiteSpace: 'pre-wrap',
                    padding: '0 10px'
                }}>
                    {feedItem.caption}
                </div>
            </div>
        </div>
    );
};

export default FeedDetail;
