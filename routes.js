'use strict'

module.exports = function(app) {
	app.use('/syApi/users', require('./apis/users'));
	app.use('/syApi/setting', require('./apis/setting'));
	app.use('/syApi/classifys', require('./apis/classifys'));
	app.use('/syApi/photos', require('./apis/photos'));
	app.use('/syApi/qn', require('./apis/qn'));
	app.use('/syApi/users', require('./apis/users'));
	// 对外接口不需要过验证
	app.use('/syApi/external', require('./apis/external'));
}
