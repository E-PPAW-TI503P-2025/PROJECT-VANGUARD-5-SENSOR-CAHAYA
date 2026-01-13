"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("sensorlogs", "kondisi", {
            type: Sequelize.ENUM("TERANG", "GELAP"),
            allowNull: false,
            defaultValue: "GELAP"
        });

        await queryInterface.addColumn("sensorlogs", "status_lampu", {
            type: Sequelize.ENUM("ON", "OFF"),
            allowNull: false,
            defaultValue: "ON"
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("sensorlogs", "kondisi");
        await queryInterface.removeColumn("sensorlogs", "status_lampu");
    }
};
