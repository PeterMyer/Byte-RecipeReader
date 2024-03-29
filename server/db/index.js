const db = require('./db');
const Image = require('./models/Image');
const Recipe = require('./models/Recipe');
const Component = require('./models/Component');
const Ingredient = require('./models/Ingredient');
const MeasurementQuantity = require('./models/MeasurementQuantity');
const MeasurementUnit = require('./models/MeasurementUnit');
const RecipeComment = require('./models/RecipeComment');
const RecipeIngredient = require('./models/RecipeIngredient');
const RecipeNutrition = require('./models/recipeNutrition');

const DefaultByteFoodItem = require('./models/DefaultByteFoodItem');
const FoodItemNutrition = require('./models/FoodItemNutrition');
const FoodItemNutritionMatch = require('./models/FoodItemNutritionMatch');
const FoodItemMeasureOptions = require('./models/FoodItemMeasureOptions');
const UsdaFoodItem = require('./models/UsdaFoodItem');
const userFoodItem = require('./models/UserFoodItem');

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

Recipe.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Recipe);

Ingredient.hasMany(RecipeIngredient);
RecipeIngredient.belongsTo(Ingredient);

Ingredient.belongsTo(Component, { foreignKey: 'componentId' });
Component.hasMany(Ingredient, { foreignKey: 'componentId' });

Ingredient.belongsTo(MeasurementQuantity, {
  foreignKey: 'measurementQuantityId',
});
MeasurementQuantity.hasMany(Ingredient, {
  foreignKey: 'measurementQuantityId',
});

Ingredient.belongsTo(MeasurementUnit, { foreignKey: 'measurementUnitId' });
MeasurementUnit.hasMany(Ingredient, { foreignKey: 'measurementUnitId' });

Ingredient.belongsTo(RecipeComment, { foreignKey: 'recipeCommentId' });
RecipeComment.hasMany(Ingredient, { foreignKey: 'recipeCommentId' });

Recipe.hasOne(RecipeNutrition, { foreignKey: 'recipeId' });
RecipeNutrition.belongsTo(Recipe, { foreignKey: 'recipeId' });

Recipe.belongsTo(Image, { foreignKey: 'profileId' });
Image.hasOne(Recipe, { foreignKey: 'profileId' });

Component.belongsToMany(FoodItemNutrition, { through: FoodItemNutritionMatch });
FoodItemNutrition.belongsToMany(Component, { through: FoodItemNutritionMatch });

FoodItemNutrition.hasOne(UsdaFoodItem);
UsdaFoodItem.belongsTo(FoodItemNutrition);

FoodItemNutrition.hasOne(userFoodItem);
userFoodItem.belongsTo(FoodItemNutrition);

FoodItemNutrition.hasOne(DefaultByteFoodItem);
DefaultByteFoodItem.belongsTo(FoodItemNutrition);

FoodItemNutrition.hasOne(FoodItemMeasureOptions, {
  foreignKey: 'foodItemNutritionId',
});
FoodItemMeasureOptions.belongsTo(FoodItemNutrition, {
  foreignKey: 'foodItemNutritionId',
});

// RecipeIngredient.hasOne(FoodItemNutrition, { foreignKey: 'foodItemNutritionId' });
// FoodItemNutrition.belongsTo(RecipeIngredient, { foreignKey: 'foodItemNutritionId' });

module.exports = {
  db,
  models: {
    Image,
    Recipe,
    Component,
    Ingredient,
    MeasurementQuantity,
    MeasurementUnit,
    RecipeComment,
    RecipeIngredient,
    RecipeNutrition,
    FoodItemNutrition,
    FoodItemNutritionMatch,
    FoodItemMeasureOptions,
  },
};
