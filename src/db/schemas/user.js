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

module.exports = mongoose.model(s.name, s.schema)
