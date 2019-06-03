'use strict'

let mongoose = require('mongoose');
let Setting = mongoose.model('Setting');
let Util = require('../../module/util')

// 更新admin用户信息
exports.update = function(req, res, next) {
  let setParam = {
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    qq: req.body.qq,
    wechat: req.body.wechat,
    weibo: req.body.weibo,
    address: req.body.address,
    poco: req.body.poco,
    wangyi: req.body.wangyi,
    updateTime: Util.Date(),
  }
  Setting.update({id:1}, {$set: setParam}, {multi: true, upsert: true}, function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code:0,
        msg:'设置用户信息成功！',
        data:{}
      })
    }
  });

}

// 查询单条数据
exports.getConfig = function (req, res, next) {
  Setting.find({id: 1}).exec(function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code: 0,
        msg: '成功',
        data:result[0]
      })
    }
  });
}

// 备份数据库
exports.backupMongodb = function (req, res, next) {
  res.send({
    code: 0,
    msg: 'backup',
    data:{}
  })
}