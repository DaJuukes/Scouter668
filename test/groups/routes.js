const sinon = require('sinon')
const rewire = require('rewire')

module.exports = function (chai, server, models) {
  describe('Routes', () => {
    describe('Generic errors', () => {
      describe('During-route error', () => {
        it('should catch the error thrown', (done) => {
          let stub = sinon.stub(console, 'log')
          let newServer = rewire('../../src/app')
          stub.restore()

          let mock = sinon.mock(console)
          mock.expects('error').once().withArgs('Error tester')

          newServer.__set__('console', console)

          chai.request(newServer)
            .post('/errortest')
            .end((err, res) => {
              mock.verify()
              mock.restore()
              if (err) console.error(err)
              res.text.should.equal('Server error')
              res.statusCode.should.equal(500)
              done()
            })
        })
      })
    })
  })
}
