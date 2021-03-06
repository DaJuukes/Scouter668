module.exports = (mongoose) => {
  let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
  let dbName = 'data_' + process.env.DB_NAME + '_' + env

  if (env === 'development') {
    mongoose.set('debug', true)
  }

  mongoose.set('useCreateIndex', true)

  return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`, { useNewUrlParser: true })
}
