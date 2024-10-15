'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'ReadingLists',
            [
                {
                    user_id: 1, // Oletetaan, että käyttäjä ID 1 on olemassa
                    blog_id: 1, // Oletetaan, että blogi ID 1 on olemassa
                    read: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    user_id: 1, // Oletetaan, että käyttäjä ID 1 on olemassa
                    blog_id: 2, // Oletetaan, että blogi ID 2 on olemassa
                    read: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ReadingLists', null, {});
    },
};
