'use strict';

let express = require('express');
let controller = require('./classifys.controller');
let router = express.Router();

// 增加
router.post('/save', controller.save);
// 根据Id查询指定数据
router.get('/findById', controller.findById);
// 查询集合所有数据
router.get('/list', controller.list);

module.exports = router;