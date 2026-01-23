const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Translation = sequelize.define('Translation', {
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    en: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ne: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Translation;
