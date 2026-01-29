const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const News = sequelize.define('News', {
    image_url: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    title: DataTypes.STRING,
    excerpt: DataTypes.TEXT,
    body: DataTypes.TEXT,
});

module.exports = News;
