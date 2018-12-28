'use strict';

const gulp = require('gulp');
const CONSTS = require('./CONSTS');

function copyDeploy() {
    return gulp.src([CONSTS.APPSERVER_DEST + '/**/*', CONSTS.APP_PATH + '/**/*', 'package.json', 'app.js'], {base: '.'})
        .pipe(gulp.dest(CONSTS.DEPLOY_DEST));
}

gulp.task('copydeploy', ['build'], copyDeploy);
gulp.task('deploy', ['copydeploy']);
