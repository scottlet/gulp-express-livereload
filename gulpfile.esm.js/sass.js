import { src, dest } from 'gulp';
import cssnano from 'cssnano';
import Fiber from 'fibers';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpPlumber from 'gulp-plumber';
import gulpPostcss from 'gulp-postcss';
import gulpRename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import gulpSassVariables from 'gulp-sass-variables';
import postcssAssets from 'postcss-assets';
import postcssCombineMediaQuery from 'postcss-combine-media-query';
import postcssImport from 'postcss-import';
import postcssNormalize from 'postcss-normalize';
import postcssPresetEnv from 'postcss-preset-env';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import sass from 'sass';

import { CONSTS } from './CONSTS';
import { notify } from './notify';

const {
    NODE_ENV,
    BREAKPOINTS,
    NAME,
    VERSION,
    SASS_SRC,
    CSS_DEST,
    LIVERELOAD_PORT,
    BREAKPOINT_DEVELOPMENT,
    CSS_NANO_PRESET
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
        postcssCombineMediaQuery,
        postcssSortMediaQueries({
            sort: BREAKPOINT_DEVELOPMENT // default
        }),
        cssnano({
            preset: CSS_NANO_PRESET
        }),
        postcssAssets,
        postcssNormalize,
        postcssImport,
        postcssPresetEnv
    ];

    return src(SASS_SRC + '/**/*.scss', gulpOptions)
        .pipe(
            gulpPlumber({ errorHandler: notify('Styles Error') })
        )
        .pipe(gulpSassVariables(sassVariables))
        .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
        .pipe(gulpPostcss(processors))
        .pipe(gulpRename(rename))
        .pipe(dest(CSS_DEST, gulpOptions))
        .pipe(gulpIf(isDev, gulpLivereload({ port: LIVERELOAD_PORT })));
}

export { compileSass as sass };
