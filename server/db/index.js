const db = require('./db')
const Image = require('./models/Image')
const Recipe = require('./models/Recipe')
const Component = require('./models/Component')
const Ingredient = require('./models/Ingredient')

Recipe.hasMany(Ingredient, { foreignKey: 'recipeId'})
Ingredient.belongsTo(Recipe,{ foreignKey: 'recipeId'})

Ingredient.belongsTo(Component,{foreignKey: 'componentId'})
Component.hasMany(Ingredient,{foreignKey: 'componentId'})


module.exports = {
  db,
  models:{
    Image,
    Recipe,
    Component,
    Ingredient
  }
  }
