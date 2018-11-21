'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();
// 登录
router.post('/login', controller.userLogin);
// 退出
router.get('/logout', controller.logOut);

module.exports = router;