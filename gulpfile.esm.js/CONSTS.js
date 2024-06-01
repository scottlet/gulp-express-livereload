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

let CONSTS = {
  APP_PATH: 'bin',
  APP_SERVER: 'http://127.0.0.1:' + (process.env.PORT || APPSERVER_PORT),
  APP: 'bin/www',
  APPSERVER_DEST: 'app/',
  AUDIO_SRC: 'src/audio',
  BREAKPOINTS: {
    OLD_MOBILE: 320,
    MOBILE: 767,
    SMALL_TABLET: 600,
    TABLET: 979,
    SMALL_DESKTOP: 1440
  },
  BREAKPOINT_DEVELOPMENT: 'mobile-first',
  CSS_DEST: 'app/public/' + VERSION + '/css/',
  CSS_NANO_PRESET: 'advanced',
  DEPLOY_DEST: 'deploy',
  FONT_SRC: 'src/fonts',
  GULP_PORT: process.env.GULP_PORT || SERVER_PORT,
  GULP_TASKS: 'gulp-tasks',
  GULPFILE: 'gulpfile.esm.js',
  I18N_SRC: 'src/i18n',
  I18N_DEST: 'app/i18n',
  IMG_DEST: 'app/public/images/',
  IMG_SRC: 'src/images',
  JS_CLIENT_SRC: 'src/js/client/',
  JS_DEST: 'app/public/' + VERSION + '/js/',
  JS_OUTPUT: '.min.js',
  JS_SERVER_SRC: 'src/js/server/',
  JS_SHARED_SRC: 'src/js/shared/',
  JS_SRC: 'src/js/',
  LIVERELOAD_PORT: process.env.LIVERELOAD_PORT,
  NAME,
  NODE_ENV: process.env.NODE_ENV,
  NODEMON_IGNORE: [
    'gulp-tasks/**/*.js',
    'node-modules/**/*.js',
    'public/**',
    'src/**',
    'tests/**/*.js',
    'gulpfile.js'
  ],
  NODEMON_WAIT: 500,
  ROUTES: 'app/routes/',
  SASS_SRC: 'src/sass/',
  SRC: 'src',
  STATIC_PATH: 'app/public/',
  TEMPLATES_DEST: 'app/views/',
  TEMPLATES_SRC: 'src/templates/',
  TESTS_PATH: 'src/tests/',
  VERSION,
  VIDEO_SRC: 'src/video',
  VIEWS: 'app/views/',
  WAIT: 3050
};

CONSTS = {
  ...CONSTS,
  ...OPTIONS
};

export { CONSTS };
