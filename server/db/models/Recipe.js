const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe',{
  name:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  servings:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  instructions:{
    type: Sequelize.STRING,
    allowNull:true,
  }

  }
)

module.exports = Recipe;
