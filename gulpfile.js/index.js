const { series, parallel } = require('gulp');

const browserify = require('./browserify');
const clean = require('./clean');
const copy = require('./copy').default;
const deploy = require('./deploy');
const eslint = require('./eslint');
const { mochaTest } = require('./mochaTest');
const sass = require('./sass');
const buildServer = require('./server');
const watch = require('./watch');

const buildcode = parallel(eslint, mochaTest, copy, sass, browserify);
const build = series(clean, buildcode);
const server = series(build, watch, buildServer);

module.exports = {
    default: server,
    server,
    deploy: series(build, deploy),
    build,
    browserify,
    eslint,
    copy,
    watch
};
