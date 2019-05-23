'use strict';

/*eslint-disable no-console*/

const CONSTS = require('./CONSTS');
const {parallel, src, dest} = require('gulp');
const gulpChanged = require('gulp-changed');
const gulpIf = require('gulp-if');
const gulpLivereload = require('gulp-livereload');

const APPSERVER_SRC = [CONSTS.JS_SERVER_SRC + '/**/*.js'];
const SHARED_SRC = [CONSTS.JS_SHARED_SRC + '/**/*.js'];
const STATIC_SRC = [CONSTS.IMG_SRC + '/**', CONSTS.FONT_SRC + '/**'];
const TEMPLATES_SRC = [CONSTS.TEMPLATES_SRC + '/**'];

function copyBin() {
    return copyFilesFn([
        CONSTS.SRC + '/' + CONSTS.APP
    ], CONSTS.APPSERVER_DEST, CONSTS.SRC);
}

function copyViews() {
    return copyFilesFn(TEMPLATES_SRC, CONSTS.TEMPLATES_DEST, CONSTS.TEMPLATES_SRC, true);
}

function copyOptions() {
    return copyFilesFn(['src/options.js', 'src/package.json'], CONSTS.APPSERVER_DEST, CONSTS.SRC, true);
}

function copyFiles() {
    return copyFilesFn(APPSERVER_SRC, CONSTS.APPSERVER_DEST, CONSTS.JS_SERVER_SRC, false);
}

// function copySharedFilesLR() {
//     process.env.OVERRIDE_LR = 'true';
//
//     return copyFilesFn(SHARED_SRC, CONSTS.APPSERVER_DEST, CONSTS.JS_SRC, true);
// }

function copySharedFiles() {
    return copyFilesFn(SHARED_SRC, CONSTS.APPSERVER_DEST, CONSTS.JS_SRC, false);
}

function copyStaticFiles() {
    return copyFilesFn(STATIC_SRC, CONSTS.STATIC_PATH, CONSTS.SRC, true);
}

function copyFilesFn(source, destination, base, reload) {
    return src(source, {base: base || '.'})
        .pipe(gulpChanged(destination))
        .pipe(dest(destination))
        .pipe(gulpIf(reload, gulpLivereload({
            port: CONSTS.LIVERELOAD_PORT
        })));
}

// gulp.task('copybin', copyBin);
// gulp.task('copyfiles', copyFiles);
// gulp.task('copyoptions', copyOptions);
// gulp.task('copysharedfiles', copySharedFiles);
// gulp.task('copysharedfilesLR', copySharedFilesLR);
// gulp.task('copystaticfiles', copyStaticFiles);
// gulp.task('copyviews', copyViews);
// gulp.task('copy',
// ['clean', 'copybin', 'copyfiles', 'copysharedfiles', 'copystaticfiles', 'copyviews', 'copyoptions']);
//

module.exports = {
    default: parallel(
        copyBin,
        copyFiles,
        copyOptions,
        copySharedFiles,
        copyStaticFiles,
        copyViews
    ),
    copyFiles,
    copyStaticFiles,
    copySharedFiles,
    copyViews
};
