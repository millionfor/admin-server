'use strict'
let _ = require('lodash')
let mongoose = require('mongoose');
let Photos = mongoose.model('Photos');
let Classifys = mongoose.model('Classifys');
let Util = require('../../module/util')
let photosUtil = require('./source/util')
let UploadUtil = require('../../module/util/uploadUtil')

// 创建图集
exports.create = function(req, res, next) {
  Photos.nextCount((err, count)=> {
    let setParam = {
      photos_id:count,
      classifys_id:req.body.classifysId,
      classifys_en_name:req.body.classifysEnName,
      classifys_cn_name:req.body.classifysCnName,
      photos_title: req.body.photosTitle,
      photos_desc: req.body.photosDesc,
      photos_recommended: req.body.photosRecommended,
      photos_cover: req.body.photosCover,
      photos_path:req.body.filePaths || [],
      createTime: Util.Date(),
      updateTime: Util.Date(),
    }
    Photos.create(setParam, (err, result)=> {
      if (err) {
        res.send({
          code: 901,
          msg: '图集上传失败！',
          data: err
        })
      }else{
        res.send({
          code: 0,
          msg: '图集上传成功！',
          data: {}
        })
      }
    })
  });

}

// 编辑图集
exports.update = function (req, res, next) {
  let newResult = {
    classifys_id:req.body.classifysId,
    classifys_en_name:req.body.classifysEnName,
    classifys_cn_name:req.body.classifysCnName,
    photos_id: req.body.photosId,
    photos_title: req.body.photosTitle,
    photos_desc: req.body.photosDesc,
    photos_recommended: req.body.photosRecommended,
    photos_cover: req.body.photosCover,
    photos_path:req.body.filePaths || [],
    updateTime: Util.Date(),
  }
  Photos.update({_id:parseInt(req.body.photosId)}, {$set: newResult}, {multi: true, upsert: true}, function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code: 0,
        msg: '更新图集成功！',
        data:{}
      })
    }
  })

}

// 查询集合list
exports.list = function (req, res, next) {
  Photos.find({}).exec(function (err, result) {
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
        data: _.sortBy(result,item => -(new Date(item.updateTime)).valueOf())
      })
    }
  });
}

// 删除
exports.delete = function(req, res, next) {

  // 先删除下面的照片
  let pRemovePhotos = (result) => {
    return new Promise((resolve,reject)=>{
      let data = result[0]['photos_path']
      if (data.length) {
        _.map(data , v => {
          UploadUtil.delete({deleteImg:v['imgInfo']['key']}).then(res => {
            resolve()
          }).catch( e => {
            resolve()
          })
        })
      }else {
        resolve()
      }
    })
  }

  let pRemoveData = () => {
    return new Promise((resolve,reject) => {
      Photos.remove({photos_id:req.body.photosId}, function (err, result) {
        if (err) {
          reject(err)
        }else{
          res.send({
            code: 0,
            msg: '删除图集成功！',
            data:{}
          })
        }
      })
    })
  }

  photosUtil.findOne(req.body.photosId)
    .then(result => {
      return pRemovePhotos(result)
    })
    .then(() => {
      return pRemoveData()
    })
    .catch(err => {
      res.send({
        code: 902,
        msg: err,
        data:{}
      })
    })
}

// 查询单条数据
exports.findById = function (req, res, next) {
  photosUtil.findOne(req.body.photosId).then(result => {
    res.send({
      code: 0,
      msg: '成功',
      data:result
    })
  }).catch(e => {
    res.send({
      code: 901,
      msg: e,
      data:{}
    })
  })
}

// 上传图片
exports.uploadPictures = function (req, res, next) {
  UploadUtil.qiniuUpload({
    filePaths:[req.body]
  }).then(result =>{
    res.send({
      code: 0,
      msg: '上传成功！',
      data:result[0]
    })
  }).catch(e => {
    res.send({
      code: 901,
      msg: e,
      data:{}
    })
  });
}

// 删除照片
exports.deletePictures = function (req, res, next) {
  UploadUtil.delete({
    deleteImg:req.body.pathName,
  }).then(() => {
    res.send({
      code: 0,
      msg: '删除成功！',
      data:{}
    })
  }).catch(e => {
    res.send({
      code: 902,
      msg: e,
      data:{}
    })
  })
}

