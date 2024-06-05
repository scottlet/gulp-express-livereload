import { src } from 'gulp';
import gulpPlumber from 'gulp-plumber';
import gulpMocha from 'gulp-mocha';
import gulpChangedInPlace from 'gulp-changed-in-place';

import { notify } from './notify';
import { CONSTS } from './CONSTS';

const { GULPFILE, SRC } = CONSTS;

const mochaOptions = {
  require: ['esm', 'module-alias/register'],
  reporter: 'spec'
};

if (process.env.NODE_ENV === 'production') {
  mochaOptions.reporter = 'nyan';
}

const TESTS_SRC = [`${SRC}/**/*.test.js`, `${GULPFILE}/**/*.test.js`];

/**
 * Executes Mocha tests with a delay and notifies on errors.
 * @returns {NodeJS.ReadWriteStream} The Gulp stream with the Mocha test results.
 */
function mochaTestSrc() {
  return src(TESTS_SRC, {
    read: false
  })
    .pipe(
      gulpPlumber({
        errorHandler: notify('gulpMocha Error: <%= error.message %>')
      })
    )
    .pipe(gulpChangedInPlace())
    .pipe(gulpMocha(mochaOptions));
}

/**
 * Runs the Mocha test suite and handles any errors that occur.
 * @returns {NodeJS.ReadWriteStream} The stream of the Mocha test suite.
 */
function mochaTest() {
  return src(TESTS_SRC, { read: false })
    .pipe(
      gulpPlumber({
        errorHandler: notify('gulpMocha Error')
      })
    )
    .pipe(gulpMocha(mochaOptions));
}

export { mochaTest, mochaTestSrc };
