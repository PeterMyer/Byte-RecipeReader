const Sequelize = require("sequelize")
const db = require("../db")

const Component = db.define("userText",{
    text:{
    type: Sequelize.STRING,
    allowNull: true,
  }
})

module.exports = Component;
