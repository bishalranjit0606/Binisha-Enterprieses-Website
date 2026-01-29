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
                <div className="news-grid">
                    {visibleFeed.map((item, index) => {
                        const { day, month } = formatDate(item.date || item.createdAt);
                        const title = getFeedTitle(item);

                        return (
                            <div
                                className="news-card fade-on-scroll"
                                key={item.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {item.image_url && (
                                    <div className="news-image">
                                        <img src={getImageUrl(item.image_url)} alt={title} />
                                    </div>
                                )}
                                <div className="news-body" style={{ minHeight: '120px' }}>
                                    <div className="news-date">
                                        <span className="day">{day}</span>
                                        <span className="month">{month}</span>
                                    </div>
                                    <div className="news-content">
                                        <h3 className="news-title">{title}</h3>
                                        <p className="news-excerpt" style={{ whiteSpace: 'pre-wrap' }}>{item.caption}</p>
                                    </div>
                                </div>
                            </div>
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
