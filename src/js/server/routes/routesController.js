'use strict';
var express = require('express');
var index = require('./index');
var users = require('./users');
var router = express.Router();
router.get('/', index);
router.get('/users', users);

module.exports = router;
