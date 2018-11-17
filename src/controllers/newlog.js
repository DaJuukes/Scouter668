const express = require('express')
const router = express.Router()
const models = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.post(`/`, wrap(async function (req, res, next) {
  /* TODO: ADD AUTHENTICATION */
  let { team, text, author } = req.body
  if (!team || !text || !author) return res.status(400).end('Missing data.')
  else {
    // Validate data
    if (!models.Log.validateData(team, author, text)) return res.status(400).end('Invalid data.')

    const log = new models.Log({ team, author, text })

    log.save((err, doc) => {
      if (err) return res.status(500).send({ error: err.message }).end()
      else return res.status(200).end()
    })
  }
}))

module.exports = router
