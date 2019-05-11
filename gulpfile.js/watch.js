/*eslint-disable no-console*/

'use strict';

const {series, watch} = require('gulp');
const gulpLivereload = require('gulp-livereload');
const fancyLog = require('fancy-log');
const CONSTS = require('./CONSTS');

function watchers(cb) {
    gulpLivereload.listen({
        port: CONSTS.LIVERELOAD_PORT
    });
    const watchCopiedTemplates = watch([CONSTS.TEMPLATES_DEST + '**/*'], series(gulpLivereload.reload));
    const watchPublic = watch([CONSTS.IMG_SRC + '/**/*', CONSTS.FONT_SRC + '/**/*'], series(
        'copystaticfiles', 'sass-watch'));
    const watchSass = watch([CONSTS.SASS_SRC + '/**/*'], series('sass-watch'));
    const watchServerJS = watch([CONSTS.JS_SERVER_SRC + '**/*'], series('copyfiles'));
    const watchSharedJS = watch([CONSTS.JS_SHARED_SRC + '**/*'], series('copysharedfiles'));
    const watchTemplates = watch([CONSTS.TEMPLATES_SRC + '**/*'], series('copyviews'));
    const watchTests = watch([CONSTS.TESTS_PATH + '/**/*.js', CONSTS.JS_SERVER_SRC + '/**/*'], series('mochaTest'));

    [
        watchCopiedTemplates,
        watchPublic,
        watchSass,
        watchServerJS,
        watchSharedJS,
        watchTemplates,
        watchTests
    ].forEach((w) => {
        w.on('change', (path) => {
            fancyLog(`file ${path} was changed`);
        });
    });
    cb();
}

//task('watch', ['build'], watch);
//

module.exports = watchers;
