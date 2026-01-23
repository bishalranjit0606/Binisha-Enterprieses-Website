import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/index.css';

const AllNewsPage = () => {
    const { news } = useContent();
    const { language, t } = useLanguage();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    };

    return (
        <section className="news-section" style={{ minHeight: '80vh', padding: '60px 0' }}>
            <div className="container">
                <div className="section-header center-text">
                    <h2 className="section-title">
                        {language === 'en' ? 'All News & Updates' : 'सबै समाचार र अपडेटहरू'}
                    </h2>
                    <div className="section-line"></div>
                </div>

                <div className="news-grid">
                    {news && news.map((item, index) => {
                        const { day, month } = formatDate(item.date);
                        return (
                            <div className="news-card" key={item.id} style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="news-image">
                                    <img src={`/${item.image_url}`} alt={language === 'en' ? item.title_en : item.title_ne} />
                                </div>
                                <div className="news-body">
                                    <div className="news-date">
                                        <span className="day">{day}</span>
                                        <span className="month">{month}</span>
                                    </div>
                                    <div className="news-content">
                                        <h3 className="news-title">
                                            {language === 'en' ? item.title_en : item.title_ne}
                                        </h3>
                                        <p className="news-excerpt">
                                            {language === 'en' ? item.excerpt_en : item.excerpt_ne}
                                        </p>
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

export default AllNewsPage;
