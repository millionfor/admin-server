'use strict';

let express = require('express');
let router = express.Router();
let controller = require('./photos.controller');
let handleLogin = require('../../module/util/handleLogin')

// 增加
router.post('/create', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.create(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 更新
router.post('/update', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.update(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 查询集合所有数据
router.get('/list', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.list(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 删除
router.post('/delete', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.delete(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 根据Id查询指定数据
router.post('/findById', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.findById(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 上传图片
router.post('/uploadPictures', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.uploadPictures(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

// 删除图片
router.post('/deletePictures', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.deletePictures(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

module.exports = router;