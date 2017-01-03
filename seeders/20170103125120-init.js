'use strict';

var uuid = require('node-uuid');
var helper = require("../helper/crypto");

module.exports = {
  up: function (queryInterface, Sequelize) {
    /**
     * Init roles
     */
    var adminRole =
      {
        id: uuid.v1(),
        name: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date()
      };

    var userRole =
      {
        id: uuid.v1(),
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date()
      };

    /**
     * Init defaut user
     */
    var passwordGenerator = helper.generatePassword("Sm@rt2016");
    var user = {
      id: uuid.v1(),
      username: "admin@gmail.com",
      digitCodeHash: passwordGenerator.digitCodeHash,
      saltDigitCodeHash: passwordGenerator.saltDigitCodeHash,
      email: "admin@gmail.com",
      phoneNumber: "",
      firstName: "admin",
      lastName: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    /**
     * Init User Role data
     */
    var userRoleRelation = {
      id: uuid.v1(),
      userId: user.id,
      roleId: adminRole.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    
    return queryInterface.bulkInsert('Roles', [adminRole, userRole]),
      queryInterface.bulkInsert('Users', [user]),
      queryInterface.bulkInsert('UserRoles', [userRoleRelation]);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{ username: 'admin@gmail.com' }], {});   
    queryInterface.bulkDelete('Roles', [{ name: 'Administrator' }], {});
    queryInterface.bulkDelete('Roles', [{ name: 'User' }], {});   
  }
};
