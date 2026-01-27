const express = require('express');
const cors = require('cors');
const db = require('./models');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads (serving from the absolute path /app/uploads)
const UPLOADS_PATH = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_PATH));

const authMiddleware = require('./middleware/authMiddleware');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api/admin', authMiddleware, require('./routes/admin'));

// Sync DB and Start Server
db.sequelize.sync({ alter: true }).then(async () => {
    console.log('Database synced');

    // Ensure essential translations exist (Fix for missing keys on live db)
    try {
        await db.Translation.findOrCreate({
            where: { key: 'nav_news' },
            defaults: { key: 'nav_news', en: 'Latest News', ne: 'ताजा समाचार' }
        });
    } catch (e) {
        console.error('Failed to auto-seed translations:', e);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
