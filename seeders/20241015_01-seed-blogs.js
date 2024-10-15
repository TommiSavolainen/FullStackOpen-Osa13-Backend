'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Blogs',
            [
                {
                    author: 'Dan Abramov',
                    url: 'https://overreacted.io/',
                    title: 'Overreacted',
                    likes: 5,
                    year: 2019,
                    user_id: 1, // Oletetaan, että käyttäjä ID 1 on olemassa
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    author: 'Kent C. Dodds',
                    url: 'https://kentcdodds.com/',
                    title: 'Kent C. Dodds Blog',
                    likes: 10,
                    year: 2020,
                    user_id: 1, // Oletetaan, että käyttäjä ID 1 on olemassa
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Blogs', null, {});
    },
};
