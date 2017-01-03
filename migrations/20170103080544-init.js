'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /**
     * Create table Roles
     */
    queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  /**
     * Create table Tokens
     */
    queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      acceptToken: {
        allowNull: false,
        type: Sequelize.STRING
      },
      refreshToken: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expired: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isSignedOut: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    /**
     * Create table UserRoles
     */
    queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      roleId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    /**
     * Create table Users
     */
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      digitCodeHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      saltDigitCodeHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  down: function (queryInterface, Sequelize) {   
    queryInterface.dropTable('Roles');   
    queryInterface.dropTable('UserRoles');
    queryInterface.dropTable('Users');
  }
};