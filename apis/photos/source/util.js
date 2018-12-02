
let mongoose = require('mongoose');
let Photos = mongoose.model('Photos');
let Classifys = mongoose.model('Classifys');

const photosUtil = {}

/**
 * 获取分类信息
 */
photosUtil.pClassifys = function (classifysId) {
  return new Promise((resolve,reject) => {
    Classifys.find({classifys_id: classifysId}).exec(function (err, result) {
      if (err) {
        reject(err)
      }else{
        resolve(result[0])
      }
    })
  })
}

/**
 * 获取单条数据
 */
photosUtil.findOne = function (photosId) {
  return new Promise((resolve,reject) => {
    Photos.find({photos_id:photosId}).exec(function (err, result) {
      if (err) {
        reject(err)
      }else{
        resolve(result)
      }
    });
  })
}





module.exports = photosUtil;