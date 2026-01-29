import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';
import { getImageUrl } from '../../utils/image';

const FeedManager = () => {
    const { feed, refreshContent } = useContent();
    const [openForm, setOpenForm] = useState(false);
    const [formData, setFormData] = useState({
        image_url: '',
        caption: ''
    });

    const resetForm = () => {
        setFormData({ image_url: '', caption: '' });
        setOpenForm(false);
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
            await axios.post('/api/admin/feed', formData);
            alert('Posted to feed!');
            refreshContent();
            resetForm();
        } catch (err) {
            alert('Failed to post');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this post?')) return;
        try {
            await axios.delete(`/api/admin/feed/${id}`);
            refreshContent();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="feed-management">
            <div className="admin-content-header">
                <h2 className="admin-title">Feed & Updates</h2>
                {!openForm && (
                    <button className="admin-btn admin-btn-primary" onClick={() => setOpenForm(true)}>
                        <i className="fas fa-plus"></i> New Feed Post
                    </button>
                )}
            </div>

            {openForm && (
                <div className="admin-card">
                    <h3 className="admin-title" style={{ fontSize: '1.2rem' }}>Create New Post</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-group">
                            <label className="admin-label">Image (Optional)</label>
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
                                    <img src={getImageUrl(formData.image_url)} alt="Preview" style={{ height: '45px', borderRadius: '4px' }} />
                                )}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>
                                Posting an image will also add it to your Gallery automatically.
                            </p>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Caption / Text (Optional)</label>
                            <textarea
                                className="admin-textarea"
                                rows="4"
                                value={formData.caption}
                                onChange={e => setFormData({ ...formData, caption: e.target.value })}
                                placeholder="What's on your mind?"
                            ></textarea>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                type="submit"
                                className="admin-btn admin-btn-primary"
                                disabled={!formData.image_url && !formData.caption}
                            >
                                Post to Feed
                            </button>
                            <button type="button" onClick={resetForm} className="admin-btn admin-btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-row">
                {feed && feed.map(item => (
                    <div key={item.id} className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
                        {item.image_url && (
                            <img src={getImageUrl(item.image_url)} alt="Feed" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                        )}
                        <div style={{ padding: '15px' }}>
                            <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '15px' }}>{item.caption || '(No caption)'}</p>
                            <button onClick={() => handleDelete(item.id)} className="admin-btn admin-btn-danger" style={{ width: '100%', justifyContent: 'center' }}>
                                <i className="fas fa-trash"></i> Delete Post
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedManager;
