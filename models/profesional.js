'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Profesional.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    dni: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profesional',
  });
  return Profesional;
};