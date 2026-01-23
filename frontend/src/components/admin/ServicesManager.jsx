import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';

const ServicesManager = () => {
    const { services } = useContent();
    const [openForm, setOpenForm] = useState(false); // For creating new
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        icon: 'fas fa-check',
        title_en: '',
        title_ne: '',
        desc_en: '',
        desc_ne: '',
        whatsapp_msg: ''
    });

    const resetForm = () => {
        setFormData({
            icon: 'fas fa-check',
            title_en: '',
            title_ne: '',
            desc_en: '',
            desc_ne: '',
            whatsapp_msg: ''
        });
        setEditingId(null);
        setOpenForm(false);
    };

    const handleEdit = (service) => {
        setFormData({
            icon: service.icon,
            title_en: service.title_en,
            title_ne: service.title_ne,
            desc_en: service.desc_en,
            desc_ne: service.desc_ne,
            whatsapp_msg: service.whatsapp_msg
        });
        setEditingId(service.id);
        setOpenForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/admin/services/${editingId}`, formData);
            } else {
                await axios.post('/api/admin/services', formData);
            }
            alert('Saved successfully!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        try {
            await axios.delete(`/api/admin/services/${id}`);
            window.location.reload();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-content-header">
                <h2 className="admin-title">Manage Services</h2>
                {!openForm && (
                    <button className="admin-btn admin-btn-primary" onClick={() => setOpenForm(true)}>
                        <i className="fas fa-plus"></i> Add New Service
                    </button>
                )}
            </div>

            {openForm && (
                <div className="admin-card">
                    <h3 className="admin-title" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        {editingId ? 'Edit Service' : 'New Service'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-row">
                            <div className="admin-form-group">
                                <label className="admin-label">Icon Class (FontAwesome)</label>
                                <input className="admin-input" placeholder="e.g. fas fa-user" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">WhatsApp Message</label>
                                <input className="admin-input" placeholder="Message sent when clicked" value={formData.whatsapp_msg} onChange={e => setFormData({ ...formData, whatsapp_msg: e.target.value })} />
                            </div>
                        </div>

                        <div className="admin-row">
                            <div className="admin-form-group">
                                <label className="admin-label">Title (English)</label>
                                <input className="admin-input" value={formData.title_en} onChange={e => setFormData({ ...formData, title_en: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Title (Nepali)</label>
                                <input className="admin-input" value={formData.title_ne} onChange={e => setFormData({ ...formData, title_ne: e.target.value })} />
                            </div>
                        </div>

                        <div className="admin-row">
                            <div className="admin-form-group">
                                <label className="admin-label">Description (English)</label>
                                <textarea className="admin-textarea" rows="4" value={formData.desc_en} onChange={e => setFormData({ ...formData, desc_en: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Description (Nepali)</label>
                                <textarea className="admin-textarea" rows="4" value={formData.desc_ne} onChange={e => setFormData({ ...formData, desc_ne: e.target.value })} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" className="admin-btn admin-btn-primary">
                                <i className="fas fa-save"></i> Save Service
                            </button>
                            <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-row">
                {services && services.map(service => (
                    <div key={service.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '50%', background: '#f5f7fa',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px',
                                color: '#dc143c', fontSize: '1.2rem'
                            }}>
                                <i className={service.icon}></i>
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: '#1C2541' }}>{service.title_en}</h4>
                                <small style={{ color: '#666' }}>{service.title_ne}</small>
                            </div>
                        </div>
                        <p style={{ color: '#555', fontSize: '0.9rem', flex: 1, marginBottom: '20px' }}>
                            {service.desc_en}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            <button onClick={() => handleEdit(service)} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(service.id)} className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;
