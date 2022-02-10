'use strict'

// eslint-disable-next-line
const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
  up: async (/** @type {QueryInterface} */queryInterface) => {
    await queryInterface.createTable('accounts', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      mothers_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    })
  },

  down: async (/** @type {QueryInterface} */queryInterface) => {
    await queryInterface.dropTable('accounts')
  }
}
