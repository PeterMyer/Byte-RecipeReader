const Sequelize = require("sequelize")
const db = require("../db")

const Component = db.define("measurementUnit",{
    unitDescription:{
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
    unitGrams:{
      type:Sequelize.REAL,
      allowNull:true
    }
})

module.exports = Component;
