'use strict';

let express = require('express');
let controller = require('./photos.controller');
let router = express.Router();

// 增加
router.post('/create', controller.create);

// 更新
router.post('/update', controller.update);

// 查询集合所有数据
router.get('/list', controller.list);

// 删除
router.post('/delete', controller.delete);

// 删除一张照片
router.post('/deleteOnePhoto', controller.deleteOnePhoto);

// 根据Id查询指定数据
router.post('/findById', controller.findById);

module.exports = router;