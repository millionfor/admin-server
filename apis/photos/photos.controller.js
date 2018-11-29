'use strict'
let _ = require('lodash')
let mongoose = require('mongoose');
let Photos = mongoose.model('Photos');
let Classifys = mongoose.model('Classifys');
let Util = require('../../module/util')
let UploadUtil = require('../../module/util/uploadUtil')

// 创建图集
exports.create = function(req, res, next) {

  // 获取分类信息
  let pClassifys = () => {
    return new Promise((resolve,reject) => {
      Classifys.find({classifys_id: req.body.classifysId}).exec(function (err, result) {
        if (err) {
          reject(err)
        }else{
          resolve(result[0])
        }
      })
    })
  }

  // 上传图片
  let pUploadUtil = (classifysInfo) => {
    return new Promise((resolve,reject) => {
      UploadUtil.qiniuUpload({
        filePaths:req.body.filePaths,
        classifys:classifysInfo.classifys_en_name
      }).then(result =>{
        resolve({
          classifysInfo:classifysInfo,
          photoInfo:result
        })
      }).catch(e => {
        reject(e)
      });
    })
  }

  // 创建
  let pCreate = ({classifysInfo,photoInfo}) => {
    return new Promise((resolve,reject) => {
      Photos.nextCount((err, count)=> {
        let setParam = {
          photos_id:count,
          classifys_id:classifysInfo.classifys_id,
          classifys_cn_name:classifysInfo.classifys_cn_name,
          classifys_en_name:classifysInfo.classifys_en_name,
          photos_title: req.body.photosTitle,
          photos_desc: req.body.photosDesc,
          photos_recommended: req.body.photosRecommended,
          photos_cover: req.body.photosCover,
          photos_path_name:photoInfo,
          createTime: Util.Date(),
          updateTime: Util.Date(),
        }
        Photos.create(setParam, (err, result)=> {
          if (err) {
            reject(err)
          }else{
            res.send({
              code: 0,
              msg: '图集上传成功！',
              data: {
                classifysInfo,photoInfo
              }
            })
          }
        })
      });
    })
  }

  pClassifys()
    .then((o) => {
      return pUploadUtil(o)
    })
    .then(o => {
      return pCreate(o);
    })
    .catch( e => {
      res.send({
        code: 205,
        msg: e,
        data: {}
      })
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
        data: _.sortBy(result,item => -item.updateTime)
      })
    }
  });
}

// 删除
exports.delete = function(req, res, next) {
  Photos.remove({photos_id:req.body.photosId}, function (err, result) {
    if (err) {
      res.send({
        code: 902,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code: 0,
        msg: '删除图集成功！',
        data:{}
      })
    }
  })
}

// 查询单条数据
exports.findById = function (req, res, next) {
  Photos.find({photos_id:req.body.photosId}).exec(function (err, result) {
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

