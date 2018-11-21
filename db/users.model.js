'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Util = require('../util')


let UserSchema = new Schema({
  user_id:Util.countedId(),
	user_name: {type: String, required: true},
  user_password: {type: String, required: true}
})

let Users = mongoose.model('Users',UserSchema,'sy_users');

module.exports = Users;