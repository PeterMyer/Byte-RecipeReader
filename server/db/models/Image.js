const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image',{
  filepath:{
    type: Sequelize.STRING,
    allownull: false,
    validate:{
      notEmpty: true,
    }
  }
})

module.exports = Image;
