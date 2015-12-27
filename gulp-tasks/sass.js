'use strict';
var autoprefixer = require('autoprefixer');
var cssMqpacker = require('css-mqpacker');
var csswring = require('csswring');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpLivereload = require('gulp-livereload');
var gulpNotify = require('gulp-notify');
var gulpPlumber = require('gulp-plumber');
var gulpPostcss = require('gulp-postcss');
var gulpSass = require('gulp-sass');
var gulpSourcemaps = require('gulp-sourcemaps');
var postcssAssets  = require('postcss-assets');
var bourbon = require('node-bourbon').includePaths;
const CONSTS = require('./CONSTS');

const isDev = CONSTS.NODE_ENV !== 'production';

const sassOptions = {
    errLogToConsole: true,
    includePaths: [bourbon]
};

function styles() {
    var processors = [
        autoprefixer({browsers: CONSTS.BROWSER_CONFIG}),
        cssMqpacker,
        csswring,
        postcssAssets
    ];
    return gulp.src(CONSTS.CSS_SRC_PATH + '/**/*.scss')
        .pipe(gulpIf(isDev, gulpSourcemaps.init()))
        .pipe(gulpPlumber({errorHandler: gulpNotify.onError('Styles Error: <%= error.message %>')}))
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulpPostcss(processors))
        .pipe(gulpIf(isDev, gulpSourcemaps.write()))
        .pipe(gulp.dest(CONSTS.CSS_DEST_PATH))
        .pipe(gulpIf(isDev, gulpLivereload({port: CONSTS.LIVERELOAD_PORT})));
}

gulp.task('sass', ['clean'], styles);
gulp.task('sass-watch', styles);
