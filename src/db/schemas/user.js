const mongoose = require('mongoose')
const uuidUtil = require('uuid')

let s = {
  name: 'User',
  schema: new mongoose.Schema({
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    token: {
      type: String,
      unique: true
    }
  }) }

s.schema.statics.authUser = async function (token) {
  return new Promise(async (resolve, reject) => {
    let user = await this.findOne({ token: token })
    if (user != null) resolve(user)
    else resolve(false)
  })
}

s.schema.statics.loginUser = async function (data) {
  return new Promise((resolve, reject) => {
    this.findOne({ username: data.username, password: data.password }).then((u) => {
      if (!u) {
        resolve(false)
      } else {
        // create new UUID, persist, add it
        this.updateToken(data).then((user) => {
          resolve(user)
        }).catch(console.log)
      }
    })
  })
}

s.schema.statics.updateToken = function (data) {
  let key = uuidUtil.v4()
  return this.findOneAndUpdate({ username: data.username }, { token: key }, { new: true })
}

s.schema.statics.resolveToken = async function (token) {
  return new Promise(resolve => {
    console.log(token)
    let key = uuidUtil.v4()
    this.findOneAndUpdate({ token: token }, { token: key }, { new: true }).then(doc => {
      if (doc) resolve(key)
      else resolve(null)
    })
  })
}

module.exports = mongoose.model(s.name, s.schema)
