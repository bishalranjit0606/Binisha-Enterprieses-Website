const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FloatingBox = sequelize.define('FloatingBox', {
    icon: DataTypes.STRING,
    text_en: DataTypes.STRING,
    text_ne: DataTypes.STRING,
    position_class: DataTypes.STRING,
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = FloatingBox;
