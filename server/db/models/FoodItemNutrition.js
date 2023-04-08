const Sequelize = require('sequelize');
const db = require('../db');

const FoodItemNutrition = db.define('foodItemNutrition', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nutrition: {
    type: Sequelize.JSON,
    allowNull: false,
  },

});

module.exports = FoodItemNutrition;
