/*eslint-disable no-console*/

const { dest } = require('gulp');
const browserify = require('browserify');
const commonShakeify = require('common-shakeify');
const CONSTS = require('./CONSTS');
const fancyLog = require('fancy-log');
const glob = require('glob');
const gulpIf = require('gulp-if');
const gulpLivereload = require('gulp-livereload');
const { onError } = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const gulpReplace = require('gulp-replace');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpUglify = require('gulp-uglify');
const merge2 = require('merge2');
const vinylBuffer = require('vinyl-buffer');
const vinylSourceStream = require('vinyl-source-stream');
const watchify = require('watchify');

const isDev = CONSTS.NODE_ENV !== 'production';

const entries = glob.sync(CONSTS.JS_CLIENT_SRC + '*.js');

function addToBrowserify(entry) {
    const options = {
        entries:  [entry],
        cache: {},
        packageCache: {},
        paths: [
            `./${CONSTS.JS_CLIENT_SRC}modules`
        ]
    };

    const name = entry.replace('$name', CONSTS.NAME).replace('$version', CONSTS.VERSION)
        .replace(/.*\/([\w$\-.]+).js/, '$1');

    const uglifyOptions = {
        compress: {
            drop_console: true //eslint-disable-line
        }
    };

    let babelOptions = {};

    if (isDev) {
        options.plugin = [watchify];
        delete uglifyOptions.compress.drop_console;
        babelOptions = { sourceMaps: true };
    }

    const b = browserify(options)
        .plugin(commonShakeify, {});

    b.transform('babelify', {
        presets: ['@babel/preset-env'],
        ...babelOptions
    });

    if (isDev) {
        b.plugin('tinyify', { flat: false });
    }

    function doLR() {
        if (process.env.OVERRIDE_LR === 'true') {
            return false;
        }

        return isDev;
    }

    function bundle() {
        return b.bundle()
            .pipe(gulpPlumber({ errorHandler: onError(error => `JS Bundle Error: ${error.message}`) }))
            .pipe(vinylSourceStream(name + CONSTS.JS_OUTPUT))
            .pipe(vinylBuffer())
            .pipe(gulpReplace('$$oldMobile$$', CONSTS.BREAKPOINTS.OLD_MOBILE))
            .pipe(gulpReplace('$$mobile$$', CONSTS.BREAKPOINTS.MOBILE))
            .pipe(gulpReplace('$$smalltablet$$', CONSTS.BREAKPOINTS.SMALL_TABLET))
            .pipe(gulpReplace('$$tablet$$', CONSTS.BREAKPOINTS.TABLET))
            .pipe(gulpReplace('$$smalldesktop$$', CONSTS.BREAKPOINTS.SMALL_DESKTOP))
            .pipe(gulpSourcemaps.init({ loadMaps: true }))
            .pipe(gulpUglify(uglifyOptions))
            .pipe(gulpIf(isDev, gulpSourcemaps.write()))
            .pipe(dest(CONSTS.JS_DEST))
            .pipe(gulpIf(doLR(), gulpLivereload({
                port: CONSTS.LIVERELOAD_PORT
            })));
    }

    b.on('update', bundle);
    b.on('log', fancyLog);
    b.on('error', fancyLog);

    return bundle();
}

function createbundle() {
    const tasks = entries.map(addToBrowserify);

    return merge2(tasks);
}

//gulp.task('browserify', createbundle);
//
module.exports = createbundle;
