
let options = {
  db_user: "root",
  db_pwd: "123456",
  db_host: "192.168.199.121",
  db_port: 27017,
  db_name: "quanquansy"
};

// let dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
// let dbURL = 'mongodb://106.14.35.134:27017/quanquansy';
let dbURL = 'mongodb://192.168.60.91:27017/quanquansy';

module.exports = dbURL;
