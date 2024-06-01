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

function copyBin() {
  return copyFilesFn(
    [SRC + '/' + APP, SRC + '/' + 'bin/app.js'],
    APPSERVER_DEST,
    SRC
  );
}

function copyViews() {
  return copyFilesFn(TEMPLATES_SOURCE, TEMPLATES_DEST, TEMPLATES_SRC, true);
}

function copyi18n() {
  return copyFilesFn(`${I18N_SRC}/**`, I18N_DEST, I18N_SRC, true);
}

function copyOptions() {
  return copyFilesFn(
    ['src/options.js', 'src/package.json'],
    APPSERVER_DEST,
    SRC,
    true
  );
}

function copyFiles() {
  return copyFilesFn(APPSERVER_SRC, APPSERVER_DEST, JS_SERVER_SRC, false);
}

function copySharedFiles() {
  return copyFilesFn(SHARED_SRC, APPSERVER_DEST, JS_SRC, false);
}

function copyStaticFiles() {
  return copyFilesFn(STATIC_SRC, STATIC_PATH + '/' + VERSION, SRC, true);
}

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
