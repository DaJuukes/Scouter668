const mongoose = require('mongoose')
const sinon = require('sinon')
const rewire = require('rewire')

module.exports = function (chai, server, models) {
  describe('Setup', () => {
    describe('Database setup', () => {
      it('should set debug to true', () => {
        process.env.NODE_ENV = 'development'
        let mock = sinon.mock(mongoose)
        let setupDatabase = require('../../src/db/setup')

        mock.expects('set').withArgs('debug', true)
        mock.expects('set').withArgs('useCreateIndex', true)
        mock.expects('connect').once().withArgs(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/data_scouter_development`, { useNewUrlParser: true })
        setupDatabase(mongoose)
        mock.restore()
        mock.verify()
      })

      it('should NOT set debug to true', () => {
        process.env.NODE_ENV = 'test'
        let mock = sinon.mock(mongoose)
        let setupDatabase = require('../../src/db/setup')

        mock.expects('set').atMost(1)
        mock.expects('set').withArgs('useCreateIndex', true)
        mock.expects('connect').once().withArgs(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/data_scouter_test`, { useNewUrlParser: true })
        setupDatabase(mongoose)
        mock.restore()
        mock.verify()
      })
    })
    describe('App setup', () => {
      it('should handle a promise rejeciton', (done) => {
        let stub1 = sinon.stub(console, 'log')
        const setupApp = rewire('../../src/app')


        let err = { stack: 'test' }
        let pe = 'test'

        let mock = sinon.mock(console)
        mock.expects('error').atLeast(1)

        setupApp.__set__('console', console)

        setupApp()

        process.emit('unhandledRejection', err, pe)

        mock.verify()
        mock.restore()
        stub1.restore()
        done()
      })
    })
  })
}
