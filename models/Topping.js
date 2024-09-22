const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Topping = sequelize.define('Topping', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Topping;
