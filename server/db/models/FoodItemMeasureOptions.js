const Sequelize = require('sequelize');
const db = require('../db');

const FoodItemMeasureOptions = db.define('foodItemMeasureOptions', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  foodItemNutritionId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  options: {
    type: Sequelize.JSON,
    allowNull: true,
  },
});

module.exports = FoodItemMeasureOptions;
