const { src, series } = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpNodemon = require('gulp-nodemon');
const { createProxyMiddleware } = require('http-proxy-middleware');
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

    gulpConnect.server({
        port,
        middleware: () => {
            return [
                connectLivereload({
                    port: CONSTS.LIVERELOAD_PORT
                }),
                createProxyMiddleware('/', {
                    target: url.parse(CONSTS.APP_SERVER)
                })
            ];
        }
    });
    cb();
    fancyLog('server http://127.0.0.1:' + port);
}

module.exports = series(runNodeMon, makeServer);
