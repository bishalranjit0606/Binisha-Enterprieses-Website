import React from 'react';
import { motion } from 'framer-motion';
import {
    FaLanguage,
    FaConciergeBell,
    FaImages,
    FaNewspaper,
    FaCog,
    FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const cards = [
        { title: 'Translations', icon: <FaLanguage />, link: '/admin/translations', desc: 'Edit English & Nepali text' },
        { title: 'Services', icon: <FaConciergeBell />, link: '/admin/services', desc: 'Manage service providers' },
        { title: 'News', icon: <FaNewspaper />, link: '/admin/news', desc: 'Post latest updates' },
        { title: 'Gallery', icon: <FaImages />, link: '/admin/gallery', desc: 'Manage your photos' },
        { title: 'Settings', icon: <FaCog />, link: '/admin/settings', desc: 'Contact & Map info' },
        { title: 'View Site', icon: <FaExternalLinkAlt />, link: '/', desc: 'Visit public website', external: true },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="admin-dashboard-container">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="admin-card welcome-card"
            >
                <h1>Hello Vijay Ranjitkar.</h1>
                <p>Welcome to your Binisha Enterprises Admin Panel. Manage your digital presence with ease.</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="admin-stats-grid"
            >
                {cards.map((card, index) => (
                    <motion.div key={index} variants={item}>
                        <Link to={card.link} target={card.external ? "_blank" : "_self"} className="stat-card-link">
                            <div className="stat-card">
                                <div className="stat-icon">{card.icon}</div>
                                <div className="stat-info">
                                    <h3>{card.title}</h3>
                                    <p>{card.desc}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Dashboard;
