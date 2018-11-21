'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../util')

let ClassifysSchema = new Schema({
  classifys_id:Util.countedId(),
  classifys_cn_name: {type: String, required: true},
  classifys_en_name: {type: String, required: true},
  classifys_desc: {type: String},
  updateTime:{type: Date},
})

let Classifys = mongoose.model('Classifys',ClassifysSchema,'sy_classifys');

module.exports = Classifys;