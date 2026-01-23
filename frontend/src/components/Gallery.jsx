import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Gallery = () => {
    const { t, tHtml, language } = useLanguage();
    const { gallery } = useContent();

    return (
        <section className="blog-section" id="gallery">
            <div className="container">
                <div className="section-header center-text fade-on-scroll">
                    <h4 className="section-subtitle">{t('gallery_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={tHtml('gallery_title')}></h2>
                </div>
            </div>
            <div className="gallery-marquee">
                <div className="gallery-track">
                    {/* Render twice for seamless loop if needed, or CSS handles it with enough items. 
                        Usually marquee needs duplication to fill the gap.
                        The original HTML had 8 items. 
                        The CSS animates transform -50%.
                        So duplicate the list once.
                    */}
                    {gallery && gallery.concat(gallery).map((item, index) => (
                        <div className="gallery-item" key={`${item.id}-${index}`}>
                            <div className="image-frame-luxury">
                                {/* Use image_url directly */}
                                <img src={item.image_url} alt={item.alt || 'Gallery Image'} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container" style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/gallery" className="view-all-btn">
                    {language === 'en' ? 'View All Photos' : 'सबै तस्बिरहरू हेर्नुहोस्'}
                </Link>
            </div>
        </section>
    );
};

export default Gallery;
