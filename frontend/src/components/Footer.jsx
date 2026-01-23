import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer fade-on-scroll">
            <div className="container center-text">
                <div className="footer-logo">Binisha <span className="red-text">Enterprises</span></div>
                <p className="copyright">&copy; {year} Binisha Enterprises. All Rights Reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
