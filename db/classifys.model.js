'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../module/util')

let ClassifysSchema = new Schema({
  classifys_id:{ type : Number, index: { unique: true } },
  classifys_cn_name: {type: String, required: true},
  classifys_en_name: {type: String, required: true},
  classifys_desc: {type: String},
  classifys_rank: {type: Number},
  createTime:{type: Date},
  updateTime:{type: Date},
})

Util.countedId({
  schema:ClassifysSchema,
  model: 'ClassifysSchema',
  field: 'classifys_id',
})

/*ClassifysSchema.index({ name:1}, { unique: true });
ClassifysSchema.index({ id:1 }, { unique: true });

//下面用自增插件，实现id的自增功能
ClassifysSchema.plugin(autoIncrement.plugin, {
  model: 'ClassifysSchema',
  field: 'classifys_id',
  startAt: 10000,
  incrementBy: 1
});*/

let Classifys = mongoose.model('Classifys',ClassifysSchema,'sy_classifys');

module.exports = Classifys;