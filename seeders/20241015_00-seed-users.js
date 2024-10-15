'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    username: 'mluukkai@iki.fi',
                    name: 'Matti Luukkainen',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'test@example.com',
                    name: 'Test User',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
