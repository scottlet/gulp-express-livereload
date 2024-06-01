import { deleteAsync } from 'del';

import { CONSTS } from './CONSTS';
const { APPSERVER_DEST, DEPLOY_DEST } = CONSTS;

/**
 * Cleans the specified directories by deleting their contents.
 * @returns {Promise<string[]>} A promise that resolves when the directories are cleaned.
 */
function clean() {
  return deleteAsync([APPSERVER_DEST, DEPLOY_DEST]);
}

export { clean };
