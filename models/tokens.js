'use strict';
module.exports = function (sequelize, DataTypes) {
  var Tokens = sequelize.define('Tokens', {
    acceptToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    expired: DataTypes.DATE,
    isSignedOut: DataTypes.BOOLEAN
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Tokens.belongsTo(models.Users, { foreignKey: 'userId' });
        }
      }
    });
  return Tokens;
};