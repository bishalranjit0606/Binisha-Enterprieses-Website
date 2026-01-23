import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContent } from '../contexts/ContentContext';

const Services = () => {
    const { t, language, tHtml } = useLanguage();
    const { services } = useContent();
    const [selectedService, setSelectedService] = useState(null);

    const openModal = (service) => {
        setSelectedService(service);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = '';
    };

    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="section-header center-text fade-on-scroll">
                    <h4 className="section-subtitle">{t('services_subtitle')}</h4>
                    <h2 className="section-title" dangerouslySetInnerHTML={tHtml('services_title')}></h2>
                </div>
                <div className="services-grid">
                    {services && services.map((service, index) => (
                        <div
                            className="service-card fade-on-scroll"
                            key={service.id || index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => openModal(service)}
                        >
                            <div className="service-icon">
                                <i className={service.icon}></i>
                            </div>
                            <h3 className="service-title">
                                {language === 'en' ? service.title_en : service.title_ne}
                            </h3>
                            <p className="service-description">
                                {language === 'en' ? service.desc_en : service.desc_ne}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Modal */}
            <div
                id="service-modal"
                className={`service-modal ${selectedService ? 'active' : ''}`}
                aria-hidden={!selectedService}
            >
                <div className="service-modal-overlay" onClick={closeModal}></div>
                <div className="service-modal-content fade-in-up">
                    <button className="modal-close" onClick={closeModal} aria-label="Close Modal">&times;</button>
                    <div className="modal-body">
                        {selectedService && (
                            <>
                                <h3 className="modal-title">
                                    {language === 'en' ? selectedService.title_en : selectedService.title_ne}
                                </h3>
                                <p className="modal-description">Companies we provide regarding this service:</p>
                                <div className="company-list-container">
                                    <ul className="company-list">
                                        {selectedService.companies && selectedService.companies.map((company) => (
                                            <li key={company.id}>{company.name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="modal-actions">
                                    <a
                                        href={`https://wa.me/9779855029952?text=${encodeURIComponent(selectedService.whatsapp_msg || 'Hello')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn modal-btn"
                                    >
                                        <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
