let UploadUtil = require('../module/util/uploadUtil')

// 本地文件路径
let filePaths = ['./1.jpg','./2.jpg'];

let qn = require('qn');
let client = qn.create({
  accessKey: '9Mp8ZpqK1AexzkBoqCe0FfJHQjcd16z7iZnmP7AF',
  secretKey: 'E5MYC1Vn3bC37_zPCpN-A7PBiRxFlyLxQ2-L1V1A',
  bucket: 'qqsy',  // 在七牛云创建的空间名字
  origin: 'http://img1.quanquansy.com',    // 使用测试域名
});

// client.uploadFile(`./1.jpg`, {key: 'aaaaa'}, (err, result)=> {
//   if (err) {
//   }else{
//     console.log(result)
//   }
// });


// 上传
/*UploadUtil.qiniuUpload({
  filePaths:filePaths,
  classifys:'aaaa'
}).then(res =>
  console.log(res)
).catch(e => {
  console.log(e)
  console.log('失败')
});*/

// 更改图片地址
/*
UploadUtil.move({
  sourceImg:'bbbb/1.jpg',
  targetImg:'a/1.jpg'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log('失败')
})*/

// 删除图片
UploadUtil.delete({
  deleteImg:'people/1547457559000ddddd/IMG_9331.jpg',
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
  console.log('失败')
})

// 裁切图片大小
// UploadUtil.cutting('aaaa/1.jpg')
