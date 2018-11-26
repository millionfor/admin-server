'use strict';

let express = require('express');
let controller = require('./setting.controller');

let router = express.Router();
// 登录
router.post('/update', controller.update);
// 根据Id查询指定数据
router.get('/findById', controller.findById);

module.exports = router;