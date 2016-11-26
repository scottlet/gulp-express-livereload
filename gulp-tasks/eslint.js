'use strict';
/*eslint-disable no-console*/
const gulp = require('gulp');
const gulpESLint = require('gulp-eslint');
const gulpNotify = require('gulp-notify');
const gulpChangedInPlace = require('gulp-changed-in-place');
const gulpPlumber = require('gulp-plumber');
const CONSTS = require('./CONSTS');

function short (a) {
    console.log('a', a);
    let arr = a.split('/');
    return arr[arr.length -1];
}

gulp.task('eslint',  () => {
    return gulp.src([CONSTS.GULPFILE, CONSTS.GULP_TASKS + '/**/*.js', CONSTS.JS_SRC + '/**/*.js'])
    .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError(function (error) {
            return 'ESLint Error: ' + short(error.fileName) + ':<%= error.lineNumber %>, <%= error.message %>';
        })
    }))
    .pipe(gulpChangedInPlace())
    .pipe(gulpESLint())
    .pipe(gulpESLint.format())
    .pipe(gulpESLint.failOnError());
});
