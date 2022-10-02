const db = require('./db')
const Image = require('./models/Image')
const Recipe = require('./models/Recipe')

module.exports = {
  db,
  models:{
    Image,
    Recipe}
  }
