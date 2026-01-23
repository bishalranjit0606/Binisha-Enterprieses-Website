import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { FaAward, FaUsers } from 'react-icons/fa';

const Hero = () => {
    const { t, tHtml, language } = useLanguage();
    const { settings, floatingBoxes } = useContent();

    const getIcon = (iconName) => {
        if (iconName.includes('award')) return <FaAward />;
        if (iconName.includes('users')) return <FaUsers />;
        return <FaAward />;
    };

    return (
        <header className="hero" id="home">
            <div className="container hero-container">
                <div className="hero-text fade-on-scroll">
                    <h1 className="section-title" dangerouslySetInnerHTML={tHtml('hero_title')}></h1>
                    <p className="hero-description">
                        {t('hero_desc')}
                    </p>
                    <div className="cta-buttons">
                        <a href="#services" className="btn btn-primary">{t('btn_explore')}</a>
                        <a href="#contact" className="btn btn-outline-dark">{t('btn_contact')}</a>
                    </div>
                </div>
                <div className="hero-image fade-on-scroll">
                    {floatingBoxes && floatingBoxes.map((box, index) => (
                        <div key={box.id || index} className={`floating-box ${box.position_class}`}>
                            {getIcon(box.icon)}
                            <span>{language === 'en' ? box.text_en : box.text_ne}</span>
                        </div>
                    ))}

                    <div className="image-frame-luxury">
                        <img
                            src={settings?.hero_image ? `/${settings.hero_image}` : "images/1.png"}
                            alt="Binisha Enterprises Office"
                        />
                        <div className="frame-accent"></div>
                    </div>
                </div>
            </div>
            <div className="scroll-down">
                <a href="#services">
                    <span className="mouse">
                        <span className="wheel"></span>
                    </span>
                    <span className="text">{t('scroll_down')}</span>
                </a>
            </div>
        </header>
    );
};

export default Hero;
