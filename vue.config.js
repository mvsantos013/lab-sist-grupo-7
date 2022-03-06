module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['sqlite3', 'sequelize'],
      nodeIntegration: true,
    },
  },
};
