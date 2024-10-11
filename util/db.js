const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Aseta true, jos haluat nähdä SQL-kyselyt konsolissa
});

const runMigrations = async () => {
    const umzug = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        logger: console,
    });

    try {
        const migrations = await umzug.up();
        console.log('Migrations have been run successfully.', {
            files: migrations.map((migration) => migration.name),
        });
    } catch (error) {
        console.error('Error running migrations:', error);
        return process.exit(1);
    }
    return null;
};

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return process.exit(1);
    }
    return null;
};

module.exports = { sequelize, connectToDatabase };
