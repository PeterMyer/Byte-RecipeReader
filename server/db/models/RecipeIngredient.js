const Sequelize = require('sequelize');
const db = require('../db');

const RecipeIngredient = db.define('recipeIngredient', {
  text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  calculatedNutrition: {
    type: Sequelize.JSON,
  },
});

module.exports = RecipeIngredient;
