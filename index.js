'use strict'

let path = require('path');
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let mongodb = require('./config/mongodb');


let app = express();
let port = 3030;
let publicDir = path.dirname(require.main.filename) + '/';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
  parameterLimit: 1000000 // experiment with this parameter and tweak
}));
app.use(cookieParser());
app.use(session({
  secret: 'just-relax',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))


app.use(express.static(publicDir));

let modelsPath = path.join(__dirname, 'db');

fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// 跨域设置
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

require('./routes')(app);

module.exports = app;



