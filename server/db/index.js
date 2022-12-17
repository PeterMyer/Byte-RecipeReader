const db = require('./db')
const Image = require('./models/Image')
const Recipe = require('./models/Recipe')
const Component = require('./models/Component')
const Ingredient = require('./models/Ingredient')
const MeasurementQuantity = require('./models/MeasurementQuantity')
const MeasurementUnit = require('./models/MeasurementUnit')
const RecipeComment = require('./models/RecipeComment')
const RecipeIngredient = require('./models/RecipeIngredient')
const RecipeNutrition = require('./models/recipeNutrition')

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient});
Recipe.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Recipe);
Ingredient.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Ingredient);

Ingredient.belongsTo(Component,{foreignKey: 'componentId'})
Component.hasMany(Ingredient,{foreignKey: 'componentId'})

Ingredient.belongsTo(MeasurementQuantity,{foreignKey: 'measurementQuantityId'})
MeasurementQuantity.hasMany(Ingredient,{foreignKey: 'measurementQuantityId'})

Ingredient.belongsTo(MeasurementUnit,{foreignKey: 'measurementUnitId'})
MeasurementUnit.hasMany(Ingredient,{foreignKey: 'measurementUnitId'})

Ingredient.belongsTo(RecipeComment,{foreignKey: 'recipeCommentId'})
RecipeComment.hasMany(Ingredient,{foreignKey: 'recipeCommentId'})

Recipe.hasOne(RecipeNutrition,{foreignKey: 'recipeId'})
RecipeNutrition.belongsTo(Recipe,{foreignKey: 'recipeId'})

Recipe.belongsTo(Image,{foreignKey: 'profileId'})
Image.hasOne(Recipe,{foreignKey: 'profileId'})

module.exports = {
  db,
  models:{
    Image,
    Recipe,
    Component,
    Ingredient,
    MeasurementQuantity,
    MeasurementUnit,
    RecipeComment,
    RecipeIngredient,
    RecipeNutrition
  }
  }
