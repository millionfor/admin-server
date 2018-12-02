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

  photosUtil.pClassifys(req.body.classifysId)
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

// 编辑图集
exports.update = function (req, res, next) {
  let fileList = _.filter(req.body.filePaths , v => v.uid)
  let filePaths = _.filter(req.body.filePaths , v => !v.uid)

  // 上传图片
  let pUploadUtil = (classifysInfo) => {
    return new Promise((resolve,reject) => {
      // 有新的图片才上传
      if (filePaths.length) {
        UploadUtil.qiniuUpload({
          filePaths:filePaths,
          classifys:classifysInfo.classifys_en_name
        }).then(result =>{
          resolve({
            classifysInfo:classifysInfo,
            photoInfo:result
          })
        }).catch(e => {
          reject(e)
        });
      }else{
        resolve({
          classifysInfo:classifysInfo,
          photoInfo:[]
        })
      }
    })
  }

  // 更新
  let pUpdate = ({classifysInfo,photoInfo}) => {
    return new Promise((resolve,reject) => {
      let pathList = fileList.concat(photoInfo);
      let newResult = {
        classifys_id:classifysInfo.classifys_id,
        classifys_cn_name:classifysInfo.classifys_cn_name,
        classifys_en_name:classifysInfo.classifys_en_name,
        photos_id: req.body.photosId,
        photos_title: req.body.photosTitle,
        photos_desc: req.body.photosDesc,
        photos_recommended: req.body.photosRecommended,
        photos_cover: req.body.photosCover,
        photos_path_name:pathList,
        updateTime: Util.Date(),
      }
      Photos.update({photos_id:req.body.photosId}, {$set: newResult}, {multi: true, upsert: true}, function (err, result) {
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
    })
  }


  photosUtil.pClassifys(req.body.classifysId)
    .then(res => {
      return pUploadUtil(res)
    })
    .then(res => {
      return pUpdate(res)
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

  // 先删除下面的照片
  let pRemovePhotos = (result) => {
    return new Promise((resolve,reject)=>{
      let data = result[0]['photos_path_name']
      if (data.length) {
        _.map(data , v => {
          UploadUtil.delete({deleteImg:v.name}).then(res => {
            resolve()
          }).catch( e => {
            reject(e)
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

// 删除一张照片
exports.deleteOnePhoto = function(req, res, next) {
  // 删除照片
  let removeOnePhoto = (result) => {
    return new Promise((resolve, reject) => {
      UploadUtil.delete({deleteImg:req.body.fileName}).then(res => {
        resolve(result)
      }).catch( e => {
        reject(e)
      })
    })
  }
  // 保存删除后的json
  let saveEditPhoto = (result) => {
    return new Promise((resolve,reject) => {
      let pathList = _.filter(result[0].photos_path_name , v => req.body.fileName !== v.key)
      let newResult = {
        classifys_id:result[0].classifys_id,
        classifys_cn_name:result[0].classifys_cn_name,
        classifys_en_name:result[0].classifys_en_name,
        photos_title: result[0].photos_title,
        photos_desc: result[0].photos_desc,
        photos_recommended: result[0].photos_recommended,
        photos_cover: result[0].photos_cover,
        photos_path_name:pathList,
        createTime: Util.Date(),
        updateTime: Util.Date(),
      }
      Photos.update({photos_id:req.body.photosId}, {$set: newResult}, {multi: true, upsert: true}, function (err, result) {
        if (err) {
          res.send({
            code: 901,
            msg: err,
            data:{}
          })
        }else{
          res.send({
            code: 0,
            msg: '删除一张照片成功！',
            data:{}
          })
        }
      })
    })
  }

  photosUtil.findOne(req.body.photosId)
    .then(res => {
      return removeOnePhoto(res)
    })
    .then(res => {
      return saveEditPhoto(res)
    })
    .catch(e => {
      console.log(e)
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

