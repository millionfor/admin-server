
let options = {
  db_user: "quanquansy",
  db_pwd: "xxxx",
  db_host: "xxx.xx.xx.xx",
  db_port: 27017,
  db_name: "quanquansy"
};

 let dbURL = `mongodb://${options.db_user}:${options.db_pwd}@${options.db_host}:${options.db_port}/${options.db_name}`;
console.log(dbURL)
module.exports = dbURL;
