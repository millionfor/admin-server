'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	user_name: {type: String, required: true},
  user_password: {type: String, required: true}
})

let Users = mongoose.model('Users',UserSchema,'sy_users');

module.exports = Users;