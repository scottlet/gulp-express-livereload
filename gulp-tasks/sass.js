'use strict';

const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker');
const csswring = require('csswring');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpLivereload = require('gulp-livereload');
const gulpNotify = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpReplace = require('gulp-replace');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const nodeNormalizeScss = require('node-normalize-scss').includePaths;
const postcssAssets = require('postcss-assets');
const CONSTS = require('./CONSTS');

const isDev = CONSTS.NODE_ENV !== 'production';

const sassOptions = {
    errLogToConsole: true,
    includePaths: [
        nodeNormalizeScss
    ]
};

function rename(path) {
    path.basename = path.basename.replace('$name', CONSTS.NAME).replace('$version', CONSTS.VERSION) + '.min';
}

function styles() {
    const processors = [
        autoprefixer({browsers: CONSTS.BROWSER_CONFIG}),
        cssMqpacker,
        csswring,
        postcssAssets
    ];

    return gulp.src(CONSTS.SASS_SRC + '/**/*.scss')
        .pipe(gulpIf(isDev, gulpSourcemaps.init()))
        .pipe(gulpPlumber({errorHandler: gulpNotify.onError(error => `Styles Error: ${error.message}`)}))
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulpPostcss(processors))
        .pipe(gulpReplace('__oldMobile__', CONSTS.BREAKPOINTS.OLD_MOBILE))
        .pipe(gulpReplace('__mobile__', CONSTS.BREAKPOINTS.MOBILE))
        .pipe(gulpReplace('__smalltablet__', CONSTS.BREAKPOINTS.SMALL_TABLET))
        .pipe(gulpReplace('__tablet__', CONSTS.BREAKPOINTS.TABLET))
        .pipe(gulpReplace('__smalldesktop__', CONSTS.BREAKPOINTS.SMALL_DESKTOP))
        .pipe(gulpIf(isDev, gulpSourcemaps.write()))
        .pipe(gulpRename(rename))
        .pipe(gulp.dest(CONSTS.CSS_DEST))
        .pipe(gulpIf(isDev, gulpLivereload({port: CONSTS.LIVERELOAD_PORT})));
}

gulp.task('sass', ['clean'], styles);
gulp.task('sass-watch', styles);
