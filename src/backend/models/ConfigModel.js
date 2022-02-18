const Sequelize = require('sequelize');
const database = require('./db');

const ConfigModel = database.define('environment_config', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default ConfigModel;
