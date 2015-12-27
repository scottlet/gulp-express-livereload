'use strict';
var express = require('express');
var index = require('./routes/index');
var users = require('./routes/users');
var router = express.Router();
router.get('/', index);
router.get('/users', users);
