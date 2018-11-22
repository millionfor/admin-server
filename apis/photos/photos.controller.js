'use strict'

let mongoose = require('mongoose');
let Photos = mongoose.model('Photos');
let codes = require('../../module/codes')
let Util = require('../../module/util')

// 添加分类
exports.save = function(req, res, next) {

  Photos.nextCount(function(err, count) {
    let setParam = {
      photos_id:count,
      photos_name: req.body.photoName,
      photos_desc: req.body.photoDesc,
      photos_classify:req.body.photoClassify,
      photos_path_name:req.body.photoPathName,
      updateTime: Util.Date(),
    }
    Photos.create(setParam, function(err, result) {
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
