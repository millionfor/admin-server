let qn = require('qn');
let path = require('path');

let UploadUtil = function () {
  this.client = qn.create({
    accessKey: '9Mp8ZpqK1AexzkBoqCe0FfJHQjcd16z7iZnmP7AF',
    secretKey: 'E5MYC1Vn3bC37_zPCpN-A7PBiRxFlyLxQ2-L1V1A',
    bucket: 'qqsy',  // 在七牛云创建的空间名字
    origin: 'http://img1.quanquansy.com',    // 使用测试域名
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
      let fileName = path.win32.basename(filePath.imgPath);
      let key = `${classifys}/${fileName}`
      this.client.uploadFile(`./${filePath.imgPath}`, {key: key}, (err, result)=> {
        if (err) {
          reject(err)
        }else{
          resolve(Object.assign(result,{},{
            imageView:this.imageView(key),
            sort:filePath.sort
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
      mode: 1,
      width: 200,
      height: 200,
      q: 50,
      format: 'png'
    }
  );
}


module.exports = new UploadUtil();