module.exports = (sequelizeInstance, DataTypes) => ({
  ConfigModel: require('./config')(sequelizeInstance, DataTypes),
});
