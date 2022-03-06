const Sequelize = require('sequelize');
const path = require('path');

const dbClient = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('../../data/', 'database.db'),
});

export default dbClient;
