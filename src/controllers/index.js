module.exports = function (r) {
  let f = require('fs').readdirSync(`./src/controllers`)
  f.forEach((f) => {
    if (f === 'index.js') return
    console.log(`Adding ${f} to routes...`)
    let file = require(`./${f}`)
    r.use(`/${f.split('.')[0]}/`, file)
  })
}
