import { series, parallel } from 'gulp';

import { browserify } from './browserify';
import { clean } from './clean';
import { copy } from './copy';
import { deploy } from './deploy';

import { eslint } from './eslint';
import { mochaTest } from './mochaTest';
import { sass } from './sass';
import { server as buildServer } from './server';
import { watch } from './watch';

const buildcode = parallel(eslint, mochaTest, copy, sass, browserify);
const build = series(clean, buildcode);
const server = series(build, watch, buildServer);
const deployTask = series(build, deploy);
const defaultTask = series(build, watch, server);

export {
    defaultTask as default,
    server,
    deployTask as deploy,
    build,
    browserify,
    eslint,
    copy,
    watch
};
