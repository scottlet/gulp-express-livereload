'use strict';

const {series, parallel, task} = require('gulp');

const browserify = require('./browserify');
const clean = require('./clean');
const copy = require('./copy');
const deploy = require('./deploy');
const eslint = require('./eslint');
const mochaTest = require('./mochaTest');
const sass = require('./sass');
const buildServer = require('./server');
const watch = require('./watch');

task('browserify', browserify);
task('clean', clean);
task('copy', series('clean', copy));
task('eslint', eslint);
task('eslint-lr', eslint);
task('mochaTest', mochaTest.mochaTestLR);
task('test', mochaTest.mochaTest);
task('sass-watch', sass);
task('server', buildServer);
task('sass', sass);
task('watch', watch);

const buildcode = parallel(eslint, 'test', copy, sass, browserify);
const build = series(clean, buildcode);

task('buildcode', buildcode);
task('build', build);
task('deploy', deploy);

function defaultTask() {
    return series('build', 'watch', 'server');
}

exports.default = defaultTask();
