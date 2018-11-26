'use strict'

let mongoose = require('mongoose');
let Photos = mongoose.model('Photos');
let codes = require('../../module/codes')
let Util = require('../../module/util')
let UploadUtil = require('../../module/util/uploadUtil')

// 添加分类
exports.create = function(req, res, next) {
  UploadUtil.qiniuUpload({
    filePaths:req.body.filePaths,
    classifys:req.body.photosClassifys
  }).then(res =>
    res.send({
      code: 0,
      msg: '图片上传成功(then)！',
      data:{}
    })
  ).catch(e => {
    res.send({
      code: 0,
      msg: '图片上传成功(catch)！',
      data:{}
    })
  });
}
/*Photos.nextCount(function(err, count) {


});*/
/*let setParam = {
      photos_id:count,
      photos_title: req.body.photosTitle,
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
    })*/