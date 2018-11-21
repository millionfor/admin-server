'use strict';

let express = require('express');
let controller = require('./classifys.controller');

let router = express.Router();

// 登录
router.post('/save', controller.save);

module.exports = router;