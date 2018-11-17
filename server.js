const path = require('path')
global.srcRoot = path.resolve(__dirname)

const app = require('./app')
const mongoose = require('mongoose')

const setupDatabase = () => {
  let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
  let dbName = 'data_' + env

  if (env === 'development') {
    mongoose.set('debug', true)
  }

  return mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
}

const runHttpServer = () => {
  app.listen(3000, () => console.log('Listening on port 3000..'))
}

const main = async () => {
  await setupDatabase()
  try {
    runHttpServer()
  } catch (e) {
    console.error(e)
    process.exit(0)
  }
}

main()
