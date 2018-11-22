let mongoose = require('mongoose');
let logger = require('pomelo-logger').getLogger('mongodb-log');
let autoIncrement = require('mongoose-auto-increment-fix');

let options = {
  db_user: "root",
  db_pwd: "123456",
  db_host: "192.168.199.121",
  db_port: 27017,
  db_name: "quanquansy"
};

let dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
let DB = mongoose.connect(dbURL);

autoIncrement.initialize(DB);

//如果连接成功会执行open回调
DB.connection.on("open", function () {
  console.log("数据库连接成功");
});

DB.connection.on('connected', function (err) {
  if (err) logger.error('Database connection failure');
});

DB.connection.on('error', function (err) {
  logger.error('Mongoose connected error ' + err);
});

DB.connection.on('disconnected', function () {
  logger.error('Mongoose disconnected');
});

process.on('SIGINT', function () {
  DB.connection.close(function () {
    logger.info('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports = DB;