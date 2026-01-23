const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gallery = sequelize.define('Gallery', {
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alt: DataTypes.STRING,
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Gallery;
