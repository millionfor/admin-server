
let Util = {}

/**
 * 获取当前时间
 */
Util.Date = () => {
  return new Date()
}

/**
 * 验证某个字段是否存在
 */
Util.validationField = (o) => {
  let param = {
    model:o.model,
    field:o.field,
    value:o.value
  }
  return new Promise((resolve,reject) => {
    param.model.find({[param.field]: param.value}).exec((err, doc) => {
      if (doc.length) {
        reject(false)
      }else{
        resolve(true)
      }
    })
  })
}

module.exports = Util;