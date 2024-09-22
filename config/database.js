// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pizza_ordering_db', 'db_user', 'db_password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
