'use strict';

const RANDOM_PORT = 35729 - 50 + parseInt(Math.random() * 100, 10); // Randomize port for livereload.

module.exports = {
    APP_PATH: 'bin',
    APP_SERVER: 'http://127.0.0.1:' + (process.env.PORT || 3000),
    APP: 'bin/www',
    APPSERVER_DEST: 'app/',
    BROWSER_CONFIG: ['> 1%', 'IE 9'],
    CSS_DEST_PATH: 'app/public/css/',
    CSS_SRC_PATH: 'src/sass',
    DEPLOY_DEST: 'deploy',
    FONT_SRC: 'src/fonts',
    GULP_PORT: process.env.GULP_PORT || 9000,
    IMG_DEST: 'app/public/images/',
    IMG_SRC: 'src/images',
    JS_DEST: 'app/public/js/',
    JS_ENTRY: 'src/js/client/app.js',
    JS_OUTPUT: 'app.js',
    JS_SRC: 'src/js/client/',
    LIVERELOAD_PORT: process.env.LIVERELOAD_PORT || RANDOM_PORT,
    NODE_ENV: process.env.NODE_ENV,
    NODEMON_IGNORE: ['gulp-tasks/**/*.js','node-modules/**/*.js','public/**','src/**','tests/**/*.js','gulpfile.js'],
    ROUTES: 'app/routes/',
    SERVER_JS_SRC:'src/js/server/',
    SRC: 'src',
    STATIC_PATH: 'app/public/',
    TEMPLATES_DEST:'app/views/',
    TEMPLATES_SRC:'src/templates/',
    TESTS_PATH: 'src/tests/',
    VIEWS: 'app/views/'
};
