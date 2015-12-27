'use strict';

module.exports = function index(req, res, next) {
    res.render('index', { title: 'The Test Page', pagetitle: 'Welcome!' });
};
