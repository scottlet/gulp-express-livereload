import { src, dest } from 'gulp';
import { CONSTS } from './CONSTS';

const { APPSERVER_DEST, APP_PATH, DEPLOY_DEST } = CONSTS;

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
