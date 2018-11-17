let chai = require('chai')
chai.should()
let chaiHttp = require('chai-http')
let dotenv = require('dotenv')

dotenv.config({ path: './test/test.env' })

let server = require('../src/app.js')
let setupDatabase = require('../src/db/setup')

let models = require('../src/db/')

const wipeDatabase = async () => {
  for (let model of Object.values(models)) {
    await model.collection.drop()
  }
  return Promise.resolve()
}

chai.use(chaiHttp)
describe('Users', () => {
  before(async () => {
    await setupDatabase()
  })

  /*  after(async () => {
    await wipeDatabase()
  }) */

  describe('/POST newuser failures', () => {
    it('it should fail to create a new user without any data', (done) => {
      chai.request(server)
        .post('/newuser')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(401)
          res.text.should.be.a('string')
          res.text.should.equal('Missing credentials')
          done()
        })
    })

    it('it should fail to create a new user without a username', (done) => {
      chai.request(server)
        .post('/newuser')
        .set('password', 'test')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(401)
          res.text.should.be.a('string')
          res.text.should.equal('Missing credentials')
          done()
        })
    })

    it('it should fail to create a new user without a password', (done) => {
      chai.request(server)
        .post('/newuser')
        .set('username', 'test')
        .end((err, res) => {
          if (err) throw err
          res.should.have.status(401)
          res.text.should.be.a('string')
          res.text.should.equal('Missing credentials')
          done()
        })
    })
  })
})
