'use strict';
var gulp = require('gulp');
var gulpLivereload = require('gulp-livereload');
var gulpUtil = require('gulp-util');
const CONSTS = require('./CONSTS');

function watch() {
    gulpLivereload.listen({
        port: CONSTS.LIVERELOAD_PORT
    });
    const watchCopiedTemplates = gulp.watch([CONSTS.TEMPLATES_DEST + '/**/*'], gulpLivereload.reload);
    const watchPublic = gulp.watch([CONSTS.IMG_SRC + '/**/*', CONSTS.FONT_SRC + '/**/*'], ['copystaticfiles']);
    const watchSass = gulp.watch([CONSTS.CSS_SRC_PATH + '/**/*'], ['sass-watch']);
    const watchServerJS = gulp.watch([CONSTS.SERVER_JS_SRC + '/**/*'], ['copyfiles']);
    const watchTemplates = gulp.watch([CONSTS.TEMPLATES_SRC + '/**/*'], ['copyviews']);
    const watchTests = gulp.watch(CONSTS.TESTS_PATH + '/**/*.js', ['mochaTest']);
    [
        watchCopiedTemplates,
        watchPublic,
        watchSass,
        watchServerJS,
        watchTemplates,
        watchTests
    ].forEach((w)=>w.on('change', (e)=>gulpUtil.log(e.path, e.type)));
}

gulp.task('watch', ['build'],  watch);
