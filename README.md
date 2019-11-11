# :zap: Gulp Boilerplate

## Instructions for the boilerplate

* Clone the repository.

* Use this command to install all dependencies for the project:

```bash
# Uses package.json "devDependencies" to install dependencies
yarn
```

* Start `gulp` by running:

```bash
yarn start
```

* Write code in the `src`-folder.


## Folder structure

* `dist` - The converted files that are linked via `index.html`. You don't have to touch these files
    - `js` - All converted `js`-files go here
    - `css` - All converted `css`-files go here
    - `partials` - All converted `pug`-files from `src/pug/partials` go here
    - `index.html` - rendered version of `src/pug/index.pug`
* `src` - This is where your development-files are. These are the ones you work on
    - `js` - All unconverted `js`-files
    - `scss` - All unconverted `scss`-files
    - `pug` - Should only hold `index.pug` and `partials`.
    - `pug/partials` - All uncoverted `pug partials`.
* `Gulpfile.js` - This config file must be in the root-folder
* `package.json` - All the dependencies and config for the project


## Dependencies used in this boilerplate

* ["browserify"](https://www.npms.com/package/browserify)
* ["gulp"](https://www.npms.com/package/gulp)
* ["gulp-babel"](https://www.npms.com/package/gulp-babel)
* ["babelify"](https://www.npms.com/package/babelify)
* ["@babel/core"](https://www.npms.com/package/@babel/core)
* ["@babel/preset-env"](https://www.npms.com/package/@babel/preset-env)
* ["gulp-sass"](https://www.npms.com/package/gulp-sass)
* ["gulp-postcss"](https://www.npms.com/package/gulp-postcss)
* ["autoprefixer"](https://www.npms.com/package/autoprefixer)
* ["cssnano"](https://www.npms.com/package/cssnano)
* ["gulp-pug"](https://www.npms.com/package/gulp-pug)
* ["gulp-rename"](https://www.npms.com/package/gulp-rename)
* ["gulp-util"](https://www.npms.com/package/gulp-util)
* ["browser-sync"](https://www.npms.com/package/browser-sync)
* ["rimraf"](https://www.npms.com/package/rimraf)
* ["vinyl-source-stream"](https://www.npms.com/package/vinyl-source-stream)