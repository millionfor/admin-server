let mongoose = require('mongoose');
let dbURL = require('./config')
let logger = require('pomelo-logger').getLogger('mongodb-log');

let DB = mongoose.connect(dbURL);

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
