/*eslint-disable no-console*/

'use strict';

const gulp = require('gulp');
const gulpLivereload = require('gulp-livereload');
const gulpUtil = require('gulp-util');
const CONSTS = require('./CONSTS');

function watch() {
    gulpLivereload.listen({
        port: CONSTS.LIVERELOAD_PORT
    });
    const watchCopiedTemplates = gulp.watch([CONSTS.TEMPLATES_DEST + '/**/*'], gulpLivereload.reload);
    const watchPublic = gulp.watch([CONSTS.IMG_SRC + '/**/*', CONSTS.FONT_SRC + '/**/*'], [
        'copystaticfiles', 'sass-watch']);
    const watchSass = gulp.watch([CONSTS.SASS_SRC + '/**/*'], ['sass-watch']);
    const watchServerJS = gulp.watch([CONSTS.JS_SERVER_SRC + '/**/*'], ['copyfiles']);
    const watchSharedJS = gulp.watch([CONSTS.JS_SHARED_SRC + '/**/*'], ['copysharedfilesLR']);
    const watchTemplates = gulp.watch([CONSTS.TEMPLATES_SRC + '/**/*'], ['copyviews']);
    const watchTests = gulp.watch([CONSTS.TESTS_PATH + '/**/*.js', CONSTS.JS_SERVER_SRC + '/**/*'], ['mochaTest']);

    [
        watchCopiedTemplates,
        watchPublic,
        watchSass,
        watchServerJS,
        watchSharedJS,
        watchTemplates,
        watchTests
    ].forEach((w) => {
        w.on('change', (e) => {
            gulpUtil.log(e.path, e.type);
        });
    });
}

gulp.task('watch', ['build'], watch);
