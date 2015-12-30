'use strict';
/*eslint-disable no-console*/
const gulp = require('gulp');
const gulpESLint = require('gulp-eslint');
const gulpNotify = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');

gulp.task('eslint',  () => {
    return gulp.src(['gulpfile.js', 'gulp-tasks/**/*.js', 'src/js/**/*.js'])
    .pipe(gulpPlumber({errorHandler: gulpNotify.onError('Bundle Error: <%= error.message %>')}))
    .pipe(gulpESLint())
    .pipe(gulpESLint.format())
    .pipe(gulpESLint.failAfterError());
});
