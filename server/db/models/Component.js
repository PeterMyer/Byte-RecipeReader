const Sequelize = require('sequelize');
const db = require('../db');

const Component = db.define('component', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
});

module.exports = Component;
