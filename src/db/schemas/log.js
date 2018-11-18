const mongoose = require('mongoose')

let s = {
  name: 'Log',
  schema: new mongoose.Schema({
    team: {
      type: Number
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String
    }
  })
}

s.schema.statics.validateData = function (team, author, text) {
  if (!team || isNaN(team) || team < 0 || team > 9999) return 'Invalid team number'
  else if (!author) return 'Invalid author'
  else if (!text || text.length < 1 || text.length > 5000) return 'Invalid text length'
  else return null
}

module.exports = mongoose.model(s.name, s.schema)
