'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClassifysSchema = new Schema({
	user_name: {type: String, required: true},
  user_password: {type: String, required: true}
})

let Classifys = mongoose.model('Classifys',ClassifysSchema,'sy_classifys');

module.exports = Classifys;