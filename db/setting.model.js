'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let counter = 1;
let CountedId = {type: Number, default: () => counter++};

let SettingSchema = new Schema({
  id:CountedId,
  name: {type: String, required: true},
  gender: {type: [Number], default:0},
  email: {type: String,required: true },
  qq: {type: String, },
  wechat: {type: String, },
  weibo: {type: String, },
  address: {type: String, },
  poco: {type: String, },
  wangyi: {type: String,},
  updateTime:{type: Date},
})


let Setting = mongoose.model('Setting',SettingSchema,'sy_setting');

module.exports = Setting;