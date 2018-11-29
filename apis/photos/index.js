'use strict';

let express = require('express');
let controller = require('./photos.controller');
let router = express.Router();

// 增加
router.post('/create', controller.create);

// 查询集合所有数据
router.get('/list', controller.list);

// 删除
router.post('/delete', controller.delete);

// 根据Id查询指定数据
router.post('/findById', controller.findById);

module.exports = router;