'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../util')

let SettingSchema = new Schema({
  id:Util.countedId(),
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