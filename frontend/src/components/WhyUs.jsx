import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const WhyUs = () => {
    const { t, tHtml, language } = useLanguage();
    const { settings, credentials } = useContent();

    return (
        <section className="about-section" id="why-us">
            <div className="container about-container">
                <div className="about-image fade-on-scroll left">
                    <div className="image-frame-luxury">
                        <img
                            src={settings?.why_us_image ? `/${settings.why_us_image}` : "images/1.jpg"}
                            alt="Binisha Enterprises Team"
                        />
                        <div className="frame-accent"></div>
                    </div>
                </div>
                <div className="about-content fade-on-scroll right">
                    <h4 className="section-subtitle">{t('about_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={tHtml('about_title')}></h2>
                    <p className="about-text">
                        {t('about_text_1')}
                    </p>
                    <p className="about-text">
                        {t('about_text_2')}
                    </p>
                    <div className="signature">
                        <p className="signature-text">{t('about_signature')}</p>
                        <h3 className="agent-name">{t('about_agent')}</h3>
                    </div>
                    <div className="credentials">
                        {credentials && credentials.map((cred, index) => (
                            <div className="credential-item" key={index}>
                                <i className={`${cred.icon} red-icon`}></i>
                                <span className="cred-number">{cred.value}</span>
                                <span className="cred-label">
                                    {language === 'en' ? cred.label_en : cred.label_ne}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
