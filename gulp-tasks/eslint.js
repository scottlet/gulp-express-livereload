'use strict';
/*eslint-disable no-console*/
var gulp = require('gulp');
var gulpESLint = require('gulp-eslint');
var gulpNotify = require('gulp-notify');
var gulpPlumber = require('gulp-plumber');

gulp.task('eslint',  () => {
    return gulp.src(['gulpfile.js', '**/*.js'])
    .pipe(gulpPlumber({errorHandler: gulpNotify.onError('Bundle Error: <%= error.message %>')}))
    .pipe(gulpESLint())
    .pipe(gulpESLint.format())
    .pipe(gulpESLint.failAfterError());
});
