import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { getImageUrl } from '../utils/image';

const Feed = () => {
    const { t, tHtml, language } = useLanguage();
    const { feed } = useContent();
    const visibleFeed = feed ? feed.slice(0, 3) : [];

    // Helper for title mapping
    const getFeedTitle = (item) => {
        if (!item.caption) return language === 'en' ? 'New Post' : 'नयाँ पोष्ट';
        const words = item.caption.split(' ');
        if (words.length <= 5) return item.caption;
        return words.slice(0, 5).join(' ') + '...';
    };

    const formatDate = (dateString) => {
        if (!dateString) return { day: '', month: '' };
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    };

    return (
        <section className="news-section" id="feed" style={{ backgroundColor: '#FEFCF8' }}>
            <div className="container">
                <div className="section-header center-text fade-on-scroll">
                    <h4 className="section-subtitle">{t('feed_subtitle') === 'feed_subtitle' ? (language === 'en' ? 'STAY UPDATED' : 'अपडेट रहनुहोस्') : t('feed_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: language === 'en' ? 'Our <span class="text-accent">Updates</span>' : 'हाम्रा <span class="text-accent">अपडेटहरू</span>' }}></h2>
                </div>
                <div className="feed-grid">
                    {visibleFeed.map((item, index) => {
                        const dateObj = new Date(item.date || item.createdAt);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        const title = getFeedTitle(item);

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
                                    <h3 className="feed-card-title">{title}</h3>
                                    <p className="feed-card-excerpt">
                                        {item.caption}
                                    </p>
                                </div>
                                <div className="feed-image-box">
                                    <img src={getImageUrl(item.image_url)} alt={title} />
                                </div>
                                <div className="feed-content-box" style={{ paddingTop: '0' }}>
                                    <div className="feed-card-footer">
                                        <span>{language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}</span>
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="load-more-container fade-on-scroll" style={{ animationDelay: '0.3s' }}>
                    <Link to="/feed" className="btn-load-more">
                        {language === 'en' ? 'LOAD MORE UPDATES' : 'थप अपडेटहरू हेर्नुहोस्'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Feed;
