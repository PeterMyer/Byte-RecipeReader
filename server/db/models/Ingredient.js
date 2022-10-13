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
    allowNull: false
  },
  unit:{
    type:Sequelize.STRING,
    allowNull: false
  },
  comment:{
    type:Sequelize.STRING,
    allowNull: true
  },
  // originText:{
  //   type:Sequelize.STRING,
  //   allowNull: false
  // }
  }
)

module.exports = Ingredient;
