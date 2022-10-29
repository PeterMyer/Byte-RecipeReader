const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
    
  },
  name:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  servings:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  instructions:{
    type: Sequelize.JSON,
    allowNull:true,
  },
  source:{
    type: Sequelize.STRING,
    allowNull:true
  },
  profileId:{
    type: Sequelize.INTEGER,
    allowNull: true
  },
  userId:{
    type: Sequelize.TEXT,
    allowNull:false
  }}
)

module.exports = Recipe;
