const mongoose = require('mongoose')

let s = {
  name: 'Log',
  schema: new mongoose.Schema({
    team: {
      type: Number,
      unique: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId
    },
    text: {
      type: String
    }
  })
}

s.schema.statics.validateData = function (team, author, text) {
  if (isNaN(team) || team < 0 || team > 9999) return false
  else if (author.length === 0 || author.length > 10) return false
  else if (text.length < 1 || text.length > 5000) return false
  else return true
}

module.exports = mongoose.model(s.name, s.schema)
