const Sequelize = require("sequelize")
const db = require("../db")

const RecipeIngredient = db.define("recipeIngredient",{
    text:{
        type: Sequelize.STRING,
        allowNull: true,
  }
})

module.exports = RecipeIngredient;
