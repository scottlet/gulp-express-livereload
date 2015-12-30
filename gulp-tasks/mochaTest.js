'use strict';
const gulp = require('gulp');
const gulpNotify = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const mocha = require('gulp-spawn-mocha');
const TESTS_PATH = require('./CONSTS').TESTS_PATH;

function mochaTest () {
    return gulp.src(TESTS_PATH + '**/*.js', {read: false})
    .pipe(gulpPlumber({errorHandler: gulpNotify.onError('gulpMocha Error: <%= error.message %>')}))
        .pipe(mocha({R: 'nyan'}));
}
gulp.task('mochaTest', ['eslint'], mochaTest);
gulp.task('test',  ['copy', 'eslint'], mochaTest);
