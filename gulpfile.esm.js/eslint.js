import { src } from 'gulp';
import gulpESLint from 'gulp-eslint';
import { onError } from 'gulp-notify';
import gulpChangedInPlace from 'gulp-changed-in-place';
import gulpPlumber from 'gulp-plumber';
import { CONSTS } from './CONSTS';

const { GULP_TASKS, GULPFILE, JS_SRC } = CONSTS;

function short(a) {
    const arr = a.split('/');

    return arr[arr.length - 1];
}

function eslint() {
    return src([GULPFILE, GULP_TASKS + '/**/*.js', JS_SRC + '/**/*.js'])
        .pipe(
            gulpPlumber({
                errorHandler: onError(error => {
                    return (
                        'ESLint Error: ' +
                        short(error.fileName) +
                        ':<%= error.lineNumber %>, <%= error.message %>'
                    );
                })
            })
        )
        .pipe(gulpChangedInPlace())
        .pipe(gulpESLint())
        .pipe(gulpESLint.format());
}

export { eslint };
