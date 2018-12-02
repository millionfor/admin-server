'use strict';

let express = require('express');
let controller = require('./qn.controller');

let router = express.Router();
// 更新配置
router.post('/update', controller.update);
// 获取配置信息
router.get('/getConfig', controller.getConfig);

module.exports = router;