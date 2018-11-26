'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../module/util')

let PhotosSchema = new Schema({
  photos_id:{ type : Number, index: { unique: true } },
  photos_title: {type: String, },
  photos_classifys: {type: String},
  photos_hot: {type: Boolean},
  photos_path_name: {type: Array,required: true },
  photos_desc: {type: String},
  createTime:{type: Date},
  updateTime:{type: Date},
})

Util.countedId({
  schema:PhotosSchema,
  model: 'PhotosSchema',
  field: 'photos_id',
})


let Photos = mongoose.model('Photos',PhotosSchema,'sy_photos');

module.exports = Photos;