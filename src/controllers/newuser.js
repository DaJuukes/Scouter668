const express = require('express')
const router = express.Router()
const models = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.post(`/`, wrap(async function (req, res, next) {
  const username = (req.headers.username || req.body.username)
  const password = (req.headers.password || req.body.password)
  if (!username || !password) {
    return res.status(401).end('Missing credentials')
  } else {
    if (await models.User.findOne({ username })) {
      return res.status(401).end('User already exists')
    }

    let user = new models.User({ username, password })

    user.save((err, doc) => {
      if (err) return res.status(401).end(err.message)
      else return res.status(200).end('Success')
    })
  }
}))

module.exports = router
