'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('Blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1991,
                max: new Date().getFullYear(),
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('Blogs', 'year');
    },
};
