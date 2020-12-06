import { src } from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpMocha from 'gulp-mocha';
import gulpWait from 'gulp-wait';

import { notify } from './notify';
import { CONSTS } from './CONSTS';

const { TESTS_PATH, WAIT } = CONSTS;

const mochaOptions = {
    require: 'esm'
};

function mochaTestLR() {
    return src(TESTS_PATH + '**/*.js', { read: false })
        .pipe(gulpWait(WAIT))
        .pipe(
            gulpPlumber({
                errorHandler: notify('gulpMocha Error')
            })
        )
        .pipe(gulpMocha(mochaOptions));
}

function mochaTest() {
    return src(TESTS_PATH + '**/*.js', { read: false })
        .pipe(
            gulpPlumber({
                errorHandler: notify('gulpMocha Error')
            })
        )
        .pipe(gulpMocha(mochaOptions));
}

export { mochaTest, mochaTestLR };
