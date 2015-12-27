'use strict';
var gulp = require('gulp');
var gulpChanged = require('gulp-changed');
var gulpIf = require('gulp-if');
var gulpLivereload = require('gulp-livereload');
const CONSTS = require('./CONSTS');
const STATIC_SRC = [CONSTS.IMG_SRC + '/**', CONSTS.FONT_SRC + '/**'];
const APPSERVER_SRC = [CONSTS.SERVER_JS_SRC + '/**/*.js'];
const TEMPLATES_SRC = [CONSTS.TEMPLATES_SRC + '/**'];

function copyViews () {
    return copyFilesFn(TEMPLATES_SRC, CONSTS.TEMPLATES_DEST, CONSTS.TEMPLATES_SRC, true);
}

function copyFiles () {
    return copyFilesFn(APPSERVER_SRC, CONSTS.APPSERVER_DEST, CONSTS.SERVER_JS_SRC, false);
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
gulp.task('copystaticfiles', copyStaticFiles);
gulp.task('copyviews', copyViews);
gulp.task('copy', ['clean', 'copyfiles', 'copystaticfiles', 'copyviews']);
