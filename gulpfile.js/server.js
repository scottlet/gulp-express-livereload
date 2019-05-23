'use strict';

const {src, series} = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpNodemon = require('gulp-nodemon');
const proxyMiddleware = require('proxy-middleware');
const connectLivereload = require('connect-livereload');
const gulpLivereload = require('gulp-livereload');
const gulpWait = require('gulp-wait');
const fancyLog = require('fancy-log');
const url = require('url');
const CONSTS = require('./CONSTS');

function runNodeMon(cb) {
    gulpNodemon({
        script: CONSTS.APPSERVER_DEST + CONSTS.APP,
        ext: 'js',
        watch: ['app'],
        ignore: [
            CONSTS.NODEMON_IGNORE
        ]
    }).on('start', () => {
        process.env.OVERRIDE_LR = 'false';
        fancyLog('restarted');
        cb();

        return src(CONSTS.APPSERVER_DEST + CONSTS.APP)
            .pipe(gulpWait(CONSTS.NODEMON_WAIT))
            .pipe(gulpLivereload({
                port: CONSTS.LIVERELOAD_PORT
            }));
    });
}

function makeServer(cb) {
    const port = CONSTS.GULP_PORT;
    const proxyOptions = url.parse(CONSTS.APP_SERVER);

    proxyOptions.route = '/';
    gulpConnect.server({
        port,
        middleware: (server) => {
            return [
                connectLivereload({
                    port: CONSTS.LIVERELOAD_PORT
                }),
                proxyMiddleware(proxyOptions)
            ];
        }
    });
    cb();
    fancyLog('server http://127.0.0.1:' + port);
}

module.exports = series(runNodeMon, makeServer);

// gulp.task('nodemon', ['copy'], runNodeMon);
// gulp.task('makeserver', ['copy', 'browserify', 'sass', 'watch'], makeServer);
// gulp.task('server', ['build', 'watch', 'nodemon', 'makeserver']);
