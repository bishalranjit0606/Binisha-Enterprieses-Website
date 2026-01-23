const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceCompany = sequelize.define('ServiceCompany', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = ServiceCompany;
