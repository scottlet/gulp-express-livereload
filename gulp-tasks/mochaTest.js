'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var TESTS_PATH = require('./CONSTS').TESTS_PATH;

gulp.task('mochaTest', function () {
    return gulp.src(TESTS_PATH + '**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});
