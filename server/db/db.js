const Sequelize = require("sequelize")
// const pkg = require("../../package.json")

const databaseName = "recipe-app"

//NOTE: check back on what this is
const config = {
  logging: false
};

if(process.env.LOGGING === "true"){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
//this is not a secure longterm solution
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)

test_connection = async function () {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test_connection()

module.exports = db


