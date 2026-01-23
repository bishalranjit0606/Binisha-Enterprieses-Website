import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const News = () => {
    const { t, tHtml, language } = useLanguage();
    const { news } = useContent();
    const visibleNews = news ? news.slice(0, 3) : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return { day, month };
    };

    return (
        <section className="news-section" id="news">
            <div className="container">
                <div className="section-header center-text fade-on-scroll">
                    <h4 className="section-subtitle">{t('news_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={tHtml('news_title')}></h2>
                </div>
                <div className="news-grid">
                    {visibleNews.map((item, index) => {
                        const { day, month } = formatDate(item.date);
                        return (
                            <div
                                className="news-card fade-on-scroll"
                                key={item.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
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

                <div className="load-more-container fade-on-scroll" style={{ animationDelay: '0.3s' }}>
                    <Link to="/news" className="btn-load-more">
                        {t('load_more')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default News;
