const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feed = sequelize.define('Feed', {
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Feed;
