'use strict'
let _ = require('lodash')
let mongoose = require('mongoose');
let Classifys = mongoose.model('Classifys');
let Setting = mongoose.model('Setting');
let Photos = mongoose.model('Photos');
let external = require('./source/util')

// 获取分类列表接口
exports.classifysList = function(req, res, next) {
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
        data: _.sortBy(result,item => -item.classifys_rank)
      })
    }
  });
}

// 获取热门推荐和banner图
exports.hotIndex = function(req, res, next) {
  // getconfig数据
  let p1 = new Promise((resolve, reject) => {
    Setting.find({id: 1}).exec(function (err, result) {
      resolve(result[0])
    });
  })
  // 置顶图片数据
  let p2 = new Promise((resolve, reject) => {
    Photos.find({photos_recommended:true}).exec(function (err, result) {
      resolve(result)
    });
  })

  Promise.all([p1,p2]).then(result => {
    let getConfigData = result[0]
    let photosData = result[1]
    let newData = _.map(external.handleResult(photosData), v => _.omit(v, ['photos_path']))
    let data = _.sortBy(newData,item => -(new Date(item.updateTime)).valueOf())
    res.send({
      code: 0,
      msg: '成功',
      data: {
        hotBanner:_.slice(data, 0, 3),
        hotList:_.slice(data, 3, 10),
        configData:getConfigData
      }
    })
  })
}

// 获取config
exports.getConfig = function(req, res, next) {
  Setting.find({id: 1}).exec(function (err, result) {
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

// 根据分类获取列表
exports.photoList = function(req, res, next) {
  let param = {
    classifys_en_name:req.query.classifysEnName
  }

  // 获取分类信息
  let p1 = new Promise((resolve, reject) => {
    Classifys.find(param).exec(function (err, result) {
      resolve(result[0])
    });
  })

  // 查询当前分类所有我的图集
  let p2 = new Promise((resolve, reject) => {
    Photos.find({classifys_en_name:req.query.classifysEnName}).exec(function (err, result) {
      // 处理 result 数据带小图
      let newData = _.map(external.handleResult(result), v => _.omit(v, ['photos_path']))
      resolve(_.sortBy(newData,item => -item._id))
    });
  })

  Promise.all([p1,p2]).then(result => {
    let classifysData = result[0]
    let photosData = result[1]
    res.send({
      code: 0,
      msg: '成功',
      data: {
        classifysData:classifysData,
        list:photosData
      }
    })
  })
}

// 获取照片详情
exports.photoDetails = function(req, res, next) {
  Photos.find({_id:parseInt(req.query.id)}).exec(function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      let newData = external.handleResult(result)
      let data = newData[0]
      data.photos_path = _.sortBy(data.photos_path,item => -item.sort)
      res.send({
        code: 0,
        msg: '成功',
        data: data
      })
    }
  });
}
