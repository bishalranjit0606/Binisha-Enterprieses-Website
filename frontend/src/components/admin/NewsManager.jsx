import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';
import { getImageUrl } from '../../utils/image';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const NewsManager = () => {
    const { news, refreshContent } = useContent();
    const [openForm, setOpenForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        image_url: '',
        date: new Date().toISOString().split('T')[0],
        title: '',
        excerpt: '',
        body: ''
    });

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image'
    ];

    const resetForm = () => {
        setFormData({
            image_url: '',
            date: new Date().toISOString().split('T')[0],
            title: '',
            excerpt: '',
            body: ''
        });
        setEditingId(null);
        setOpenForm(false);
    };

    const handleEdit = (item) => {
        setFormData({
            image_url: item.image_url || '',
            date: item.date,
            title: item.title || '',
            excerpt: item.excerpt || '',
            body: item.body || ''
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
            refreshContent();
            resetForm();
        } catch (err) {
            alert('Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this news?')) return;
        try {
            await axios.delete(`/api/admin/news/${id}`);
            refreshContent();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="news-management">
            <div className="admin-content-header">
                <h2 className="admin-title">News & Updates</h2>
                {!openForm && (
                    <button className="admin-btn admin-btn-primary" onClick={() => setOpenForm(true)}>
                        <i className="fas fa-plus"></i> Add New News Item
                    </button>
                )}
            </div>

            {openForm && (
                <div className="admin-card">
                    <div style={{ marginBottom: '25px' }}>
                        <h3 className="admin-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                            {editingId ? 'Edit News Content' : 'Create New Article'}
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="admin-row">
                            <div className="admin-form-group">
                                <label className="admin-label">Publish Date</label>
                                <input type="date" className="admin-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Featured Image</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                        <button type="button" className="admin-btn admin-btn-secondary">
                                            <i className="fas fa-upload"></i> Upload
                                        </button>
                                        <input
                                            type="file"
                                            onChange={handleUpload}
                                            style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                        />
                                    </div>
                                    {formData.image_url && (
                                        <img src={getImageUrl(formData.image_url)} alt="Preview" style={{ height: '45px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">News Title</label>
                            <input className="admin-input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Enter title here..." required />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Subtitle / Excerpt</label>
                            <input className="admin-input" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A brief summary for the list page..." />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">News Body</label>
                            <ReactQuill
                                theme="snow"
                                value={formData.body}
                                onChange={(content) => setFormData({ ...formData, body: content })}
                                modules={quillModules}
                                formats={quillFormats}
                                style={{ height: '300px', marginBottom: '50px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <button type="submit" className="admin-btn admin-btn-primary">
                                <i className="fas fa-save"></i> {editingId ? 'Update News' : 'Publish News'}
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
                            <img src={getImageUrl(item.image_url)} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'rgba(0,0,0,0.7)', color: 'white',
                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem'
                            }}>
                                {item.date}
                            </div>
                        </div>
                        <div style={{ padding: '20px', flex: 1 }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#1C2541' }}>{item.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {item.excerpt}
                            </p>
                        </div>
                        <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(item)} className="admin-btn admin-btn-secondary" style={{ flex: 1, justifyContent: 'center', height: '35px', fontSize: '0.8rem' }}>
                                <i className="fas fa-edit"></i> Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-danger" style={{ flex: 1, justifyContent: 'center', height: '35px', fontSize: '0.8rem' }}>
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsManager;
