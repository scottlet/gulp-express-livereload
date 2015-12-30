'use strict';
const APPSERVER_SRC = [CONSTS.JS_SERVER_SRC + '/**/*.js'];
const CONSTS = require('./CONSTS');
const gulp = require('gulp');
const gulpChanged = require('gulp-changed');
const gulpIf = require('gulp-if');
const gulpLivereload = require('gulp-livereload');
const SHARED_SRC = [CONSTS.JS_SHARED_SRC + '/**/*.js'];
const STATIC_SRC = [CONSTS.IMG_SRC + '/**', CONSTS.FONT_SRC + '/**'];
const TEMPLATES_SRC = [CONSTS.TEMPLATES_SRC + '/**'];

function copyViews () {
    return copyFilesFn(TEMPLATES_SRC, CONSTS.TEMPLATES_DEST, CONSTS.TEMPLATES_SRC, true);
}

function copyFiles () {
    return copyFilesFn(APPSERVER_SRC, CONSTS.APPSERVER_DEST, CONSTS.JS_SERVER_SRC, false);
}
function copySharedFiles () {
    return copyFilesFn(SHARED_SRC, CONSTS.APPSERVER_DEST, CONSTS.JS_SRC, false);
}
function copyStaticFiles () {
    return copyFilesFn(STATIC_SRC, CONSTS.STATIC_PATH, CONSTS.SRC, true);
}
function copyFilesFn (src, dest, base, reload) {
    return gulp.src(src, {base: base || '.'})
    .pipe(gulpChanged(dest))
    .pipe(gulp.dest(dest))
    .pipe(gulpIf(reload, gulpLivereload({
        port: CONSTS.LIVERELOAD_PORT
    })));
}

gulp.task('copyfiles', copyFiles);
gulp.task('copysharedfiles', copySharedFiles);
gulp.task('copystaticfiles', copyStaticFiles);
gulp.task('copyviews', copyViews);
gulp.task('copy', ['clean', 'copyfiles', 'copysharedfiles', 'copystaticfiles', 'copyviews']);
