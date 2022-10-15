const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient',{
  componentId:{
    type:Sequelize.INTEGER,
    allowNull: false
  },
  recipeId:{
    type:Sequelize.INTEGER,
    allowNull: false
  },
  quantity:{
    type:Sequelize.STRING,
    allowNull: false,
    defaultValue: "1"
  },
  unit:{
    type:Sequelize.STRING,
  },
  comment:{
    type:Sequelize.STRING,
    allowNull: true
  },
  originalText:{
    type:Sequelize.STRING,
    allowNull: false
  }
  }
)

module.exports = Ingredient;
