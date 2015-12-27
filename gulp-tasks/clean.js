'use strict';
var gulp = require('gulp');
var del = require('del');
const CONSTS = require('./CONSTS');

gulp.task('clean',  () => {
    return del.sync([CONSTS.STATIC_PATH, CONSTS.VIEWS, CONSTS.ROUTES, CONSTS.DEPLOY_DEST]);
});
