'use strict'

module.exports = function(app) {
	app.use('/syApi/users', require('./apis/users'));
	app.use('/syApi/setting', require('./apis/setting'));
}