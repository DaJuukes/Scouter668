module.exports = function (chai, server, models) {
  describe('Users', () => {
    describe('/POST newuser', () => {
      describe('Fail conditions', () => {
        before(async () => {
          await models.User.create({ username: 'test', password: 'test' })
        })

        after(async () => {
          await models.User.deleteMany({})
        })

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

        it('it should fail to create a new user when the user already exists', (done) => {
          chai.request(server)
            .post('/newuser')
            .set('username', 'test')
            .set('password', 'test')
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(401)
              res.text.should.be.a('string')
              res.text.should.equal('User already exists')
              done()
            })
        })
      })

      describe('Success conditions', () => {
        it('it should succeed creating a new user', (done) => {
          chai.request(server)
            .post('/newuser')
            .set('username', 'test')
            .set('password', 'test')
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(200)
              done()
            })
        })
      })
    })
  })
}
