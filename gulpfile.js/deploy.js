const { src, dest } = require('gulp');
const CONSTS = require('./CONSTS');

function copyDeploy() {
    return src([CONSTS.APPSERVER_DEST + '/**/*', CONSTS.APP_PATH + '/**/*', 'package.json', 'src/js/server/app.js'],
        { base: '.' })
        .pipe(dest(CONSTS.DEPLOY_DEST));
}

module.exports = copyDeploy;
