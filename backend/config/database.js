const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if DATABASE_URL is provided (Render deployment)
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Use individual environment variables (local development)
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT || 'postgres',
            logging: false,
        }
    );
}

module.exports = sequelize;
