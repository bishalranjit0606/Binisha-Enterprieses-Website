import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaLanguage } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { t, switchLanguage, language } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Active section logic only on homepage
            if (location.pathname === '/') {
                const sections = document.querySelectorAll('section[id], header[id]');
                let current = 'home';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });
                setActiveSection(current);
            } else {
                setActiveSection('');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Handle hash scrolling after navigation
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle('menu-open', !menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    const handleLinkClick = (e, id) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
                // Update URL hash without reload
                window.history.pushState(null, '', `#${id}`);
            }
        } else {
            // Let the Link component handle navigation to /#id
            closeMenu();
        }
    };

    const toggleLanguage = () => {
        switchLanguage(language === 'en' ? 'ne' : 'en');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container nav-container">
                <Link to="/#home" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
                    BINISHA <span className="red-text">ENTERPRISES</span>
                </Link>

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
                            <Link
                                to={`/#${item}`}
                                className={`nav-link ${activeSection === item ? 'active' : ''} ${item === 'contact' ? 'btn-contact' : ''}`}
                                onClick={(e) => handleLinkClick(e, item)}
                            >
                                {t(`nav_${item.replace('-', '_')}`)}
                            </Link>
                        </li>
                    ))}

                    {/* Mobile Language Toggle */}
                    <li className="nav-item" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            className="language-toggle"
                            style={{ display: 'none' }}
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
