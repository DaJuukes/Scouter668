const path = require('path')
global.srcRoot = path.resolve(__dirname)

const dotenv = require('dotenv')
dotenv.config({ path: './env/.env' })

const app = require('./src/app')()
const mongoose = require('mongoose')
const setupDatabase = require('./src/db/setup')

const runHttpServer = () => {
  return app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT + '...'))
}

const main = async () => {
  await setupDatabase(mongoose)
  try {
    return runHttpServer()
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
}

main()
