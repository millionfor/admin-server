'use strict'
let _ = require('lodash')

let external = {}

external.handleResult = function (result) {
  let data = JSON.parse(JSON.stringify(result))
  return _.map(data , (v,i) => {
    let o = _.find(v.photos_path, ['sort',v.photos_cover])
    v = _.assign(v, {
      imageView:o && o['imgInfo']['imageView'] || ''
    });
    return v
  })
}

module.exports = external
