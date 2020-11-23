import { dest } from 'gulp';
import { onError } from 'gulp-notify';
import browserify from 'browserify';
import commonShakeify from 'common-shakeify';
import fancyLog from 'fancy-log';
import glob from 'glob';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpPlumber from 'gulp-plumber';
import gulpReplace from 'gulp-replace';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpUglify from 'gulp-uglify';
import merge2 from 'merge2';
import vinylBuffer from 'vinyl-buffer';
import vinylSourceStream from 'vinyl-source-stream';
import watchify from 'watchify';

import { CONSTS } from './CONSTS';

const {
    NODE_ENV,
    JS_CLIENT_SRC,
    NAME,
    VERSION,
    JS_OUTPUT,
    API,
    BREAKPOINTS,
    JS_DEST,
    LIVERELOAD_PORT
} = CONSTS;

const isDev = NODE_ENV !== 'production';

const entries = glob.sync(JS_CLIENT_SRC + '*.js');

function addToBrowserify(entry) {
    const options = {
        entries: [entry],
        cache: {},
        packageCache: {},
        paths: [`./${JS_CLIENT_SRC}modules`]
    };

    const name = entry
        .replace('$name', NAME)
        .replace('$version', VERSION)
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

    const b = browserify(options).plugin(commonShakeify, {});

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
        return b
            .bundle()
            .pipe(
                gulpPlumber({
                    errorHandler: onError(
                        error => `JS Bundle Error: ${error.message}`
                    )
                })
            )
            .pipe(vinylSourceStream(name + JS_OUTPUT))
            .pipe(vinylBuffer())
            .pipe(gulpReplace('$$version$$', VERSION))
            .pipe(gulpReplace('$$API$$', API))
            .pipe(gulpReplace('$$oldMobile$$', BREAKPOINTS.OLD_MOBILE))
            .pipe(gulpReplace('$$mobile$$', BREAKPOINTS.MOBILE))
            .pipe(gulpReplace('$$smalltablet$$', BREAKPOINTS.SMALL_TABLET))
            .pipe(gulpReplace('$$tablet$$', BREAKPOINTS.TABLET))
            .pipe(gulpReplace('$$smalldesktop$$', BREAKPOINTS.SMALL_DESKTOP))
            .pipe(gulpSourcemaps.init({ loadMaps: true }))
            .pipe(gulpUglify(uglifyOptions))
            .pipe(gulpIf(isDev, gulpSourcemaps.write()))
            .pipe(dest(JS_DEST))
            .pipe(
                gulpIf(
                    doLR(),
                    gulpLivereload({
                        port: LIVERELOAD_PORT
                    })
                )
            );
    }

    b.on('update', bundle);
    b.on('log', fancyLog);
    b.on('error', fancyLog);

    return bundle();
}

function createJSBundles() {
    const tasks = entries.map(addToBrowserify);

    return merge2(tasks);
}

//gulp.task('browserify', createJSBundles);
//
export { createJSBundles as browserify };
