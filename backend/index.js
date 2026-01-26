const express = require('express');
const cors = require('cors');
const db = require('./models');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        const allowedPatterns = [
            /^http:\/\/localhost/,
            /\.binishaenterprises\.app$/,
            /\.vercel\.app$/,
            /^http:\/\/13\.61\.35\.220/, // Your current IP
            /^http:\/\/51\.21\.24\.188/   // Your old IP
        ];

        const isAllowed = allowedPatterns.some(pattern =>
            pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            // For now, let's allow all in development/testing to avoid friction
            callback(null, true);
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for uploads in the future)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authMiddleware = require('./middleware/authMiddleware');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api/admin', authMiddleware, require('./routes/admin'));

// Sync DB and Start Server
db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
