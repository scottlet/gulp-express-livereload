'use strict';

const LIVERELOAD = 35679;
const RANDOM_PORT = LIVERELOAD - 50 + parseInt(Math.random() * 100); // Randomize port for livereload.
const APPSERVER_PORT = 3000;
const SERVER_PORT = 9000;
const {name, version} = require('../package.json');

const OPTIONS = require('../src/options');

let CONSTS = {
    APP_PATH: 'bin',
    APP_SERVER: 'http://127.0.0.1:' + (process.env.PORT || APPSERVER_PORT),
    APP: 'bin/www',
    APPSERVER_DEST: 'app/',
    BROWSER_CONFIG: ['> 1%', 'IE 9'],
    CSS_DEST: 'app/public/css/',
    DEPLOY_DEST: 'deploy',
    FONT_SRC: 'src/fonts',
    GULP_PORT: process.env.GULP_PORT || SERVER_PORT,
    GULP_TASKS: 'gulp-tasks',
    GULPFILE: 'gulpfile.js',
    IMG_DEST: 'app/public/images/',
    IMG_SRC: 'src/images',
    JS_CLIENT_SRC: 'src/js/client/',
    JS_DEST: 'app/public/js/',
    JS_OUTPUT: '.min.js',
    JS_SERVER_SRC:'src/js/server/',
    JS_SHARED_SRC: 'src/js/shared/',
    JS_SRC: 'src/js/',
    LIVERELOAD_PORT: process.env.LIVERELOAD_PORT || RANDOM_PORT,
    NAME: OPTIONS.NAME || name,
    NODE_ENV: process.env.NODE_ENV,
    NODEMON_IGNORE: [
        'gulp-tasks/**/*.js',
        'node-modules/**/*.js',
        'public/**',
        'src/**',
        'tests/**/*.js',
        'gulpfile.js'
    ],
    NODEMON_WAIT: 3400,
    ROUTES: 'app/routes/',
    SASS_SRC: 'src/sass',
    SRC: 'src',
    STATIC_PATH: 'app/public/',
    TEMPLATES_DEST:'app/views/',
    TEMPLATES_SRC:'src/templates/',
    TESTS_PATH: 'src/tests/',
    VERSION: OPTIONS.VERSION || version,
    VIEWS: 'app/views/',
    WAIT: 3050
};

CONSTS = Object.assign(CONSTS, OPTIONS);

module.exports = CONSTS;
