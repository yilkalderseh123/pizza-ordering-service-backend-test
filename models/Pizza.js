const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pizza = sequelize.define('Pizza', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Pizza;
