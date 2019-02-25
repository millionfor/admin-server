let qn = require('qn');
let path = require('path');
let mongoose = require('mongoose');
let Qn = mongoose.model('Qn');

let UploadUtil = function () {
  let self = this
  Qn.find({id: 1}).exec(function (err, result) {
    let data = result[0]
    self.client = qn.create({
      accessKey: data.access_key,
      secretKey: data.secret_key,
      bucket: data.bucket,  // 在七牛云创建的空间名字
      origin: data.origin,    // 使用测试域名
    });
  });
}

/**
 * 上传图片
 * @param filePaths Array ['1.jpg']
 * @param classifys String 分类名称
 */
UploadUtil.prototype.qiniuUpload = function ({filePaths,classifys}) {
  let qiniuPromise = filePaths.map(filePath => {
    // key 为上传到七牛云后自定义图片的名称
    return new Promise((resolve, reject) => {
      let fileName = path.win32.basename(filePath.pathName);
      let key = `${filePath.classifysEnName}/${Date.parse(new Date())}/${fileName}`
      // 转成流
      let blobSrc = filePath.blobSrc.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = new Buffer(blobSrc, 'base64');
      this.client.upload(dataBuffer, {key: key}, (err, result)=> {
        if (err) {
          reject(err)
        }else{
          resolve(Object.assign(result,{},{
            imageView:this.imageView(key)
          }))
        }
      });
    });
  });
  return Promise.all(qiniuPromise)
}

/**
 * 移动图片
 * @param sourceImg 来源图片地址(必须带分类)
 * @param targetImg 更改图片地址(必须带分类)
 */
UploadUtil.prototype.move = function ({sourceImg,targetImg}) {
  return new Promise((resolve,reject) => {
    this.client.move(sourceImg, targetImg, function (err,result) {
      if(err) {
        reject(err);
      }else {
        resolve(result);
      }
    });
  })
}

/**
 * 删除图片
 * @param deleteImg 删除的图片地址(必须带分类)
 */
UploadUtil.prototype.delete = function ({deleteImg}) {
  return new Promise((resolve,reject) => {
    this.client.delete(deleteImg, function (err,result) {
      if(err) {
        reject(err);
      }else {
        resolve(result);
      }
    });
  })
}

/**
 * 改变图片大小
 * @param cropImg 图片地址(必须带分类)
 */
UploadUtil.prototype.imageView = function (cropImg) {
  return this.client.imageView(
    cropImg,
    {
      mode: 2,
      width: 750,
      q: 100,
      format: 'png',
    }
  );
}


module.exports = new UploadUtil();
