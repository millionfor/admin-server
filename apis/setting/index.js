'use strict';

let express = require('express');
let controller = require('./setting.controller');

let router = express.Router();
// 登录
router.post('/saveUserInfo', controller.saveUserInfo);

module.exports = router;