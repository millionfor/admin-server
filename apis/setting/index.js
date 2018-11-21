'use strict';

let express = require('express');
let controller = require('./setting.controller');

let router = express.Router();
// 登录
router.post('/saveUserInfo', controller.setUserInfo);

module.exports = router;