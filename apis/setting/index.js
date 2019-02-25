'use strict';

let express = require('express');
let controller = require('./setting.controller');
let handleLogin = require('../../module/util/handleLogin')

let router = express.Router();
// 登录
router.post('/update', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.update(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});
// 根据Id查询指定数据
router.get('/getConfig', function(req, res, next){
  handleLogin.loseEfficacy(req).then(() => {
    controller.getConfig(req, res, next)
  }).catch( e => {
    res.send(e)
  })
});

module.exports = router;