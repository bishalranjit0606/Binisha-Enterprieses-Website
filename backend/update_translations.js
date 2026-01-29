const db = require('./models');

const update = async () => {
    try {
        await db.Translation.upsert({
            key: 'nav_feed',
            en: 'Our Updates',
            ne: 'हाम्रा अपडेटहरू'
        });
        console.log('Successfully added nav_feed translation');
        process.exit(0);
    } catch (err) {
        console.error('Failed to update translation:', err);
        process.exit(1);
    }
};

update();
