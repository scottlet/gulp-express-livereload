import { src, dest } from 'gulp';
import { CONSTS } from './CONSTS';

const { APPSERVER_DEST, APP_PATH, DEPLOY_DEST } = CONSTS;

/**
 * Copies the necessary files from the APPSERVER_DEST and APP_PATH directories,
 * along with the package.json and src/js/server/app.js files, to the DEPLOY_DEST directory.
 * @returns {NodeJS.ReadWriteStream} A stream of copied files.
 */
function copyDeploy() {
  return src(
    [
      `${APPSERVER_DEST}/**/*`,
      `${APP_PATH}/**/*`,
      'package.json',
      'src/js/server/app.js'
    ],
    { base: '.' }
  ).pipe(dest(DEPLOY_DEST));
}

export { copyDeploy as deploy };
