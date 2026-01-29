const sequelize = require('../config/database');
const Translation = require('./Translation');
const SiteSetting = require('./SiteSetting');
const Service = require('./Service');
const ServiceCompany = require('./ServiceCompany');
const Gallery = require('./Gallery');
const News = require('./News');
const Credential = require('./Credential');
const FloatingBox = require('./FloatingBox');
const Feed = require('./Feed');

// Associations
Service.hasMany(ServiceCompany, { foreignKey: 'serviceId', as: 'companies' });
ServiceCompany.belongsTo(Service, { foreignKey: 'serviceId' });

const db = {
    sequelize,
    Translation,
    SiteSetting,
    Service,
    ServiceCompany,
    Gallery,
    News,
    Credential,
    FloatingBox,
    Feed
};

module.exports = db;
