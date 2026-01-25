import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/image';
import '../styles/index.css';

const AllGalleryPage = () => {
    const { gallery } = useContent();
    const { language } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <section className="gallery-page-section" style={{ minHeight: '80vh', padding: '60px 0' }}>
                <div className="container">
                    <div className="section-header center-text">
                        <h4 className="section-subtitle">
                            {language === 'en' ? 'Explore' : 'अन्वेषण गर्नुहोस्'}
                        </h4>
                        <h2 className="section-title">
                            {language === 'en' ? 'Our Gallery' : 'हाम्रो ग्यालरी'}
                        </h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="gallery-grid">
                        {gallery && gallery.map((item, index) => (
                            <div
                                className="gallery-grid-item"
                                key={item.id}
                                style={{ animationDelay: `${index * 0.05}s` }}
                                onClick={() => openImageModal(item)}
                            >
                                <div className="gallery-grid-image-wrapper">
                                    <img src={getImageUrl(item.image_url)} alt={item.alt || 'Gallery Image'} />
                                    <div className="gallery-grid-overlay">
                                        <i className="fas fa-search-plus"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div className="gallery-modal" onClick={closeImageModal}>
                    <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="gallery-modal-close" onClick={closeImageModal}>
                            <i className="fas fa-times"></i>
                        </button>
                        <img src={getImageUrl(selectedImage.image_url)} alt={selectedImage.alt || 'Gallery Image'} />
                    </div>
                </div>
            )}
        </>
    );
};

export default AllGalleryPage;
