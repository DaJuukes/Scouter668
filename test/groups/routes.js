const express = require('express')
module.exports = function (chai, server, models) {
  describe('Routes', () => {
    describe('Generic errors', () => {
      describe('During-route error', () => {
        /* before(() => {
          const router = express.Router()
          router.get('errorTest', (req, res) => {
            throw new Error()
          })
          server.use('/errorTest/', router)
        })

        it('should catch the error thrown', (done) => {
          chai.request(server)
            .get('errorTest')
            .end((err, res) => {
              console.log(err)
              console.log(res)
              done()
            })
        }) */
      })
    })
  })
}
