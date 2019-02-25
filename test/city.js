var http = require('http');
var util = require('util');
var get_ip = require('ipware')().get_ip;

/**
 * 根据 ip 获取获取地址信息
 */
var getIpInfo = function(ip, cb) {
  var sina_server = 'http://ip.taobao.com/service/getIpInfo.php?ip=';
  var url = sina_server + ip;
  http.get(url, function(res) {
    var code = res.statusCode;
    if (code == 200) {
      res.on('data', function(data) {
        try {
          cb(null, JSON.parse(data));
        } catch (err) {
          cb(err);
        }
      });
    } else {
      cb({ code: code });
    }
  }).on('error', function(e) { cb(e); });
};

getIpInfo('104.244.88.197', function(err, msg) {
  console.log(msg)
  console.log(get_ip)
})