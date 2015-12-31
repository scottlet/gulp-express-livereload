'use strict';
/*eslint-disable no-console*/
const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpNodemon = require('gulp-nodemon');
const proxyMiddleware = require('proxy-middleware');
const connectLivereload = require('connect-livereload');
const gulpLivereload = require('gulp-livereload');
const url = require('url');
const CONSTS = require('./CONSTS');

function runNodeMon () {
    gulpNodemon({
        script: CONSTS.APP,
        ext: 'js',
        ignore: [
            CONSTS.NODEMON_IGNORE
        ]
    }).on('start', () => {
        setTimeout((changed) => {
            process.env.OVERRIDE_LR = 'false';
            return gulp.src('app.js')
                .pipe(gulpLivereload({
                    port: CONSTS.LIVERELOAD_PORT
                }));
        }, 1000);
    });
}

function makeServer() {
    const port = CONSTS.GULP_PORT;
    let proxyOptions = url.parse(CONSTS.APP_SERVER);
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
    console.log('server http://127.0.0.1:' + port);
}
gulp.task('nodemon', ['copy'], runNodeMon);
gulp.task('makeserver', ['copy', 'browserify', 'sass', 'watch'], makeServer);
gulp.task('server', ['build', 'watch', 'nodemon', 'makeserver']);
