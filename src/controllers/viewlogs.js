const express = require('express')
const router = express.Router()
const models = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.get(`/`, wrap(async function (req, res, next) {
  /* TODO: ADD AUTHENTICATION */
  let { team } = req.headers
  if (!team) return res.status(400).end('Missing data')

  return models.Log.find({ team }).populate('author').exec((err, logs) => {
    if (err) return res.status(500).end(err.message)
    return res.status(200).send(logs.map(l => { // TODO make cleaner
      return {
        _id: l._id,
        team: l.team,
        author: l.author.username,
        text: l.text
      }
    }))
  })
}))

module.exports = router
