
let options = {
  db_user: "quanquansy",
  db_pwd: "F4545rreFekrir",
  db_host: "106.14.35.134",
  db_port: 27017,
  db_name: "quanquansy"
};

// let dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
 let dbURL = `mongodb://${options.db_user}:${options.db_pwd}@${options.db_host}:${options.db_port}/${options.db_name}`;
//let dbURL = 'mongodb://106.14.35.134:27017/quanquansy';
console.log(dbURL)
module.exports = dbURL;
