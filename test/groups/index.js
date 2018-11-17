module.exports = function () {
  let f = require('fs').readdirSync(`./test/groups`)
  let arr = []
  f.forEach((f) => {
    if (f === 'index.js') return
    try {
      let file = require(`./${f}`)
      arr.push(file)
    } catch (e) {
      console.error(`Error loading ${f}:  ${e.stack}`)
    }
  })
  return arr
}
