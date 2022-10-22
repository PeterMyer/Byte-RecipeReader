const Sequelize = require('sequelize')
const db = require('../db')

const Component = db.define('recipeComment',{
    commentText:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  }
})

module.exports = Component;
