import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../../styles/admin.css';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="admin-container">
            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <i className="fas fa-bars"></i>
                </button>
                <div className="admin-logo" style={{ color: '#1C2541', marginLeft: '15px' }}>
                    Admin Panel
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'active' : ''}`}>
                <div className="admin-sidebar-header">
                    <div className="admin-logo">Admin Panel</div>
                </div>
                <nav className="admin-nav">
                    <ul>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/translations"
                                className={`admin-nav-link ${isActive('/admin/translations')}`}
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-language"></i> Translations
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/services"
                                className={`admin-nav-link ${isActive('/admin/services')}`}
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-concierge-bell"></i> Services
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/gallery"
                                className={`admin-nav-link ${isActive('/admin/gallery')}`}
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-images"></i> Gallery
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/news"
                                className={`admin-nav-link ${isActive('/admin/news')}`}
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-newspaper"></i> News
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/admin/settings"
                                className={`admin-nav-link ${isActive('/admin/settings')}`}
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-cogs"></i> General Settings
                            </Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link
                                to="/"
                                target="_blank"
                                className="admin-nav-link"
                                onClick={closeSidebar}
                            >
                                <i className="fas fa-external-link-alt"></i> View Site
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <Outlet />
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
                    onClick={closeSidebar}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
