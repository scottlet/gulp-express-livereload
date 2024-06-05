import { createProxyMiddleware } from 'http-proxy-middleware';
import { src, series } from 'gulp';
import connectCORS from 'connect-cors';
import connectLivereload from 'connect-livereload';
import fancyLog from 'fancy-log';
import gulpConnect from 'gulp-connect';
import gulpLivereload from 'gulp-livereload';
import gulpNodemon from 'gulp-nodemon';
import gulpWait from 'gulp-wait';

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

/**
 * Runs the Nodemon task to monitor and restart the Node.js server.
 * @param {Function} cb - The callback function to be called when the task is complete.
 * @returns {object} The gulpNodemon instance.
 */
function runNodeMon(cb) {
  return gulpNodemon({
    script: `${APPSERVER_DEST + APP}`,
    ext: 'js',
    watch: [APPSERVER_DEST],
    ignore: NODEMON_IGNORE
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

/**
 * Creates a server using gulp-connect and sets up middleware for live reloading,
 * proxying requests to the app server, and enabling CORS.
 * @param {Function} cb - The callback function to be called after the server is set up.
 * @returns {void} This function does not return anything.
 */
function makeServer(cb) {
  const gulpPort = parseInt(GULP_PORT);

  gulpConnect.server({
    silent: true,
    port: gulpPort,
    host: '0.0.0.0',
    debug: false,
    middleware: () => {
      return [
        connectLivereload({
          port: parseInt(LIVERELOAD_PORT)
        }),
        createProxyMiddleware({
          target: APP_SERVER
        }),
        connectCORS()
      ];
    }
  });
  cb();

  console.log('\n');
  fancyLog(
    '\x1b[32m%s\x1b[0m',
    '>> Development Server http://localhost:' + GULP_PORT,
    '\x1b[0m'
  );
  console.log('\n');
}

const server = series(runNodeMon, makeServer);

export { server };
