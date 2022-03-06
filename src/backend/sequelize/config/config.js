const path = require('path');
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    storage: path.resolve('src/data', 'database.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
  },
  test: {
    username: 'root',
    password: 'root',
    storage: path.resolve('src/data', 'database.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
  },
  production: {
    username: 'root',
    password: 'root',
    storage: path.resolve('src/data', 'database.sqlite'),
    host: 'localhost',
    dialect: 'sqlite',
  },
};
