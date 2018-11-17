const { readdirSync } = require('fs')

let names = readdirSync('./src/db/schemas')
let models = {}

names.forEach(n => {
  let model = require('./schemas/' + n)
  models[model.modelName] = model

  console.log(`Loaded ${model.modelName} schema.`)
})

module.exports = models
