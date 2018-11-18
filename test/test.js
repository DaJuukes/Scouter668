let chai = require('chai')
chai.should()
let chaiHttp = require('chai-http')
chai.use(chaiHttp)
let dotenv = require('dotenv')

dotenv.config({ path: './test/test.env' })

let server = require('../src/app.js')()
const mongoose = require('mongoose')
let setupDatabase = require('../src/db/setup')

let models = require('../src/db/')

const wipeDatabase = async () => {
  for (let model of Object.values(models)) {
    await model.collection.drop()
  }
  return Promise.resolve()
}

const files = require('./groups')(chai, server)

describe('Unit tests', () => {
  before(async () => {
    await setupDatabase(mongoose)
  })

  after(async () => {
    await wipeDatabase()
  })

  for (let file of files) {
    file(chai, server, models)
  }
})
