'use strict'

let mongoose = require('mongoose');
let Classifys = mongoose.model('Classifys');
let codes = require('../../module/codes')
let Util = require('../../module/util')

// 添加分类
exports.save = function(req, res, next) {
  Classifys.nextCount(function(err, count) {
    let setParam = {
      classifys_id:count,
      classifys_cn_name: req.body.classifysCnName,
      classifys_en_name: req.body.classifysEnName,
      classifys_desc: req.body.classifysDesc,
      updateTime: Util.Date(),
    }
    Classifys.create(setParam, function(err, result) {
      if (err) {
        res.send({
          code: 901,
          msg: err,
          data:{}
        })
      }else{
        res.send(Object.assign(codes[203],{},{
          data:{}
        }))
      }
    })
  });
}

// 查询单条数据
exports.findById = function (req, res, next) {
  Classifys.find({classifys_id: req.body.classifysId}).exec(function (err, result) {
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
        data:result
      })
    }
  });
}

// 查询集合list
exports.list = function (req, res, next) {
  Classifys.find({}).exec(function (err, result) {
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
        data:result
      })
    }
  });
}