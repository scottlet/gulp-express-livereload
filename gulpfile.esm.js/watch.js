/*eslint-disable no-console*/
import { parallel, watch } from 'gulp';
import { listen, reload } from 'gulp-livereload';
import fancyLog from 'fancy-log';
import { CONSTS } from './CONSTS';
import { sass } from './sass';
import { copyStaticFiles, copyFiles, copySharedFiles, copyViews } from './copy';
import { mochaTest } from './mochaTest';

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
    TESTS_PATH,
    VIDEO_SRC
} = CONSTS;

function watchers(cb) {
    listen({
        port: LIVERELOAD_PORT
    });

    const runSass = parallel(sass);
    const runCopyFiles = parallel(copyFiles);
    const runCopySharedFiles = parallel(copySharedFiles);
    const runCopyViews = parallel(copyViews);
    const runMochaTest = parallel(mochaTest);
    const liveReload = parallel(reload);
    const runCopyAndSass = parallel(copyStaticFiles, sass);

    const watchCopiedTemplates = watch([`${TEMPLATES_DEST}**/*`], liveReload);
    const watchPublic = watch(
        [
            `${IMG_SRC}/**/*`,
            `${FONT_SRC}/**/*`,
            `${AUDIO_SRC}/**/*`,
            `${VIDEO_SRC}/**/*`
        ],
        { allowEmpty: true },
        runCopyAndSass
    );

    const watchSass = watch([`${SASS_SRC}/**/*`], runSass);
    const watchServerJS = watch([`${JS_SERVER_SRC}**/*`], runCopyFiles);
    const watchSharedJS = watch([`${JS_SHARED_SRC}**/*`], runCopySharedFiles);
    const watchTemplates = watch([`${TEMPLATES_SRC}**/*`], runCopyViews);
    const watchTests = watch(
        [`${TESTS_PATH}/**/*.js`, `${JS_SERVER_SRC}/**/*`],
        runMochaTest
    );

    [
        watchCopiedTemplates,
        watchPublic,
        watchSass,
        watchServerJS,
        watchSharedJS,
        watchTemplates,
        watchTests
    ].forEach(w => {
        w.on('change', path => {
            fancyLog(`file ${path} was changed`);
        });
    });
    cb();
}

export { watchers as watch };
