module.exports = function (chai, server, models) {
  describe('Logs', () => {
    describe('/POST newlog', () => {
      describe('Fail conditions', () => {
        before(async () => {
          await models.User.create({ username: 'test', password: 'test' })
        })

        after(async () => {
          await models.Log.deleteMany({})
          await models.User.deleteMany({})
        })

        it('it should fail to create a new log without any data', (done) => {
          chai.request(server)
            .post('/newlog')
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(400)
              res.text.should.be.a('string')
              res.text.should.equal('Missing data')
              done()
            })
        })

        it('it should fail to create a new log without a team', (done) => {
          chai.request(server)
            .post('/newlog')
            .send({ author: 'test', text: 'test' })
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(400)
              res.text.should.be.a('string')
              res.text.should.equal('Missing data')
              done()
            })
        })

        it('it should fail to create a new log without a author', (done) => {
          chai.request(server)
            .post('/newlog')
            .send({ team: 668, text: 'test' })
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(400)
              res.text.should.be.a('string')
              res.text.should.equal('Missing data')
              done()
            })
        })

        it('it should fail to create a new log without a text', (done) => {
          chai.request(server)
            .post('/newlog')
            .send({ team: 668, author: 'test' })
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(400)
              res.text.should.be.a('string')
              res.text.should.equal('Missing data')
              done()
            })
        })

        describe('Success conditions', () => {
          it('it should succeed creating a new log', (done) => {
            chai.request(server)
              .post('/newlog')
              .send({ team: 668, author: 'test', text: 'test' })
              .end((err, res) => {
                if (err) throw err
                res.should.have.status(200)
                done()
              })
          })
        })
      })
    })

    describe('/GET viewlogs', () => {
      describe('Fail conditions', () => {
        before(async () => {
          let user = await models.User.create({ username: 'test', password: 'test' })
          await models.Log.create({ author: user._id, team: 668, text: 'test' })
        })

        after(async () => {
          await models.Log.deleteMany({})
          await models.User.deleteMany({})
        })

        it('it should fail to create a new log without any data', (done) => {
          chai.request(server)
            .get('/viewlogs')
            .end((err, res) => {
              if (err) throw err
              res.should.have.status(400)
              res.text.should.be.a('string')
              res.text.should.equal('Missing data')
              done()
            })
        })

        describe('Success conditions', () => {
          it('it should succeed receiving logs', (done) => {
            chai.request(server)
              .get('/viewlogs')
              .set('team', 668)
              .end((err, res) => {
                if (err) throw err
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.length.should.equal(1)
                res.body[0].author.should.equal('test')
                res.body[0].team.should.equal(668)
                res.body[0].text.should.equal('test')
                done()
              })
          })
        })
      })
    })
  })
}
