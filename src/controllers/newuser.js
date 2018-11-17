const express = require('express')
const router = express.Router()
const models = require('../db')
const uuid = require('uuid')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

/* This is the only time the client interacts for pot games
*  Sends all current game data
*/

router.post(`/`, wrap(async function (req, res, next) {
  const username = (req.headers.username || req.body.username)
  const password = (req.headers.password || req.body.password)
  if (!username || !password) {
    res.end('missing credentials')
  } else {
    let v = uuid.v4()
    let user = new models.User({ username: username, password: password, token: v, balance: '0', address: Math.random().toString() }) // for now TODO

    user.save((err, doc) => {
      if (err) res.status(500).send({ error: err.message }).end()
      else res.send({ token: v, username: user.username, balance: user.balance.toString() })
    })
  }
}))

module.exports = router
