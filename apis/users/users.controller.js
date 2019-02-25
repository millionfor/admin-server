'use strict'

let mongoose = require('mongoose');
let Users = mongoose.model('Users');
let md5 = require('md5');

// 登录
exports.login = function(req, res, next) {
	let userName = req.body.userName
	let password = req.body.password
  Users.find({'user_name': userName,user_password:password}).exec(function(err, doc) {
    if (doc.length) {
      req.session.user = userName
      res.send({
        data:doc[0],
        code:0,
        msg:'登录成功！'
      })
    }else{
      res.send({
        data:{},
        code:300,
        msg:'密码错误！'
      })
    }
	})
}

// 登出
exports.logout = function(req, res) {
  req.session.user = null
	res.send({
    code:0,
    data:{},
    msg:'登出成功'
  });
}

exports.userInfo = function (req, res) {
  Users.find({'user_name': req.session.user}).exec(function(err, doc) {
    if (doc.length) {
      res.send({
        data:doc[0],
        code:0,
        msg:'成功'
      })
    }else{
      res.send({
        data:{},
        code:299,
        msg:'失败'
      })
    }
  })
}
