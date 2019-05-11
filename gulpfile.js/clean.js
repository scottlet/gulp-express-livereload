'use strict';

const {sync} = require('del');

const CONSTS = require('./CONSTS');

function clean(cb) {
    sync([CONSTS.APPSERVER_DEST, CONSTS.DEPLOY_DEST]);
    cb();
}

module.exports = clean;
