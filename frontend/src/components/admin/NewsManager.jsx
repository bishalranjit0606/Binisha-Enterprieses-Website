import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';

const NewsManager = () => {
    const { news } = useContent();
    const [openForm, setOpenForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        image_url: '',
        date: new Date().toISOString().split('T')[0],
        title_en: '',
        title_ne: '',
        excerpt_en: '',
        excerpt_ne: ''
    });

    const resetForm = () => {
        setFormData({
            image_url: '',
            date: new Date().toISOString().split('T')[0],
            title_en: '',
            title_ne: '',
            excerpt_en: '',
            excerpt_ne: ''
        });
        setEditingId(null);
        setOpenForm(false);
    };

    const handleEdit = (item) => {
        setFormData({
            image_url: item.image_url,
            date: item.date,
            title_en: item.title_en,
            title_ne: item.title_ne,
            excerpt_en: item.excerpt_en,
            excerpt_ne: item.excerpt_ne
        });
        setEditingId(item.id);
        setOpenForm(true);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const data = new FormData();
        data.append('image', file);
        try {
            const res = await axios.post('/api/admin/upload', data);
            setFormData({ ...formData, image_url: res.data.url });
        } catch (err) {
            alert('Upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/admin/news/${editingId}`, formData);
            } else {
                await axios.post('/api/admin/news', formData);
            }
            alert('Saved successfully!');
            window.location.reload();
        } catch (err) {
            alert('Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this news?')) return;
        try {
            await axios.delete(`/api/admin/news/${id}`);
            window.location.reload();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <div className="admin-content-header">
                <h2 className="admin-title">Manage News</h2>
                {!openForm && (
                    <button className="admin-btn admin-btn-primary" onClick={() => setOpenForm(true)}>
                        <i className="fas fa-plus"></i> Add News Item
                    </button>
                )}
            </div>

            {openForm && (
                <div className="admin-card">
                    <h3 className="admin-title" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        {editingId ? 'Edit News' : 'New News'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-row">
                            <div className="admin-form-group">
                                <label className="admin-label">Date</label>
                                <input type="date" className="admin-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Image</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                        <button type="button" className="admin-btn admin-btn-secondary">
                                            <i className="fas fa-upload"></i> Upload Image
                                        </button>
                                        <input
                                            type="file"
                                            onChange={handleUpload}
                                            style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                        />
                                    </div>
                                    {formData.image_url && (
                                        <img src={`/${formData.image_url}`} alt="Preview" style={{ height: '50px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    )}
                                </div>
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
                                <label className="admin-label">Excerpt (English)</label>
                                <textarea className="admin-textarea" rows="3" value={formData.excerpt_en} onChange={e => setFormData({ ...formData, excerpt_en: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Excerpt (Nepali)</label>
                                <textarea className="admin-textarea" rows="3" value={formData.excerpt_ne} onChange={e => setFormData({ ...formData, excerpt_ne: e.target.value })} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" className="admin-btn admin-btn-primary">
                                <i className="fas fa-save"></i> Save News
                            </button>
                            <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-row">
                {news && news.map(item => (
                    <div key={item.id} className="admin-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '180px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                            <img src={`/${item.image_url}`} alt={item.title_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'rgba(0,0,0,0.7)', color: 'white',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem'
                            }}>
                                {item.date}
                            </div>
                        </div>
                        <div style={{ padding: '20px', flex: 1 }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#1C2541' }}>{item.title_en}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>{item.excerpt_en}</p>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(item)} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsManager;
