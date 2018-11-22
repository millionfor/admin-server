'use strict';

let express = require('express');
let controller = require('./photos.controller');
let router = express.Router();

// 增加
router.post('/save', controller.save);

module.exports = router;