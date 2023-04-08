const Sequelize = require('sequelize');
const db = require('../db');

const UserFoodItem = db.define('userFoodItem', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  userId: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  foodItemNutritionId: {
    type: Sequelize.UUID,
  },
});

module.exports = UserFoodItem;
