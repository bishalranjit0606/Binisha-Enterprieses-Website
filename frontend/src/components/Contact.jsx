import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
    const { t, tHtml } = useLanguage();
    const { settings } = useContent();

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="section-header center-text fade-on-scroll">
                    <h4 className="section-subtitle">{t('contact_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={tHtml('contact_title')}></h2>
                </div>
                <div className="contact-container">
                    <div className="contact-info fade-on-scroll left">
                        <h3 className="info-title">{t('contact_info_title')}</h3>
                        <p className="info-desc">{t('contact_info_desc')}</p>

                        <div className="info-item">
                            <div className="icon-box"><FaPhoneAlt /></div>
                            <div className="info-text">
                                <h4>{t('contact_phone_title')}</h4>
                                <p>{settings?.phone_1}</p>
                                <p>{settings?.phone_2}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><FaWhatsapp /></div>
                            <div className="info-text">
                                <h4>WhatsApp</h4>
                                <p>{settings?.whatsapp}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><FaEnvelope /></div>
                            <div className="info-text">
                                <h4>Email</h4>
                                <p>{settings?.email}</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-box"><FaMapMarkerAlt /></div>
                            <div className="info-text">
                                <h4>{t('contact_address_title')}</h4>
                                <p>{settings?.address}</p>
                            </div>
                        </div>
                    </div>
                    {settings?.map_url && (
                        <iframe
                            src={settings.map_url}
                            className="contact-map"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                        ></iframe>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
