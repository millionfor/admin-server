'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('../module/util/increment')

let PhotosSchema = new Schema({
  classifys_id:{type : Number,},
  classifys_en_name:{type : String,},
  classifys_cn_name:{type : String,},
  photos_id:{ type : Number, index: { unique: true } },
  photos_title: {type: String, },
  photos_classifys: {type: String},
  photos_recommended: {type: Boolean},
  photos_cover: {type: Number},
  photos_path: {type: Array,required: true },
  photos_desc: {type: String},
  createTime:{type: Date},
  updateTime:{type: Date},
})

// 子增长id
PhotosSchema.plugin(autoIncrement.plugin, 'Photos');

let Photos = mongoose.model('Photos',PhotosSchema,'sy_photos');

module.exports = Photos;