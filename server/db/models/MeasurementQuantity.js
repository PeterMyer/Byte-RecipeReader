const Sequelize = require('sequelize')
const db = require('../db')

const Component = db.define('measurementQuantity',{
    qtyAmount:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  }
})

module.exports = Component;
