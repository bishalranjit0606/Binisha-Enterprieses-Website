import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import { FaArrowLeft, FaWhatsapp, FaFacebookMessenger, FaLink } from 'react-icons/fa';
import '../styles/index.css';

const FeedDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [feedItem, setFeedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

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

    const handleShare = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(feedItem.caption ? feedItem.caption.substring(0, 100) : 'Check out this update from Binisha Enterprises!');

        let shareUrl = '';
        if (platform === 'whatsapp') {
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
        } else if (platform === 'messenger') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

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
        <div className="news-detail-container" style={{ minHeight: '80vh', backgroundColor: '#f9f9f9', paddingBottom: '80px' }}>
            <div className="container" style={{ padding: '60px 20px', maxWidth: '850px' }}>
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
                        color: '#666',
                        fontWeight: '600'
                    }}
                >
                    <FaArrowLeft /> {language === 'en' ? 'Back to Updates' : 'अपडेटहरूमा फर्कनुहोस्'}
                </button>

                <div className="feed-detail-box">
                    {feedItem.image_url && (
                        <div className="news-detail-image" style={{
                            marginBottom: '40px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                        }}>
                            <img
                                src={getImageUrl(feedItem.image_url)}
                                alt="Update"
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    )}

                    <div className="feed-detail-caption" style={{
                        fontSize: '1.25rem',
                        color: '#222',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-wrap',
                        textAlign: 'left'
                    }}>
                        {feedItem.caption}
                    </div>

                    <div className="feed-detail-share">
                        <span>{language === 'en' ? 'Share this update' : 'यो अपडेट साझा गर्नुहोस्'}</span>
                        <div className="detail-share-buttons">
                            <button
                                className="detail-share-btn whatsapp"
                                onClick={() => handleShare('whatsapp')}
                                title="Share on WhatsApp"
                            >
                                <FaWhatsapp />
                            </button>
                            <button
                                className="detail-share-btn messenger"
                                onClick={() => handleShare('messenger')}
                                title="Share on Facebook"
                            >
                                <FaFacebookMessenger />
                            </button>
                            <button
                                className={`detail-share-btn copy ${copySuccess ? 'success' : ''}`}
                                onClick={handleCopyLink}
                                title="Copy Link"
                            >
                                <FaLink />
                                <span className="tooltip">Copied!</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedDetail;
