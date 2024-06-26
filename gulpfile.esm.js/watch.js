/*eslint-disable no-console*/
import { parallel, watch } from 'gulp';
import { listen, reload } from 'gulp-livereload';
import fancyLog from 'fancy-log';
import { CONSTS } from './CONSTS';
import { sass } from './sass';
import { copyStaticFiles, copyFiles, copySharedFiles, copyViews } from './copy';
import { mochaTest, mochaTestSrc } from './mochaTest';

const {
  AUDIO_SRC,
  LIVERELOAD_PORT,
  TEMPLATES_DEST,
  FONT_SRC,
  IMG_SRC,
  SASS_SRC,
  JS_SERVER_SRC,
  JS_SHARED_SRC,
  TEMPLATES_SRC,
  VIDEO_SRC
} = CONSTS;

/**
 * Watches for changes in various directories and triggers corresponding tasks.
 * @param {Function} cb - The callback function to be called
 * @returns {void}
 */
function watchers(cb) {
  listen({
    port: LIVERELOAD_PORT
  });

  const watchCopiedTemplates = watch(
    [`${TEMPLATES_DEST}**/*`],
    parallel(reload)
  );
  const watchPublic = watch(
    [
      `${IMG_SRC}/**/*`,
      `${FONT_SRC}/**/*`,
      `${AUDIO_SRC}/**/*`,
      `${VIDEO_SRC}/**/*`
    ],
    {},
    parallel(copyStaticFiles, sass)
  );

  const watchSass = watch([`${SASS_SRC}**/*`], sass);
  const watchServerJS = watch([`${JS_SERVER_SRC}**/*`], copyFiles);
  const watchSharedJS = watch(
    [`${JS_SHARED_SRC}**/*`],
    parallel(copySharedFiles)
  );
  const watchTemplates = watch([`${TEMPLATES_SRC}**/*`], copyViews);
  const watchTests = watch('**/*.js', mochaTest);

  [
    { label: 'watchPublic', watcher: watchPublic },
    { label: 'watchSass', watcher: watchSass },
    { label: 'watchServerJS', watcher: watchServerJS },
    { label: 'watchSharedJS', watcher: watchSharedJS },
    { label: 'watchTemplates', watcher: watchTemplates },
    { label: 'watchTests', watcher: watchTests },
    { label: 'watchCopiedTemplates', watcher: watchCopiedTemplates }
  ].forEach(w => {
    w.watcher.on('change', path => {
      fancyLog(`file ${path} was changed. Triggered by ${w.label} watcher.`);
    });
  });
  cb();
}

/**
 * Watches for changes in test files and triggers the mocha test task.
 * @param {Function} cb - The callback function to be called
 * @returns {void}
 */
function testWatcher(cb) {
  const watchTestsSrc = watch('**/*.js', mochaTestSrc);

  [{ label: 'Watch src tests', watcher: watchTestsSrc }].forEach(w => {
    w.watcher.on('change', path => {
      fancyLog(`file ${path} was changed. Triggered by ${w.label} watcher.`);
    });
  });
  mochaTestSrc();
  cb();
}

export { watchers as watch, testWatcher };
