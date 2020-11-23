## ABOUT
This is a small project that should make using gulp and LiveReload much easier
for people. There's example code here: [https://github.com/scottbert/gulp-express-livereload-src-example](https://github.com/scottbert/gulp-express-livereload-src-example). To use the example,
check out this repository, then check the example out inside of this repository
and rename it to `src`. (This exists as a submodule now).

`src` is `.gitignore`d from here, so won't ever be overwritten or modified.

This means you can safely update this project at any time and not need to
change anything else.

## FEATURES
* Everything lives in src in a sensible folder structure
* Browserify is included for JS processing/require.
* Minification of JS/CSS
* SCSS out of the box, inc postcss
* Mocha unit tests
* Live reload enabled watchers for everything. CSS injected into page

## USING

Requires global `gulp` and `gulp-cli` to be installed

Also requires `node/npm`, obvs. 12.x or above.

If you have homebrew installed on OSX this is as simple as `brew install node`.

If you don't have homebrew on OSX, visit [http://brew.sh](http://brew.sh)

## RUNNING

check out this repo.

NPM pre 7: `npm install` - NPM 7 and above: `npm install --`

Now you're all configured, running `npm run develop` will give you a livereload enabled express server. You can access it on
[http://localhost:9000](http://localhost:9000) by default.

You shouldn't have to now touch anything outside of `src`

If you wish to use this as a base for future development, remove the git info
from inside of src and either

* Remove the git info from this repo too and create an empty repo and check all of this in

* OR keep the git info in here, meaning you can periodically update your copy
of this repo whenever you wish, but keep the src folder separately under source control.

## Deploying

You can run `npm run deploy` to copy everything to `deploy/app` - this folder can be transferred to a host with node and run using your favourite processes to keep node apps alive.

Changelog:

* 4.3.0 - Changed to use `npm` scripts. (Still uses gulp under the hood). Documented deploy.
* 3.0.0 - Added in babel support as it's fast now. Deploy works correctly. Tweaked some stuff around how CSS is built. Made the javascript minification better. Tweaked the eslint settings.
* 1.1.0 - A few changes reorganising things. Updated everything to work correctly.
Changed a lot of the dependencies and tweaked the watchers and notification systems. Added the ability to override options.

* 1.0.0 - Initial commit. Working well enough to use.
