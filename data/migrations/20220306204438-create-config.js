'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'configs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        host: {
          type: Sequelize.STRING,
        },
        apikey: {
          type: Sequelize.STRING,
        },
        dataverse: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            name: 'unique_config_index',
            unique: true,
            fields: ['apikey', 'host'],
          },
        ],
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('configs');
  },
};
