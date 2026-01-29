import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebookMessenger, FaLink, FaShareAlt, FaCalendarAlt, FaConciergeBell, FaNewspaper } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/index.css';

const AllFeedPage = () => {
    const { feed, services, news } = useContent();
    const { language } = useLanguage();
    const [copySuccess, setCopySuccess] = useState(null);

    useScrollAnimation();

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
        window.open(`https://www.facebook.com/dialog/send?link=${url}&app_id=YOUR_FB_APP_ID&redirect_uri=${url}`, '_blank');
    };

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
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            default:
                break;
        }
        if (shareUrl) window.open(shareUrl, '_blank');
    };

    return (
        <section className="social-feed-section">
            <div className="container-fluid social-layout">
                {/* Left Sidebar: Services */}
                <aside className="social-sidebar left-sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-header">
                            <FaConciergeBell />
                            <h3>{language === 'en' ? 'Our Services' : 'हाम्रा सेवाहरू'}</h3>
                        </div>
                        <ul className="sidebar-list">
                            {services && services.map(service => {
                                const desc = language === 'en' ? service.desc_en : service.desc_ne;
                                const shortDesc = desc ? (desc.split(' ').slice(0, 8).join(' ') + '...') : '';
                                return (
                                    <li key={service.id}>
                                        <a href="/#services" className="service-item-mini clickable">
                                            <div className="service-icon-wrapper">
                                                <i className={service.icon}></i>
                                            </div>
                                            <div className="service-info-mini">
                                                <span className="service-title-mini">
                                                    {language === 'en' ? service.title_en : service.title_ne}
                                                </span>
                                                {shortDesc && <span className="service-hint-mini">{shortDesc}</span>}
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Main Content: Feed */}
                <main className="social-feed-main">
                    <div className="section-header center-text compact-header">
                        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: language === 'en' ? 'Our <span class="text-accent">Updates</span>' : 'हाम्रा <span class="text-accent">अपडेटहरू</span>' }}></h2>
                    </div>

                    <div className="feed-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {feed && feed.map((item, index) => {
                            const dateObj = new Date(item.date || item.createdAt);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' });
                            return (
                                <Link
                                    to={`/feed/${item.id}`}
                                    className="feed-card fade-on-scroll"
                                    key={item.id}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="feed-card-header">
                                        <div className="feed-date-chip-inline">
                                            {day} {month}
                                        </div>
                                    </div>
                                    <div className="feed-content-box">
                                        <h3 className="feed-card-title">
                                            {item.caption && item.caption.split(' ').length > 5
                                                ? item.caption.split(' ').slice(0, 5).join(' ') + '...'
                                                : (item.caption || (language === 'en' ? 'New Post' : 'नयाँ पोष्ट'))}
                                        </h3>
                                        <p className="feed-card-excerpt">
                                            {item.caption}
                                        </p>
                                    </div>
                                    <div className="feed-image-box">
                                        <img src={getImageUrl(item.image_url)} alt="Update" loading="lazy" />
                                    </div>
                                    <div className="feed-content-box" style={{ paddingTop: '0' }}>
                                        <div className="feed-card-footer">
                                            <span>{language === 'en' ? 'View Details' : 'विवरण हेर्नुहोस्'}</span>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </main>

                {/* Right Sidebar: News */}
                <aside className="social-sidebar right-sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-header">
                            <FaNewspaper />
                            <h3>{language === 'en' ? 'Latest News' : 'ताजा समाचार'}</h3>
                        </div>
                        <ul className="sidebar-list">
                            {news && news.slice(0, 5).map(item => (
                                <li key={item.id}>
                                    <Link to={`/news/${item.id}`} className="news-item-mini">
                                        {item.image_url && <img src={getImageUrl(item.image_url)} alt="News" />}
                                        <div className="news-mini-content">
                                            <span className="news-mini-date">{formatDate(item.date)}</span>
                                            <h4>{language === 'en' ? item.title_en : item.title_ne}</h4>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default AllFeedPage;
