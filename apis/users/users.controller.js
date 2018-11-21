'use strict'

let mongoose = require('mongoose');
let Users = mongoose.model('Users');
let md5 = require('md5');
let codes = require('../codes')

// 登录
exports.login = function(req, res, next) {
	let userName = req.body.userName
  Users.find({'user_name': userName}).exec(function(err, doc) {
    // 用户不存在
		if (doc === '') {
			res.send(Object.assign(codes[201],{},{
			  data:{}
      }));
		}else {
			if (doc[0].user_password === req.body.password) {
				req.session.isLogin = 1;
				req.session.username = userName;
				res.cookie('isLogin', '1', { expires: new Date(Date.now() + 10000 * 60 * 60 * 24 * 7), httpOnly: true });
				res.send({
          code:0,
          data:{},
          msg:'登录成功'
        });
			}else{
			  // 密码错误
				res.send(Object.assign(codes[200],{},{
          data:{}
        }))
			}
		}
	})
}

// 登出
exports.logout = function(req, res) {
	req.session.isLogin = 0;
	req.session.username = null;
	res.cookie('isLogin','0' , {expires: 0});
	res.send({
    code:0,
    data:{},
    msg:'登出成功'
  });
}
