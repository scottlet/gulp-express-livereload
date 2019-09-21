/*eslint-disable no-console*/
const { parallel, watch } = require('gulp');
const gulpLivereload = require('gulp-livereload');
const fancyLog = require('fancy-log');
const CONSTS = require('./CONSTS');
const sass = require('./sass');
const { copyStaticFiles, copyFiles, copySharedFiles, copyViews } = require('./copy');
const { mochaTest } = require('./mochaTest');

function watchers(cb) {
    gulpLivereload.listen({
        port: CONSTS.LIVERELOAD_PORT
    });
    const watchCopiedTemplates = watch([CONSTS.TEMPLATES_DEST + '**/*'], parallel(gulpLivereload.reload));
    const watchPublic = watch([CONSTS.IMG_SRC + '/**/*', CONSTS.FONT_SRC + '/**/*'], parallel(
        copyStaticFiles, sass));
    const watchSass = watch([CONSTS.SASS_SRC + '/**/*'], parallel(sass));
    const watchServerJS = watch([CONSTS.JS_SERVER_SRC + '**/*'], parallel(copyFiles));
    const watchSharedJS = watch([CONSTS.JS_SHARED_SRC + '**/*'], parallel(copySharedFiles));
    const watchTemplates = watch([CONSTS.TEMPLATES_SRC + '**/*'], parallel(copyViews));
    const watchTests = watch([CONSTS.TESTS_PATH + '/**/*.js', CONSTS.JS_SERVER_SRC + '/**/*'], parallel(mochaTest));

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

module.exports = watchers;
