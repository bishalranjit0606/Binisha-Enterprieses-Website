const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Credential = sequelize.define('Credential', {
    icon: DataTypes.STRING,
    value: DataTypes.STRING,
    label_en: DataTypes.STRING,
    label_ne: DataTypes.STRING,
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Credential;
