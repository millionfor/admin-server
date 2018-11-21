'use strict';

let express = require('express');
let controller = require('./users.controller');

let router = express.Router();
// 登录
router.post('/login', controller.login);
// 退出
router.get('/logout', controller.logout);

module.exports = router;