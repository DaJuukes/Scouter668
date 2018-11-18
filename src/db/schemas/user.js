const mongoose = require('mongoose')

let s = {
  name: 'User',
  schema: new mongoose.Schema({
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  })
}

// TODO ADD HASHING

s.schema.statics.validateData = function (username, password) {
  if (!username || !password) return 'Invalid data'
  else if (username.length === 0 || username.length > 10) return 'Username length invalid'
  else if (password.length < 1 || password.length > 15) return 'Password length invalid'
  else return null
}

module.exports = mongoose.model(s.name, s.schema)
