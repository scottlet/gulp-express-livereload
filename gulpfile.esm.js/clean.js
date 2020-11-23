import del from 'del';

import { CONSTS } from './CONSTS';
const { APPSERVER_DEST, DEPLOY_DEST } = CONSTS;

function clean() {
    return del([APPSERVER_DEST, DEPLOY_DEST]);
}

export { clean };
