const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/content', contentController.getContent);
router.get('/news/:id', contentController.getNewsItem);

module.exports = router;
