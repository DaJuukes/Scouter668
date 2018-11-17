const express = require('express')
const router = express.Router()
const models = require('../db')
const bodyParser = require('body-parser')

router.use(bodyParser.json()) // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.post(`/`, wrap(async function (req, res, next) {
  /* TODO: ADD AUTHENTICATION */
  let { team, text, author } = req.body
  if (!team || !text || !author) return res.status(400).end('Missing data')
  // Validate data
  let authorUser = await models.User.findOne({ username: author })
  let notValid = models.Log.validateData(team, authorUser, text)
  if (notValid) return res.status(400).end(notValid)

  const log = new models.Log({ team, author: authorUser._id, text })

  log.save((err, doc) => {
    if (err) return res.status(500).end(err.message)
    else return res.status(200).end('Success')
  })
}))

module.exports = router
