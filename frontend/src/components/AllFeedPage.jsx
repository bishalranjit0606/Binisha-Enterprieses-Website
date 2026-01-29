import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import { FaWhatsapp, FaFacebookMessenger, FaLink, FaShareAlt, FaCalendarAlt } from 'react-icons/fa';
import '../styles/index.css';

const AllFeedPage = () => {
    const { feed } = useContent();
    const { language } = useLanguage();
    const [copySuccess, setCopySuccess] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCopyLink = (itemId) => {
        const url = `${window.location.origin}/feed#post-${itemId}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess(itemId);
            setTimeout(() => setCopySuccess(null), 2000);
        });
    };

    const shareOnWhatsApp = (item) => {
        const text = encodeURIComponent(`${item.caption || 'Check out this update!'} \n\n ${window.location.origin}/feed#post-${item.id}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnMessenger = (item) => {
        const url = encodeURIComponent(`${window.location.origin}/feed#post-${item.id}`);
        // FB Messenger sharing via URL is limited, usually redirect to share dialog
        window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=YOUR_FB_APP_ID&redirect_uri=${url}`, '_blank');
    };

    // Note: Social sharing URLs vary. Using common ones.
    const shareSocial = (platform, item) => {
        const url = encodeURIComponent(`${window.location.origin}/feed#post-${item.id}`);
        const text = encodeURIComponent(item.caption || 'Binisha Enterprises Update');

        let shareUrl = '';
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'viber':
                shareUrl = `viber://forward?text=${text}%20${url}`;
                break;
            case 'messenger':
                // Messenger is tricky without SDK, but FB share works well
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            default:
                break;
        }
        if (shareUrl) window.open(shareUrl, '_blank');
    };

    return (
        <section className="social-feed-section">
            <div className="container">
                <div className="section-header center-text">
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: language === 'en' ? 'Our <span class="text-accent">Updates</span> & Feed' : 'हाम्रा <span class="text-accent">अपडेटहरू</span> र फिड' }}></h2>
                    <div className="section-line"></div>
                </div>

                <div className="social-feed-container">
                    {feed && feed.map((item, index) => (
                        <div
                            className="social-post-card"
                            key={item.id}
                            id={`post-${item.id}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Post Header: Date */}
                            <div className="post-header">
                                <div className="post-date">
                                    <FaCalendarAlt className="date-icon" />
                                    <span>{formatDate(item.date || item.createdAt)}</span>
                                </div>
                            </div>

                            {/* Post Caption */}
                            {item.caption && (
                                <div className="post-caption">
                                    <p>{item.caption}</p>
                                </div>
                            )}

                            {/* Post Image */}
                            {item.image_url && (
                                <div className="post-image">
                                    <img src={getImageUrl(item.image_url)} alt="Feed update" loading="lazy" />
                                </div>
                            )}

                            {/* Post Actions */}
                            <div className="post-actions">
                                <span className="share-label">
                                    <FaShareAlt /> {language === 'en' ? 'Share' : 'साझा गर्नुहोस्'}:
                                </span>
                                <div className="action-buttons">
                                    <button
                                        className="action-btn whatsapp"
                                        onClick={() => shareSocial('whatsapp', item)}
                                        title="Share on WhatsApp"
                                    >
                                        <FaWhatsapp />
                                    </button>
                                    <button
                                        className="action-btn viber"
                                        onClick={() => shareSocial('viber', item)}
                                        title="Share on Viber"
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Viber_logo_2018.svg" alt="Viber" style={{ width: '18px', height: '18px' }} />
                                    </button>
                                    <button
                                        className="action-btn messenger"
                                        onClick={() => shareSocial('messenger', item)}
                                        title="Share on Facebook"
                                    >
                                        <FaFacebookMessenger />
                                    </button>
                                    <button
                                        className={`action-btn copy-link ${copySuccess === item.id ? 'success' : ''}`}
                                        onClick={() => handleCopyLink(item.id)}
                                        title="Copy Link"
                                    >
                                        <FaLink />
                                        {copySuccess === item.id && <span className="tooltip">Copied!</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllFeedPage;
