let mongoose = require('mongoose');
let dbURL = require('../../config/config')
let autoIncrement = require('mongoose-auto-increment-fix');
let connection = mongoose.createConnection(dbURL);

autoIncrement.initialize(connection)

module.exports = autoIncrement;