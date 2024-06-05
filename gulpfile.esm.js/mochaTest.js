import { src } from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpSpawnMocha from 'gulp-spawn-mocha';

import { notify } from './notify';
import { CONSTS } from './CONSTS';

const { GULPFILE, SRC } = CONSTS;

const mochaOptions = {
  require: ['esm', 'module-alias/register'],
  R: 'spec'
};

if (process.env.NODE_ENV === 'production') {
  mochaOptions.R = 'nyan';
}

const TESTS_SRC = [`${SRC}/**/*.test.js`, `${GULPFILE}/**/*.test.js`];

/**
 * Runs the Mocha test suite with live reloading.
 * @returns {NodeJS.ReadWriteStream} The stream of the Mocha test suite.
 */
function mochaTestLR() {
  return src(TESTS_SRC, { read: false })
    .pipe(
      gulpPlumber({
        errorHandler: notify('gulpSpawnMocha Error')
      })
    )
    .pipe(gulpSpawnMocha(mochaOptions));
}

/**
 * Runs the Mocha test suite and handles any errors that occur.
 * @returns {NodeJS.ReadWriteStream} The stream of the Mocha test suite.
 */
function mochaTest() {
  return src(TESTS_SRC, { read: false })
    .pipe(
      gulpPlumber({
        errorHandler: notify('gulpSpawnMocha Error')
      })
    )
    .pipe(gulpSpawnMocha(mochaOptions));
}

export { mochaTest, mochaTestLR };
