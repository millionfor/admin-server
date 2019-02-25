'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('../module/util/increment')

let ClassifysSchema = new Schema({
  classifys_id:{ type : Number, index: { unique: true } },
  classifys_cn_name: {type: String, required: true},
  classifys_en_name: {type: String, required: true},
  classifys_desc: {type: String},
  classifys_rank: {type: Number},
  createTime:{type: Date},
  updateTime:{type: Date},
})

// 子增长id
ClassifysSchema.plugin(autoIncrement.plugin, 'Classifys');

let Classifys = mongoose.model('Classifys',ClassifysSchema,'sy_classifys');

module.exports = Classifys;