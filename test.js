let UploadUtil = require('./module/util/uploadUtil')

// 本地文件路径
let filePaths = ['./1.jpg','./2.jpg'];

// 上传
/*UploadUtil.qiniuUpload({
  filePaths:filePaths,
  classifys:'aaaa'
}).then(res =>
  console.log(res)
).catch(e => {
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
/*
UploadUtil.delete({
  deleteImg:'aaaa/1.jpg',
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log('失败')
})
*/

// 裁切图片大小
// UploadUtil.cutting('aaaa/1.jpg')
