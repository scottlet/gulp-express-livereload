import { src, dest } from 'gulp';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import cssnano from 'cssnano';
import Fiber from 'fibers';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpPostcss from 'gulp-postcss';
import gulpRename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import gulpSassVariables from 'gulp-sass-variables';
import postcssAssets from 'postcss-assets';
import postcssNormalize from 'postcss-normalize';
import postcssPresetEnv from 'postcss-preset-env';
import sass from 'sass';

import { CONSTS } from './CONSTS';

const {
    NODE_ENV,
    BREAKPOINTS,
    NAME,
    VERSION,
    SASS_SRC,
    CSS_DEST,
    LIVERELOAD_PORT
} = CONSTS;

const isDev = NODE_ENV !== 'production';

const sassOptions = {
    errLogToConsole: true,
    fiber: Fiber,
    includePaths: []
};

const gulpOptions = isDev
    ? {
        sourcemaps: true
    }
    : {};

gulpSass.compiler = sass;

function buildSassVariables(breakpoints) {
    let b;
    const c = {};

    for (b in breakpoints) {
        c['$' + b.toLowerCase().replace(/_/g, '')] = breakpoints[b] + 'px';
    }

    return c;
}

const sassVariables = buildSassVariables(BREAKPOINTS);

function rename(path) {
    path.basename =
        path.basename.replace('$name', NAME).replace('$version', VERSION) +
        '.min';
}

function compileSass() {
    const processors = [
        autoprefixer(),
        cssMqpacker,
        cssnano,
        postcssAssets,
        postcssNormalize,
        postcssPresetEnv
    ];

    return src(SASS_SRC + '/**/*.scss', gulpOptions)
        .pipe(
            gulpPlumber({
                errorHandler: gulpNotify.onError(
                    error => `Styles Error: ${error.message}`
                )
            })
        )
        .pipe(gulpSassVariables(sassVariables))
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulpPostcss(processors))
        .pipe(gulpRename(rename))
        .pipe(dest(CSS_DEST, gulpOptions))
        .pipe(gulpIf(isDev, gulpLivereload({ port: LIVERELOAD_PORT })));
}

export { compileSass as sass };
