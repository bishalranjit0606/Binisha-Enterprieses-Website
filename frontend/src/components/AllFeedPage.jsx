import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import '../styles/index.css';

const AllFeedPage = () => {
    const { feed } = useContent();
    const { language } = useLanguage();

    const formatDate = (dateString) => {
        if (!dateString) return { day: '', month: '' };
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    };

    // Helper for title mapping
    const getFeedTitle = (item) => {
        if (!item.caption) return language === 'en' ? 'New Post' : 'नयाँ पोष्ट';
        const words = item.caption.split(' ');
        if (words.length <= 5) return item.caption;
        return words.slice(0, 5).join(' ') + '...';
    };

    return (
        <section className="news-section" style={{ minHeight: '80vh', padding: '60px 0' }}>
            <div className="container">
                <div className="section-header center-text">
                    <h2 className="section-title" dangerouslySetInnerHTML={{ __html: language === 'en' ? 'Our <span class="text-accent">Updates</span> & Feed' : 'हाम्रा <span class="text-accent">अपडेटहरू</span> र फिड' }}></h2>
                    <div className="section-line"></div>
                </div>

                <div className="news-grid">
                    {feed && feed.map((item, index) => {
                        const { day, month } = formatDate(item.date || item.createdAt);
                        const title = getFeedTitle(item);
                        return (
                            <div
                                className="news-card"
                                key={item.id}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {item.image_url && (
                                    <div className="news-image">
                                        <img src={getImageUrl(item.image_url)} alt={title} />
                                    </div>
                                )}
                                <div className="news-body">
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
            </div>
        </section>
    );
};

export default AllFeedPage;
