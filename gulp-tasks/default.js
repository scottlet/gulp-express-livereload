'use strict';
const gulp = require('gulp');

gulp.task('default', () => {
    gulp.start('build');
});

gulp.task('local', () => {
    gulp.start('clean', 'eslint');
});

gulp.task('build', ['test', 'clean', 'copy', 'sass', 'browserify']);

gulp.task('test',  ['eslint', 'mochaTest']);
