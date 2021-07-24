'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      dni: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      token:{
        type: Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};