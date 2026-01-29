const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.put('/translations/:key', adminController.updateTranslation);
router.put('/settings/:key', adminController.updateSetting);

router.post('/services', adminController.createService);
router.put('/services/:id', adminController.updateService);
router.delete('/services/:id', adminController.deleteService);

router.post('/gallery', adminController.createGalleryItem);
router.delete('/gallery/:id', adminController.deleteGalleryItem);

router.post('/news', adminController.createNews);
router.put('/news/:id', adminController.updateNews);
router.delete('/news/:id', adminController.deleteNews);

router.post('/feed', adminController.createFeed);
router.delete('/feed/:id', adminController.deleteFeed);

// Upload Route
router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ url: `uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

module.exports = router;
