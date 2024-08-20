'use strict'

let path = require('path');
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
require('./config/mongodb');
let mongoStore = require('connect-mongo')(session);
let dbURL = require('./config/config')

let app = express();
let publicDir = path.dirname(require.main.filename) + '/';

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true,
  parameterLimit: 999999999 // experiment with this parameter and tweak
}));

app.use(cookieParser());
app.use(session({
  secret: "express",
  key: "quanquan_sy",
  cookie: {maxAge: 1000 * 60 * 60 * 12},//超时时间
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: dbURL,
    collection: 'sessions'
  })
}));

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



