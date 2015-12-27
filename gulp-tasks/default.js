'use strict';
var gulp = require('gulp');

gulp.task('default', function() {
    gulp.start('build');
});

gulp.task('local', function() {
    gulp.start('clean', 'eslint');
});

gulp.task('build', ['test', 'clean', 'copy', 'sass', 'browserify']);

gulp.task('test',  ['eslint', 'mochaTest']);
