const db = require('../models');

// Translations
exports.updateTranslation = async (req, res) => {
    try {
        const { key } = req.params;
        const { en, ne } = req.body;
        await db.Translation.upsert({ key, en, ne });
        res.json({ success: true, message: 'Translation updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Site Settings
exports.updateSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;
        await db.SiteSetting.upsert({ key, value });
        res.json({ success: true, message: 'Setting updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Services
exports.createService = async (req, res) => {
    try {
        const service = await db.Service.create(req.body);
        res.json(service);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        await db.Service.update(req.body, { where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await db.Service.destroy({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Gallery (Assuming Image URL is passed, file upload handled separately)
exports.createGalleryItem = async (req, res) => {
    try {
        const item = await db.Gallery.create(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        console.log(req.params.id)
        const { id } = req.params;
        await db.Gallery.destroy({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// News
exports.createNews = async (req, res) => {
    try {
        const item = await db.News.create(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        await db.News.update(req.body, { where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await db.News.destroy({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Feed
exports.createFeed = async (req, res) => {
    try {
        const item = await db.Feed.create(req.body);

        // If an image is provided, automatically add it to the Gallery
        if (req.body.image_url) {
            await db.Gallery.create({
                image_url: req.body.image_url,
                alt: req.body.caption || 'Feed Image',
                order: 0
            });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFeed = async (req, res) => {
    try {
        const { id } = req.params;
        await db.Feed.destroy({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
