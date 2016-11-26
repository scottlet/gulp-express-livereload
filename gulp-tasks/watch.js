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
    const watches = {
        watchCopiedTemplates: gulp.watch([CONSTS.TEMPLATES_DEST + '/**/*'], gulpLivereload.reload),
        watchPublic: gulp.watch([CONSTS.IMG_SRC + '/**/*', CONSTS.FONT_SRC + '/**/*'], ['copystaticfiles']),
        watchSass: gulp.watch([CONSTS.CSS_SRC_PATH + '/**/*'], ['sass-watch']),
        watchServerJS: gulp.watch([CONSTS.JS_SERVER_SRC + '/**/*'], ['copyfiles']),
        watchSharedJS: gulp.watch([CONSTS.JS_SHARED_SRC + '/**/*'], ['copysharedfilesLR']),
        watchTemplates: gulp.watch([CONSTS.TEMPLATES_SRC + '/**/*'], ['copyviews']),
        watchTests: gulp.watch([CONSTS.TESTS_PATH + '/**/*.js', CONSTS.JS_SERVER_SRC + '/**/*'], ['mochaTest']),
        watchLint: gulp.watch([CONSTS.JS_SRC + '/**/*'], ['eslint'])
    };
    for (let w in watches) {
        watches[w].on('change', (e) => {
            gulpUtil.log(w + ': ', e.path, e.type);
        });
    }
}

gulp.task('watch', ['build'],  watch);
