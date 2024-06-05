import { parallel, src, dest } from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpPlumber from 'gulp-plumber';

import { CONSTS } from './CONSTS';
import { notify } from './notify';

const {
  APP,
  APPSERVER_DEST,
  AUDIO_SRC,
  FONT_SRC,
  I18N_SRC,
  I18N_DEST,
  IMG_SRC,
  JS_SERVER_SRC,
  JS_SHARED_SRC,
  JS_SRC,
  LIVERELOAD_PORT,
  SRC,
  STATIC_PATH,
  TEMPLATES_DEST,
  TEMPLATES_SRC,
  VIDEO_SRC,
  VERSION
} = CONSTS;

const APPSERVER_SRC = [`${JS_SERVER_SRC}**/*.js`];
const SHARED_SRC = [`${JS_SHARED_SRC}**/*.js`];
const STATIC_SRC = [
  `${IMG_SRC}/**`,
  `${AUDIO_SRC}/**`,
  `${FONT_SRC}/**`,
  `${VIDEO_SRC}/**`
];
const TEMPLATES_SOURCE = [`${TEMPLATES_SRC}**`];

/**
 * Copies the files from the source directory to the app server destination directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyBin() {
  return copyFilesFn(
    [`${SRC}/${APP}`, `${SRC}/bin/app.js`],
    APPSERVER_DEST,
    SRC
  );
}

/**
 * Copies the files from the TEMPLATES_SOURCE directory to the TEMPLATES_DEST directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyViews() {
  return copyFilesFn(TEMPLATES_SOURCE, TEMPLATES_DEST, TEMPLATES_SRC, true);
}

/**
 * Copies all files from the `I18N_SRC` directory to the `I18N_DEST` directory,
 * including subdirectories. The function uses the `copyFilesFn` function to perform
 * the actual copying, passing the source path, destination path, and source directory
 * as arguments. The `true` argument indicates that the function should copy files
 * recursively.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyi18n() {
  return copyFilesFn(`${I18N_SRC}/**`, I18N_DEST, I18N_SRC, true);
}

/**
 * Copies the 'src/options.js' and 'src/package.json' files from the source directory to the APPSERVER_DEST directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyOptions() {
  return copyFilesFn(
    [`${SRC}/options.js`, `${SRC}/package.json`],
    APPSERVER_DEST,
    SRC,
    true
  );
}

/**
 * Copies files from the `JS_SERVER_SRC` directory to the `APPSERVER_DEST` directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyFiles() {
  return copyFilesFn(APPSERVER_SRC, APPSERVER_DEST, JS_SERVER_SRC, false);
}

/**
 * Copies the files from the `SHARED_SRC` directory to the `APPSERVER_DEST` directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copySharedFiles() {
  return copyFilesFn(SHARED_SRC, APPSERVER_DEST, JS_SRC, false);
}

/**
 * Copies the static files from the `STATIC_SRC` directory to the `STATIC_PATH/VERSION` directory.
 * @returns {NodeJS.ReadWriteStream} A promise that resolves when the files have been successfully copied.
 */
function copyStaticFiles() {
  return copyFilesFn(STATIC_SRC, `${STATIC_PATH}/${VERSION}`, SRC, true);
}

/**
 * Copies files from the source directory to the destination directory.
 * @param {string|string[]} source - The source directory or directories to copy files from.
 * @param {string} destination - The destination directory to copy files to.
 * @param {string} [base] - The base directory for resolving relative paths. Defaults to the current directory.
 * @param {boolean} [reload] - Whether to reload the browser after copying the files. Defaults to false.
 * @returns {NodeJS.ReadWriteStream} The stream of copied files.
 */
function copyFilesFn(source, destination, base = '.', reload) {
  return src(source, { base })
    .pipe(
      gulpPlumber({
        errorHandler: notify('copy error')
      })
    )
    .pipe(gulpChanged(destination))
    .pipe(dest(destination))
    .pipe(
      gulpIf(
        reload,
        gulpLivereload({
          port: LIVERELOAD_PORT
        })
      )
    );
}

const copy = parallel(
  copyBin,
  copyFiles,
  copyi18n,
  copyOptions,
  copySharedFiles,
  copyStaticFiles,
  copyViews
);

export { copy, copyFiles, copyStaticFiles, copySharedFiles, copyViews };
