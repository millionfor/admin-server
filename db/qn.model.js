'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let QnSchema = new Schema({
  id:{ type : Number, index: { unique: true } },
  access_key: {type: String, required: true},
  secret_key: {type: String, required: true},
  bucket: {type: String, required: true},
  origin: {type: String, required: true},
  updateTime:{type: Date},
})


let Qn = mongoose.model('Qn',QnSchema,'sy_qn_config');

module.exports = Qn;