'use strict';

let express = require('express');
let controller = require('./classifys.controller');
let router = express.Router();

// 创建
router.post('/create', controller.create);

// 更新
router.post('/update', controller.update);

// 删除
router.post('/delete', controller.delete);

// 根据Id查询指定数据
router.post('/findById', controller.findById);

// 查询集合所有数据
router.get('/list', controller.list);

module.exports = router;