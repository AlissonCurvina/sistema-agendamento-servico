const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = {
  username: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  }
}

const User = mongoose.model('user', userSchema)

module.exports = User