'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../module/util')

let PhotosSchema = new Schema({
  photos_id:{ type : Number, index: { unique: true } },
  photos_name: {type: String, },
  photos_classify: {type: String},
  photos_path_name: {type: String},
  photos_desc: {type: String},
  updateTime:{type: Date},
})

Util.countedId({
  schema:PhotosSchema,
  model: 'PhotosSchema',
  field: 'photos_id',
})


let Photos = mongoose.model('Photos',PhotosSchema,'sy_photos');

module.exports = Photos;