'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SettingSchema = new Schema({
  id:{ type : Number, index: { unique: true } },
  name: {type: String, required: true},
  gender: {type: String, default:'1'},
  email: {type: String,required: true },
  qq: {type: String, },
  wechat: {type: String, },
  weibo: {type: String, },
  address: {type: String, },
  poco: {type: String, },
  wangyi: {type: String,},
  createTime:{type: Date},
  updateTime:{type: Date},
})


let Setting = mongoose.model('Setting',SettingSchema,'sy_setting');

module.exports = Setting;