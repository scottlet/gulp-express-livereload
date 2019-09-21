const { src } = require('gulp');
const { onError } = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const gulpSpawnMocha = require('gulp-spawn-mocha');
const gulpWait = require('gulp-wait');
const CONSTS = require('./CONSTS');

const TESTS_PATH = require('./CONSTS').TESTS_PATH;

function mochaTestLR() {
    return src(TESTS_PATH + '**/*.js', { read: false })
        .pipe(gulpWait(CONSTS.WAIT))
        .pipe(gulpPlumber({ errorHandler: onError('gulpMocha Error: <%= error.message %>') }))
        .pipe(gulpSpawnMocha({ R: 'nyan' }));
}

function mochaTest() {
    return src(TESTS_PATH + '**/*.js', { read: false })
        .pipe(gulpPlumber({ errorHandler: onError('gulpMocha Error: <%= error.message %>') }))
        .pipe(gulpSpawnMocha({ R: 'nyan' }));
}

module.exports = {
    mochaTest,
    mochaTestLR
};
