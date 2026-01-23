import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaLanguage } from 'react-icons/fa';

const Navbar = () => {
    const { t, switchLanguage, language } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Active section logic
            const sections = document.querySelectorAll('section[id], header[id]');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle('menu-open', !menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        }
    };

    const toggleLanguage = () => {
        switchLanguage(language === 'en' ? 'ne' : 'en');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container nav-container">
                <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
                    BINISHA <span className="red-text">ENTERPRISES</span>
                </a>

                <button
                    className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
                    id="mobile-menu-toggle"
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
                    {['home', 'services', 'why-us', 'gallery', 'contact'].map(item => (
                        <li className="nav-item" key={item}>
                            <a
                                href={`#${item}`}
                                className={`nav-link ${activeSection === item ? 'active' : ''} ${item === 'contact' ? 'btn-contact' : ''}`}
                                onClick={(e) => handleLinkClick(e, item)}
                            >
                                {t(`nav_${item.replace('-', '_')}`)}
                            </a>
                        </li>
                    ))}

                    {/* Mobile Language Toggle */}
                    <li className="nav-item" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            className="language-toggle"
                            style={{ display: 'none' }} /* Hidden by default, shown in mobile via CSS media query if needed, but existing CSS handles .navbar .language-toggle vs .nav-menu .language-toggle */
                            onClick={toggleLanguage}
                        >
                            <FaLanguage />
                            <span>{language === 'en' ? 'EN' : 'ने'}</span>
                        </button>
                    </li>
                </ul>

                <button className="language-toggle" id="language-toggle" aria-label="Toggle Language" onClick={toggleLanguage}>
                    <FaLanguage />
                    <span id="lang-text">{language === 'en' ? 'EN' : 'ने'}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
