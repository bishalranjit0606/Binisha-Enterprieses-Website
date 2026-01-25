import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import '../styles/index.css';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/news/${id}`)
            .then(res => {
                setNewsItem(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('News not found');
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div style={{ padding: '100px', textAlign: 'center', minHeight: '60vh' }}>
            Loading...
        </div>
    );

    if (error) return (
        <div style={{ padding: '100px', textAlign: 'center', minHeight: '60vh', color: 'red' }}>
            {error}
            <br />
            <button onClick={() => navigate('/news')} className="admin-btn admin-btn-secondary" style={{ marginTop: '20px' }}>
                Back to News
            </button>
        </div>
    );

    const date = new Date(newsItem.date);
    const formattedDate = date.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="news-detail-container">
            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
                <button
                    onClick={() => navigate('/news')}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        color: '#666'
                    }}
                >
                    <i className="fas fa-arrow-left"></i> {language === 'en' ? 'Back to News' : 'समाचारमा फर्कनुहोस्'}
                </button>

                <div className="news-detail-header">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#1C2541' }}>
                        {language === 'en' ? newsItem.title_en : newsItem.title_ne}
                    </h1>
                    <div style={{ color: '#888', marginBottom: '30px', fontSize: '0.9rem' }}>
                        <i className="far fa-calendar-alt" style={{ marginRight: '8px' }}></i>
                        {formattedDate}
                    </div>
                </div>

                <div className="news-detail-image" style={{ marginBottom: '40px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <img
                        src={getImageUrl(newsItem.image_url)}
                        alt={language === 'en' ? newsItem.title_en : newsItem.title_ne}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                <div className="news-detail-body" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>
                    {language === 'en' ? newsItem.excerpt_en : newsItem.excerpt_ne}
                    {/* Note: If you have a separate body field in DB, use that. Currently reusing excerpt as requested "body" wasn't explicitly in schema previously seen, assuming excerpt holds the content or user wants to add body field later. Based on request "body of the news", I'll check if schema has body, if not I'll just use excerpt for now but styled as body. 
                       Actually, looking at previous schema view, only excerpt_en/ne exist. 
                       For now I will use excerpt. If user meant a new "body" field, I'd need to migrate DB. 
                       I'll stick to excerpt as the content for now.
                    */}
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
