'use strict'

let mongoose = require('mongoose');
let Qn = mongoose.model('Qn');
let Util = require('../../module/util')
var get_ip = require('ipware')().get_ip;

// 更新admin用户信息
exports.update = function(req, res, next) {
  let setParam = {
    access_key: req.body.accessKey,
    secret_key: req.body.secretKey,
    bucket: req.body.bucket,
    origin: req.body.origin,
    updateTime: Util.Date(),
  }
  Qn.update({id:1}, {$set: setParam}, {multi: true, upsert: true}, function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code:0,
        msg:'设置七牛云配置成功！',
        data:{}
      })
    }
  });

}

// 查询单条数据
exports.getConfig = function (req, res, next) {

  let ip_info = get_ip(req);
  console.log(ip_info.clientIp)

  Qn.find({id: 1}).exec(function (err, result) {
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