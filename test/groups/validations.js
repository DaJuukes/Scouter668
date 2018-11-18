module.exports = function (chai, server, models) {
  const User = models.User
  const Log = models.Log

  describe('Validations', () => {
    describe('User schema', () => {
      describe('Validation failures', () => {
        it('Should filter the null username', (done) => {
          let result = User.validateData('', 'test')
          result.should.equal('Invalid data')
          done()
        })

        it('Should filter the null password', (done) => {
          let result = User.validateData('test', '')
          result.should.equal('Invalid data')
          done()
        })

        it('Should filter the null both', (done) => {
          let result = User.validateData(null, null)
          result.should.equal('Invalid data')
          done()
        })

        it('Should filter the >15 length username', (done) => {
          let result = User.validateData('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'test')
          result.should.equal('Username length invalid')
          done()
        })

        it('Should filter the >15 length password', (done) => {
          let result = User.validateData('test', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
          result.should.equal('Password length invalid')
          done()
        })
      })
      describe('Validation successes', () => {
        it('Should accept valid credentials', (done) => {
          let result = User.validateData('test', 'test')
          chai.should().equal(result, null)
          done()
        })
      })
    })
    describe('Log schema', () => {
      describe('Validation failures', () => {
        it('Should filter the null team', (done) => {
          let result = Log.validateData(null)
          result.should.equal('Invalid team number')
          done()
        })

        it('Should filter the NaN team', (done) => {
          let result = Log.validateData('test')
          result.should.equal('Invalid team number')
          done()
        })

        it('Should filter the out-of-range team <0', (done) => {
          let result = Log.validateData(-1)
          result.should.equal('Invalid team number')
          done()
        })

        it('Should filter the out-of-range team >9999', (done) => {
          let result = Log.validateData(10000)
          result.should.equal('Invalid team number')
          done()
        })

        it('Should filter the null author', (done) => {
          let result = Log.validateData(5, null)
          result.should.equal('Invalid author')
          done()
        })

        it('Should filter the out-of-range text <0', (done) => {
          let result = Log.validateData(5, true, '')
          result.should.equal('Invalid text length')
          done()
        })

        it('Should filter the out-of-range text >5000', (done) => {
          let result = Log.validateData(5, true, { length: 10000 }) // not about to put 5k chars
          result.should.equal('Invalid text length')
          done()
        })
      })
      describe('Validation successes', () => {
        it('Should accept valid credentials', (done) => {
          let result = Log.validateData(668, 'test', 'test')
          chai.should().equal(result, null)
          done()
        })
      })
    })
  })
}
