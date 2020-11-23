import { src, series } from 'gulp';
import gulpConnect from 'gulp-connect';
import gulpNodemon from 'gulp-nodemon';
import { createProxyMiddleware } from 'http-proxy-middleware';
import connectLivereload from 'connect-livereload';
import gulpLivereload from 'gulp-livereload';
import gulpWait from 'gulp-wait';
import fancyLog from 'fancy-log';
import url from 'url';
import { CONSTS } from './CONSTS';

const {
    APP_SERVER,
    APP,
    APPSERVER_DEST,
    GULP_PORT,
    LIVERELOAD_PORT,
    NODEMON_IGNORE,
    NODEMON_WAIT
} = CONSTS;

function runNodeMon(cb) {
    return gulpNodemon({
        script: APPSERVER_DEST + APP,
        ext: 'js',
        watch: [APPSERVER_DEST],
        ignore: [NODEMON_IGNORE]
    }).on('start', () => {
        process.env.OVERRIDE_LR = 'false';
        fancyLog('restarted');
        cb();

        return src(APPSERVER_DEST + APP)
            .pipe(gulpWait(NODEMON_WAIT))
            .pipe(
                gulpLivereload({
                    port: LIVERELOAD_PORT
                })
            );
    });
}

function makeServer(cb) {
    const port = GULP_PORT;

    gulpConnect.server({
        port,
        middleware: () => {
            return [
                connectLivereload({
                    port: LIVERELOAD_PORT
                }),
                createProxyMiddleware('/', {
                    target: url.parse(APP_SERVER)
                })
            ];
        }
    });
    cb();
}

const server = series(runNodeMon, makeServer);

export { server };
