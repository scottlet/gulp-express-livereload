'use strict';

const gulp = require('gulp');

gulp.task('default', () => {
    gulp.start('server');
});

gulp.task('local', () => {
    gulp.start('clean', 'eslint');
});

gulp.task('build', ['eslint', 'clean', 'copy', /*test',*/ 'sass', 'browserify']);
