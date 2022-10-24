const Sequelize = require('sequelize')
const db = require('../db')

const RecipeNutrition = db.define('recipeNutrition',{
    nutritionData:{
        type: Sequelize.JSON,
        allowNull: true,
  }
})

module.exports = RecipeNutrition;
