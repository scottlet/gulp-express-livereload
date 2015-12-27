'use strict';
/*eslint-disable no-console*/
var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var gulpNodemon = require('gulp-nodemon');
var proxyMiddleware = require('proxy-middleware');
var connectLivereload = require('connect-livereload');
var gulpLivereload = require('gulp-livereload');
var url = require('url');
const CONSTS = require('./CONSTS');

function runNodeMon () {
    gulpNodemon({
        script: CONSTS.APP,
        ext: 'js',
        ignore: [
            CONSTS.NODEMON_IGNORE
        ]
    }).on('restart', function() {
        setTimeout(function (changed) {
            gulpLivereload.reload(changed);
        }, 750);
    });
}

function makeServer() {
    var port = CONSTS.GULP_PORT;
    var proxyOptions = url.parse(CONSTS.APP_SERVER);
    proxyOptions.route = '/';
    gulpConnect.server({
        port,
        middleware: function (server) {
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
gulp.task('makeserver', ['copy', 'browserify', 'sass'], makeServer);
gulp.task('server', ['build', 'watch', 'nodemon', 'makeserver']);
