'use strict'

let mongoose = require('mongoose');
let Setting = mongoose.model('Setting');
let codes = require('../../module/codes/index')
let Util = require('../../module/util')

// 更新admin用户信息
exports.saveUserInfo = function(req, res, next) {
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
      res.send(Object.assign(codes[202],{},{
        data:{}
      }))
    }
  });

  /*Setting.create({
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    qq: req.body.qq,
    wechat: req.body.wechat,
    weibo: req.body.weibo,
    address: req.body.address,
    poco: req.body.poco,
    wangyi: req.body.wangyi,
    updateTime: Date.parse(new Date()),
  }, function(err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: '用户名必填项',
        data:{}
      })
    }else{
      res.send(Object.assign(codes[202],{},{
        data:{}
      }))
    }
  })*/
}