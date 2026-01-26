import React, { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';

const SettingsManager = () => {
    const { settings, refreshContent } = useContent();
    const [localSettings, setLocalSettings] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (settings) {
            setLocalSettings(settings);
        }
    }, [settings]);

    const handleChange = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleUpload = async (key, file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        try {
            setLoading(true);
            const res = await axios.post('/api/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            handleChange(key, res.data.url);
            alert('Image uploaded successfully!');
        } catch (err) {
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // We need an endpoint to bulk update settings or update one by one
            // Assuming we loop through and update for now, or use a bulk endpoint if available.
            // Since we don't have a bulk endpoint, we'll try to update keys that changed.
            // Or simpler: iterate and update all.

            // NOTE: Ideally backend should have a bulk update.
            // Checking Admin Routes: likely we need to call PUT /api/admin/settings/:key

            const promises = Object.entries(localSettings).map(([key, value]) => {
                return axios.put(`/api/admin/settings/${key}`, { value });
            });

            await Promise.all(promises);
            alert('Settings saved successfully!');
            refreshContent();
        } catch (err) {
            console.error(err);
            alert('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="admin-content-header">
                <h2 className="admin-title">General Settings</h2>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSave}>
                    <h3 style={{ fontSize: '1.2rem', color: '#1C2541', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                        Contact Information
                    </h3>

                    <div className="admin-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Phone 1</label>
                            <input
                                className="admin-input"
                                value={localSettings.phone_1 || ''}
                                onChange={e => handleChange('phone_1', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Phone 2</label>
                            <input
                                className="admin-input"
                                value={localSettings.phone_2 || ''}
                                onChange={e => handleChange('phone_2', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="admin-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Email Address</label>
                            <input
                                className="admin-input"
                                value={localSettings.email || ''}
                                onChange={e => handleChange('email', e.target.value)}
                            />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">WhatsApp Number</label>
                            <input
                                className="admin-input"
                                value={localSettings.whatsapp || ''}
                                onChange={e => handleChange('whatsapp', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Address</label>
                        <input
                            className="admin-input"
                            value={localSettings.address || ''}
                            onChange={e => handleChange('address', e.target.value)}
                        />
                    </div>

                    <div className="admin-form-group">
                        <label className="admin-label">Google Maps Embed URL</label>
                        <textarea
                            className="admin-textarea"
                            rows="3"
                            value={localSettings.map_url || ''}
                            onChange={e => handleChange('map_url', e.target.value)}
                        />
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: '#1C2541', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', marginTop: '30px' }}>
                        Site Images
                    </h3>

                    <div className="admin-row">
                        <div className="admin-form-group">
                            <label className="admin-label">Hero Image (Main Banner)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                    <button type="button" className="admin-btn admin-btn-secondary">
                                        <i className="fas fa-upload"></i> Upload Hero
                                    </button>
                                    <input
                                        type="file"
                                        onChange={e => handleUpload('hero_image', e.target.files[0])}
                                        style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                    />
                                </div>
                                {localSettings.hero_image && (
                                    <img src={`/${localSettings.hero_image}`} alt="Hero" style={{ height: '80px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                )}
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">"Why Us" Image</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                    <button type="button" className="admin-btn admin-btn-secondary">
                                        <i className="fas fa-upload"></i> Upload Image
                                    </button>
                                    <input
                                        type="file"
                                        onChange={e => handleUpload('why_us_image', e.target.files[0])}
                                        style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                    />
                                </div>
                                {localSettings.why_us_image && (
                                    <img src={`/${localSettings.why_us_image}`} alt="Why Us" style={{ height: '80px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save All Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsManager;
