const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = "recipe-reader"

//NOTE: check back on what this is
const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)

module.exports = db


