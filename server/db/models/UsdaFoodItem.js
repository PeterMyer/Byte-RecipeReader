const Sequelize = require('sequelize');
const db = require('../db');

const UsdaFoodItem = db.define('usdaFoodItem', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  foodItemNutritionId: {
    type: Sequelize.UUID,
  },
});

module.exports = UsdaFoodItem;
