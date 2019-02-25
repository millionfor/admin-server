'use strict'
let _ = require('lodash')
let mongoose = require('mongoose');
let Classifys = mongoose.model('Classifys');
let Util = require('../../module/util')

// 添加分类
exports.create = function(req, res, next) {
  Util.validationField({
    model:Classifys,
    field:'classifys_cn_name',
    value:req.body.classifysCnName
  }).then(() =>{
    Classifys.nextCount((err, count) => {
      let setParam = {
        classifys_id:count,
        classifys_cn_name: req.body.classifysCnName,
        classifys_en_name: req.body.classifysEnName,
        classifys_desc: req.body.classifysDesc,
        classifys_rank:req.body.classifysRank,
        createTime: Util.Date(),
        updateTime: Util.Date(),
      }
      Classifys.create(setParam, (err, result)=> {
        if (err) {
          res.send({
            code: 901,
            msg: err,
            data:{}
          })
        }else{
          res.send({
            code:0,
            msg:'创建分类成功！',
            data:{}
          })
        }
      })
    });
  }).catch( () => {
    res.send({
      code: 204,
      msg: '分类名称重复！',
      data:{}
    })
  })

}

// 更新
exports.update = function(req, res, next) {
  let setParam = {
    classifys_cn_name: req.body.classifysCnName,
    classifys_en_name: req.body.classifysEnName,
    classifys_desc: req.body.classifysDesc,
    classifys_rank:req.body.classifysRank,
    updateTime: Util.Date(),
  }
  Classifys.update({_id:req.body.classifysId}, {$set: setParam}, {multi: true, upsert: true}, function (err, result) {
    if (err) {
      res.send({
        code: 901,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code: 0,
        msg: '更新分类成功！',
        data:{}
      })
    }
  })
}

// 删除
exports.delete = function(req, res, next) {
  Classifys.remove({_id:req.body.classifysId}, function (err, result) {
    if (err) {
      res.send({
        code: 902,
        msg: err,
        data:{}
      })
    }else{
      res.send({
        code: 0,
        msg: '删除分类成功！',
        data:{}
      })
    }
  })
}

// 查询单条数据
exports.findById = function (req, res, next) {
  Classifys.find({_id: req.body.classifysId}).exec(function (err, result) {
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
        data: _.sortBy(result,item => -(new Date(item.updateTime)).valueOf())
      })
    }
  });
}

// 关键词搜索
exports.search = function (req, res, next) {

}
