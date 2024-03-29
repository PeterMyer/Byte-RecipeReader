const Sequelize = require("sequelize")
const db = require("../db")

const Image = db.define("image",{
  filepath:{
    type: Sequelize.STRING,
    allownull: false,
    validate:{
      notEmpty: true,
    },
    unique: true
  },
  userId:{
    type: Sequelize.TEXT,
    allownull: false
  },
  fileName:{
    type: Sequelize.STRING
  }
})

module.exports = Image;
