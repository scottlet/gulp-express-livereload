'use strict';
var gulp = require('gulp');
const CONSTS = require('./CONSTS');

function copyDeploy () {
    return gulp.src([CONSTS.APPSERVER_DEST + '/**/*', CONSTS.APP_PATH + '/**/*', 'package.json', 'app.js'], {base: '.'})
    .pipe(gulp.dest(CONSTS.DEPLOY_DEST));
}
function npmInstall () {
    return gulp.src(CONSTS.DEPLOY_DEST);
}

gulp.task('copydeploy', ['build'], copyDeploy);
gulp.task('npm-install', ['copydeploy'], npmInstall);
gulp.task('deploy', ['copydeploy', 'npm-install']);
