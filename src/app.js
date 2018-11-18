const express = require('express')
const cors = require('cors')
const app = express()

global.wrap = fn => (...args) => {
  const functionReturnVal = fn(...args)

  const isPromise = typeof functionReturnVal.catch !== 'undefined'
  if (isPromise) {
    functionReturnVal.catch(args[2])
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.error(err.message)
  res.header('Access-Control-Allow-Origin', '*')
  res.status(500).send('Server error')
  next(err)
}

module.exports = function () {
  process.on('unhandledRejection', (reason, p) => {
    console.log(reason.stack, p)
    console.error('Unhandled Rejection at: Promise' + p + 'reason:' + reason.stack)
  // application specific logging, throwing an error, or other logic here
  })

  // Allows use to catch exceptions inside promises when used in express controllers
  // see https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/

  app.use(cors())
  require('./controllers')(app)
  app.use(errorMiddleware)

  return app
}
