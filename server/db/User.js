const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')

const SALT_ROUNDS = 5

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  githubId: {
    type: Sequelize.STRING
  }
})

User.prototpye.correctPassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password)
}

User.prototpye.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

User.authenticate = async function({ username, password }){
  const user = await this.findOne({where: { username }})
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPK(id)
    if(!user) {
      throw 'noooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}


//hooks

const hashPassword = async(user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

module.exports = User
