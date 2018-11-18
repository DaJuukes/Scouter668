const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.post(`/`, wrap(async function (req, res, next) {
  throw new Error('Error tester')
}))

module.exports = router
