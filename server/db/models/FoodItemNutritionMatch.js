const Sequelize = require('sequelize');
const db = require('../db');

const FoodItemNutritionMatch = db.define('foodItemNutritionMatch', {
  userId: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  recipeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = FoodItemNutritionMatch;
