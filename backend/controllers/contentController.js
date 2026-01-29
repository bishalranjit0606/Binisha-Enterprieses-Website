const db = require('../models');

exports.getContent = async (req, res) => {
    try {
        const translations = await db.Translation.findAll();
        const settings = await db.SiteSetting.findAll();
        const services = await db.Service.findAll({
            include: [{ model: db.ServiceCompany, as: 'companies' }],
            order: [['order', 'ASC'], [{ model: db.ServiceCompany, as: 'companies' }, 'order', 'ASC']]
        });
        const gallery = await db.Gallery.findAll({ order: [['order', 'ASC']] });
        const news = await db.News.findAll({ order: [['date', 'DESC']] });
        const credentials = await db.Credential.findAll({ order: [['order', 'ASC']] });
        const floatingBoxes = await db.FloatingBox.findAll({ order: [['order', 'ASC']] });

        // Transform translations to simple object { key: { en: ..., ne: ... } }
        const formattedTranslations = {};
        translations.forEach(t => {
            formattedTranslations[t.key] = { en: t.en, ne: t.ne };
        });

        // Transform settings to object { key: value }
        const formattedSettings = {};
        settings.forEach(s => {
            formattedSettings[s.key] = s.value;
        });

        res.json({
            translations: formattedTranslations,
            settings: formattedSettings,
            services,
            gallery,
            news,
            credentials,
            floatingBoxes,
            feed // Added this line
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getNewsItem = async (req, res) => {
    try {
        const item = await db.News.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
