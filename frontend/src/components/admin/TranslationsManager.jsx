import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';
import axios from 'axios';

const TranslationsManager = () => {
    const { translations } = useContent();
    const [editingKey, setEditingKey] = useState(null);
    const [editForm, setEditForm] = useState({ en: '', ne: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // Mapping raw keys to friendly labels
    const KEY_LABELS = {
        nav_home: "Navigation: Home",
        nav_services: "Navigation: Services",
        nav_why_us: "Navigation: Why Us",
        nav_gallery: "Navigation: Gallery",
        nav_contact: "Navigation: Contact",
        hero_title: "Hero Section: Main Title",
        hero_desc: "Hero Section: Description",
        btn_explore: "Button: Explore Services",
        btn_contact: "Button: Get In Touch",
        float_experience: "Floating Badge: Experience",
        float_customers: "Floating Badge: Customers",
        scroll_down: "Label: Scroll Down",
        services_subtitle: "Services: Subtitle",
        services_title: "Services: Main Title",
        svc_insurance_title: "Service: Insurance Title",
        svc_insurance_desc: "Service: Insurance Description",
        svc_remittance_title: "Service: Remittance Title",
        svc_remittance_desc: "Service: Remittance Description",
        svc_ticket_title: "Service: Ticket Booking Title",
        svc_ticket_desc: "Service: Ticket Booking Description",
        svc_recharge_title: "Service: Recharge Title",
        svc_recharge_desc: "Service: Recharge Description",
        svc_bill_title: "Service: Bill Payment Title",
        svc_bill_desc: "Service: Bill Payment Description",
        about_subtitle: "About: Subtitle",
        about_title: "About: Main Title",
        about_text_1: "About: Paragraph 1",
        about_text_2: "About: Paragraph 2",
        about_signature: "About: Signature Text",
        about_agent: "About: Agent Name",
        cred_years_num: "Stats: Years Number",
        cred_years_label: "Stats: Years Label",
        cred_customers_num: "Stats: Customers Number",
        cred_customers_label: "Stats: Customers Label",
        cred_rank_num: "Stats: Rank Number",
        cred_rank_label: "Stats: Rank Label",
        gallery_subtitle: "Gallery: Subtitle",
        gallery_title: "Gallery: Main Title",
        news_subtitle: "News: Subtitle",
        news_title: "News: Main Title",
        news1_title: "News 1: Title",
        news1_desc: "News 1: Description",
        news2_title: "News 2: Title",
        news2_desc: "News 2: Description",
        news3_title: "News 3: Title",
        news3_desc: "News 3: Description",
        contact_subtitle: "Contact: Subtitle",
        contact_title: "Contact: Main Title",
        contact_info_title: "Contact Info: Title",
        contact_info_desc: "Contact Info: Description",
        contact_phone_title: "Contact Info: Phone Label",
        contact_address_title: "Contact Info: Address Label",
        contact_address_val: "Contact Info: Address Value",
        load_more: "Button: Load More News"
    };

    const handleEdit = (key) => {
        setEditingKey(key);
        setEditForm({
            en: translations[key]?.en || '',
            ne: translations[key]?.ne || ''
        });
    };

    const handleSave = async (key) => {
        try {
            await axios.put(`/api/admin/translations/${key}`, editForm);
            alert('Updated successfully!');
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Failed to update');
        }
    };

    const filteredTranslations = translations ? Object.entries(translations).filter(([key, val]) => {
        const label = KEY_LABELS[key] || key;
        return label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.en.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    return (
        <div>
            <div className="admin-content-header">
                <h2 className="admin-title">Manage Text Content</h2>
            </div>

            <div className="admin-card">
                <div style={{ padding: '0 0 20px 0' }}>
                    <input
                        type="text"
                        placeholder="Search translations..."
                        className="admin-input"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '300px' }}
                    />
                </div>

                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Content Label</th>
                                <th style={{ width: '35%' }}>English</th>
                                <th style={{ width: '35%' }}>Nepali</th>
                                <th style={{ width: '10%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTranslations.map(([key, val]) => (
                                <tr key={key}>
                                    <td>
                                        <span style={{ fontWeight: '500', color: '#1C2541' }}>
                                            {KEY_LABELS[key] || key}
                                        </span>
                                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>
                                            {key}
                                        </div>
                                    </td>
                                    <td>
                                        {editingKey === key ? (
                                            <textarea
                                                className="admin-textarea"
                                                rows="3"
                                                value={editForm.en}
                                                onChange={e => setEditForm({ ...editForm, en: e.target.value })}
                                            />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: val.en }}></div>
                                        )}
                                    </td>
                                    <td>
                                        {editingKey === key ? (
                                            <textarea
                                                className="admin-textarea"
                                                rows="3"
                                                value={editForm.ne}
                                                onChange={e => setEditForm({ ...editForm, ne: e.target.value })}
                                            />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: val.ne }}></div>
                                        )}
                                    </td>
                                    <td>
                                        {editingKey === key ? (
                                            <button
                                                className="admin-btn admin-btn-primary"
                                                onClick={() => handleSave(key)}
                                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                            >
                                                <i className="fas fa-save"></i>
                                            </button>
                                        ) : (
                                            <button
                                                className="admin-btn admin-btn-secondary"
                                                onClick={() => handleEdit(key)}
                                                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TranslationsManager;
