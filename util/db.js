const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Aseta true, jos haluat nähdä SQL-kyselyt konsolissa
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return process.exit(1);
    }
    return null;
};

module.exports = { sequelize, connectToDatabase };
