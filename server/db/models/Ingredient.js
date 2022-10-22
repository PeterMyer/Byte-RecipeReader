const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient',{
  id:{
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4
  },
  normText: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  componentId:{
    type:Sequelize.INTEGER,
  },
  measurementQuantityId:{
    type:Sequelize.INTEGER,
  },
  measurementUnitId:{
    type:Sequelize.INTEGER,
  },
  recipeCommentId:{
    type:Sequelize.INTEGER,
  }}
)

module.exports = Ingredient;
