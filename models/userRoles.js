'use strict';
module.exports = function (sequelize, DataTypes) {
  var UserRoles = sequelize.define('UserRoles', {
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          UserRoles.belongsTo(models.Users, { foreignKey: 'userId' });
          UserRoles.belongsTo(models.Roles, { foreignKey: 'roleId' });
        }
      }
    });
  return UserRoles;
};