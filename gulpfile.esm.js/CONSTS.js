const LIVERELOAD = 35679;
const RANDOM_PORT = (LIVERELOAD - 50 + Math.random() * 100).toFixed(0); // Randomize port for livereload.
const APPSERVER_PORT = 3000;
const SERVER_PORT = '9000';

const { name, version } = require('../package.json');

let OPTIONS = {};

if (!process.env.LIVERELOAD_PORT) {
  process.env.LIVERELOAD_PORT = RANDOM_PORT;
}

try {
  const fs = require('fs');
  const pth = fs.realpathSync('.');

  OPTIONS = require(pth + '/src/options.js');
} catch (ex) {} //eslint-disable-line

const NAME = OPTIONS.NAME || name;
const VERSION = OPTIONS.VERSION || version;
const APPSERVER_DEST = '.app/';
const SRC = 'src';

let CONSTS = {
  APP_PATH: 'bin',
  APP_SERVER: 'http://127.0.0.1:' + (process.env.PORT || APPSERVER_PORT),
  APP: 'bin/www',
  APPSERVER_DEST,
  AUDIO_SRC: `${SRC}/audio`,
  BREAKPOINTS: {
    OLD_MOBILE: 320,
    MOBILE: 767,
    SMALL_TABLET: 600,
    TABLET: 979,
    SMALL_DESKTOP: 1440
  },
  BREAKPOINT_DEVELOPMENT: 'mobile-first',
  CSS_DEST: `${APPSERVER_DEST}/public/${VERSION}/css/`,
  CSS_NANO_PRESET: 'advanced',
  DEPLOY_DEST: 'deploy',
  FONT_SRC: `${SRC}/fonts`,
  GULP_PORT: process.env.GULP_PORT || SERVER_PORT,
  GULP_TASKS: 'gulp-tasks',
  GULPFILE: 'gulpfile.esm.js',
  I18N_SRC: `${SRC}/i18n`,
  I18N_DEST: `${APPSERVER_DEST}/i18n`,
  IMG_DEST: `${APPSERVER_DEST}/public/images/`,
  IMG_SRC: `${SRC}/images`,
  JS_CLIENT_SRC: `${SRC}/js/client/`,
  JS_DEST: `${APPSERVER_DEST}/public/${VERSION}/js/`,
  JS_OUTPUT: '.min.js',
  JS_SERVER_SRC: `${SRC}/js/server/`,
  JS_SHARED_SRC: `${SRC}/js/shared/`,
  JS_SRC: `${SRC}/js/`,
  LIVERELOAD_PORT: process.env.LIVERELOAD_PORT,
  NAME,
  NODE_ENV: process.env.NODE_ENV,
  NODEMON_IGNORE: [
    `${APPSERVER_DEST}/**/*`,
    'gulp-tasks/**/*.js',
    'node-modules/**/*.js',
    'public/**',
    `${SRC}/**`,
    'gulpfile.js'
  ],
  NODEMON_WAIT: 500,
  ROUTES: `${APPSERVER_DEST}/routes/`,
  SASS_SRC: `${SRC}/sass/`,
  SRC,
  STATIC_PATH: `${APPSERVER_DEST}/public/`,
  TEMPLATES_DEST: `${APPSERVER_DEST}/views/`,
  TEMPLATES_SRC: `${SRC}/templates/`,
  VERSION,
  VIDEO_SRC: `${SRC}/video`,
  VIEWS: `${APPSERVER_DEST}/views/`,
  WAIT: 3050
};

CONSTS = {
  ...CONSTS,
  ...OPTIONS
};

export { CONSTS };
