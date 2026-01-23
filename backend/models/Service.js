const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
    icon: DataTypes.STRING,
    title_en: DataTypes.STRING,
    title_ne: DataTypes.STRING,
    desc_en: DataTypes.TEXT,
    desc_ne: DataTypes.TEXT,
    whatsapp_msg: DataTypes.STRING,
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Service;
