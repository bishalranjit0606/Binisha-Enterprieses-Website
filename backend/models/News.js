const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const News = sequelize.define('News', {
    image_url: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    title_en: DataTypes.STRING,
    title_ne: DataTypes.STRING,
    excerpt_en: DataTypes.TEXT,
    excerpt_ne: DataTypes.TEXT,
    body_en: DataTypes.TEXT,
    body_ne: DataTypes.TEXT,
});

module.exports = News;
