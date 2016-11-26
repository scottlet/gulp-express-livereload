'use strict';

const RANDOM_PORT = 35729 - 50 + parseInt(Math.random() * 100, 10); // Randomize port for livereload.
const userConfig = require('../src/options');

const OPTIONS = {
    APP_NAME: 'app.js',
    APP_PATH: 'bin',
    APP_SERVER: 'http://127.0.0.1:' + (process.env.PORT || 3000),
    APP: 'bin/www',
    APPSERVER_DEST: 'app/',
    BROWSER_CONFIG: ['> 1%', 'ios >= 7', 'IE 9'],
    CSS_DEST_PATH: 'app/public/css/',
    CSS_SRC_PATH: 'src/sass',
    DEPLOY_DEST: 'deploy',
    FONT_SRC: 'src/fonts',
    GULP_PORT: process.env.GULP_PORT || 9000,
    GULP_TASKS: 'gulp-tasks',
    GULPFILE: 'gulpfile.js',
    IMG_DEST: 'app/public/images/',
    IMG_SRC: 'src/images',
    JS_CLIENT_SRC: 'src/js/client/',
    JS_DEST: 'app/public/js/',
    JS_ENTRY: 'src/js/client/app.js',
    JS_OUTPUT: 'app.min.js',
    JS_SERVER_SRC:'src/js/server/',
    JS_SHARED_SRC: 'src/js/shared/',
    JS_SRC: 'src/js/',
    LIVERELOAD_PORT: process.env.LIVERELOAD_PORT || RANDOM_PORT,
    NODE_ENV: process.env.NODE_ENV,
    NODEMON_DELAY: 3400,
    NODEMON_IGNORE: [
        'gulp-tasks/**','node-modules/**','app/public/**','src/**','tests/**','gulpfile.js'
    ],
    ROUTES: 'app/routes/',
    SRC: 'src',
    STATIC_PATH: 'app/public/',
    TEMPLATES_DEST:'app/views/',
    TEMPLATES_SRC:'src/templates/',
    TESTS_PATH: 'src/tests/',
    VIEWS: 'app/views/'
};

if (userConfig) {
    Object.assign(OPTIONS, userConfig);
    process.env.APP_NAME = OPTIONS.APP_NAME;
}

module.exports = OPTIONS;
