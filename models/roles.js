'use strict';
module.exports = function (sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    name: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          Roles.hasMany(models.UserRoles, { foreignKey: 'roleId' });
        }
      }
    });
  return Roles;
};