const { src } = require('gulp');
const gulpESLint = require('gulp-eslint');
const { onError } = require('gulp-notify');
const gulpChangedInPlace = require('gulp-changed-in-place');
const gulpPlumber = require('gulp-plumber');
const CONSTS = require('./CONSTS');

function short(a) {
    const arr = a.split('/');

    return arr[arr.length - 1];
}

function lint() {
    return src([CONSTS.GULPFILE, CONSTS.GULP_TASKS + '/**/*.js', CONSTS.JS_SRC + '/**/*.js'])
        .pipe(gulpPlumber({
            errorHandler: onError(error => {
                return 'ESLint Error: ' + short(error.fileName) + ':<%= error.lineNumber %>, <%= error.message %>';
            })
        }))
        .pipe(gulpChangedInPlace())
        .pipe(gulpESLint())
        .pipe(gulpESLint.format());
}

module.exports = lint;
