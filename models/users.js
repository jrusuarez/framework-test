'use strict';
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    userName: DataTypes.STRING,
    digitCodeHash: DataTypes.STRING,
    saltDigitCodeHash: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function (models) {     
       Users.hasMany(models.UserRoles, { foreignKey: 'userId' });   
       Users.hasMany(models.Tokens, { foreignKey: 'userId' });
     }
   }
 });
  return Users;
};