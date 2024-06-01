import { dest } from 'gulp';
import browserify from 'browserify';
import commonShakeify from 'common-shakeify';
import fancyLog from 'fancy-log';
import { sync } from 'glob';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpReplace from 'gulp-replace';
import gulpUglify from 'gulp-uglify';
import merge2 from 'merge2';
import vinylBuffer from 'vinyl-buffer';
import vinylSourceStream from 'vinyl-source-stream';
import watchify from 'watchify';

import { notify } from './notify';
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

const entries = sync(JS_CLIENT_SRC + '*.js');

const plugins = [
  [
    'module-resolver',
    {
      root: ['./src/js'],
      alias: {
        '~': './src/js/'
      },
      extentions: ['.js', '.jsx']
    }
  ]
];

/**
 * @param {string} entry entry
 * @returns {NodeJS.ReadWriteStream} stream
 */
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
    // @ts-ignore
    delete uglifyOptions.compress.drop_console;
    babelOptions = { sourceMaps: true };
  }

  const b = browserify(options).plugin(commonShakeify, {});

  b.transform('babelify', {
    presets: ['@babel/preset-env'],
    plugins,
    ...babelOptions
  });

  if (isDev) {
    b.plugin('tinyify', { flat: false });
  }

  /**
   * Checks if Live Reload should be enabled based on the environment and user settings.
   * @returns {boolean} Returns `true` if Live Reload should be enabled, `false` otherwise.
   */
  function doLR() {
    if (process.env.OVERRIDE_LR === 'true') {
      return false;
    }

    return isDev;
  }

  /**
   * Bundles the browserify bundle and performs various transformations on it.
   * @returns {NodeJS.ReadWriteStream} The transformed bundle stream.
   */
  function bundle() {
    return b
      .bundle()
      .pipe(vinylSourceStream(name + JS_OUTPUT))
      .pipe(vinylBuffer())
      .pipe(gulpReplace('$$version$$', VERSION))
      .pipe(gulpReplace('$$API$$', API))
      .pipe(gulpReplace('$$oldMobile$$', `${BREAKPOINTS.OLD_MOBILE}`))
      .pipe(gulpReplace('$$mobile$$', `${BREAKPOINTS.MOBILE}`))
      .pipe(gulpReplace('$$smalltablet$$', `${BREAKPOINTS.SMALL_TABLET}`))
      .pipe(gulpReplace('$$tablet$$', `${BREAKPOINTS.TABLET}`))
      .pipe(gulpReplace('$$smalldesktop$$', `${BREAKPOINTS.SMALL_DESKTOP}`))
      .pipe(gulpUglify(uglifyOptions))
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
  b.on('error', err => {
    notify('Browserify error')(err);
    this.emit('end');
  });

  return bundle();
}

/**
 * Creates JavaScript bundles by mapping over the entries array and applying the addToBrowserify function.
 * The resulting tasks are then merged using merge2.
 * @returns {NodeJS.ReadWriteStream} The merged stream
 */
function createJSBundles() {
  const tasks = entries.map(addToBrowserify);

  return merge2(tasks);
}

//gulp.task('browserify', createJSBundles);
//
export { createJSBundles as browserify };
