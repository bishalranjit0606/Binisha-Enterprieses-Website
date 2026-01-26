import React from 'react';

const Dashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="admin-card welcome-card">
                <h1>Hello Vijay Ranjitkar.</h1>
                <p>Welcome to your Admin panel. Here you can manage all aspects of your website including translations, services, gallery images, and news updates.</p>
                <div className="admin-stats-grid">
                    <div className="stat-card">
                        <i className="fas fa-language"></i>
                        <span>Manage Languages</span>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-concierge-bell"></i>
                        <span>Update Services</span>
                    </div>
                    <div className="stat-card">
                        <i className="fas fa-images"></i>
                        <span>Curate Gallery</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
