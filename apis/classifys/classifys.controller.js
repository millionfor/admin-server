'use strict'

let mongoose = require('mongoose');
let Classifys = mongoose.model('Classifys');
let codes = require('../codes')

exports.save = function(req, res, next) {
  let setParam = {
    classifys_cn_name: req.body.classifysCnName,
    classifys_en_name: req.body.classifysEnName,
    classifys_desc: req.body.classifysDesc,
    updateTime: Date.parse(new Date()),
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
}