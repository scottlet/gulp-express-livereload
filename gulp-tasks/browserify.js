'use strict';

var browserify = require('browserify');
const CONSTS = require('./CONSTS');
var gulp = require('gulp');
var gulpIf =require('gulp-if');
var gulpLivereload = require('gulp-livereload');
var gulpNotify = require('gulp-notify');
var gulpPlumber = require('gulp-plumber');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');
const isDev = CONSTS.NODE_ENV !== 'production';
var vinylBuffer = require('vinyl-buffer');
var vinylSourceStream = require('vinyl-source-stream');
var watchify = require('watchify');

var options = {
    entries: [CONSTS.JS_ENTRY],
    cache: {},
    packageCache: {}
};
if (isDev) {
    options.plugin = [watchify];
}

var b = browserify(options);

function bundle() {
    return b.bundle()
    .pipe(gulpPlumber({errorHandler: gulpNotify.onError('Bundle Error: <%= error.message %>')}))
    .pipe(vinylSourceStream(CONSTS.JS_OUTPUT))
    .pipe(vinylBuffer())
    .pipe(gulpSourcemaps.init({loadMaps: true}))
    .pipe(gulpUglify())
    .pipe(gulpIf(isDev, gulpSourcemaps.write()))
    .pipe(gulp.dest(CONSTS.JS_DEST))
    .pipe(gulpIf(isDev, gulpLivereload({
        port: CONSTS.LIVERELOAD_PORT
    })));
}

b.on('update', bundle);
b.on('log', gulpUtil.log);
b.on('error', gulpUtil.log);

gulp.task('browserify', bundle);
