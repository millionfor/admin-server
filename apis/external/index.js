'use strict';

let express = require('express');
let controller = require('./external.controller');
let router = express.Router();

// 获取分类列表接口
router.get('/classifysList', controller.classifysList);

// 获取热门推荐和banner图
router.get('/hotIndex', controller.hotIndex);

// 获取config
router.get('/getConfig', controller.getConfig);

// 根据分类获取列表
router.get('/photoList', controller.photoList);

// 获取照片详情
router.get('/photoDetails', controller.photoDetails);

module.exports = router;
