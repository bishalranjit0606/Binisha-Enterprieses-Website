import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';
import { getImageUrl } from '../../utils/image';

const GalleryManager = () => {
    const { gallery } = useContent();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            // 1. Upload Image
            const uploadRes = await axios.post('/api/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = uploadRes.data.url;

            // 2. Create Gallery Item
            await axios.post('/api/admin/gallery', {
                image_url: imageUrl,
                alt: 'New Gallery Image'
            });

            alert('Uploaded successfully!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/admin/gallery/${id}`);
            alert('Deleted successfully!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    };

    return (
        <div>
            <div className="admin-content-header">
                <h2 className="admin-title">Manage Gallery</h2>
                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                    <button className="admin-btn admin-btn-primary" disabled={uploading}>
                        <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i> {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <input
                        type="file"
                        onChange={handleUpload}
                        disabled={uploading}
                        style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className="admin-row">
                {gallery && gallery.map(item => (
                    <div key={item.id} className="admin-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                            <img
                                src={getImageUrl(item.image_url)}
                                alt={item.alt}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '15px' }}>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="admin-btn admin-btn-danger"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManager;
