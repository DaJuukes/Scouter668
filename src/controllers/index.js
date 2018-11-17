module.exports = function (r) {
  let f = require('fs').readdirSync(`./src/controllers`)
  console.log(f)
  f.forEach((f) => {
    if (f === 'index.js') return
    try {
      console.log(`Adding ${f} to routes...`)
      let file = require(`./${f}`)
      r.use(`/${f.split('.')[0]}/`, file)
    } catch (e) {
      console.error(`Error loading ${f}:  ${e.stack}`)
    }
  })
}
