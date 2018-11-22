
let autoIncrement = require('mongoose-auto-increment-fix');

let Util = {}

/**
 * 自增长id
 * ！！！切记表里必须要有一条数据作为基础数据
 * ！！！主键id(identitycounters)要大于集合最后一条记录的id数
 */
Util.countedId = (o) => {
  let param = {
    schema:o.schema,
    model:o.model,
    field:o.field
  }
  param.schema.index({ name:1}, { unique: true });
  param.schema.index({ id:1 }, { unique: true });
  //下面用自增插件，实现id的自增功能
  param.schema.plugin(autoIncrement.plugin, {
    model: param.model,
    field: param.field,
    startAt: 1,
    incrementBy: 1
  });
}

/**
 * 获取当前时间
 */
Util.Date = () => {
  return Date.parse(new Date())
}


module.exports = Util;