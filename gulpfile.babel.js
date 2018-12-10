'use strict';

import autoprefixer from 'autoprefixer';
import beep from 'beepbeep';
import bourbon from 'bourbon';
import chalk from 'chalk';
import colors from 'colors';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gulpUtil from 'gulp-util';
import nodeUtil from 'util';
import notifier from 'node-notifier';
import path from 'path';
import postcss from 'gulp-postcss';
import util from 'util';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const $ = gulpLoadPlugins();
const THEME_BASE_PATH = ".";
const PATHS = {
  ASSETS: THEME_BASE_PATH + "/assets",
  COMPONENTS: THEME_BASE_PATH + "/components",
  DIST: THEME_BASE_PATH + "/dist",
  JS: THEME_BASE_PATH + "/js",
  NPM: "node_modules",
  SCSS: THEME_BASE_PATH + "/scss",
  SCSS_INCLUDE: [
    ".",
    "./node_modules/slick-carousel/slick/"
  ],
  SVG_SPRITE: THEME_BASE_PATH + "/dist/images",
  TMP: THEME_BASE_PATH + "/.tmp",
};

const pkg = {
  name: "ATTCKWPTemplate",
  version: "1.0.0"
};

const ESLINT_CONFIG = {
  // Trick the config into using babel as a parser.
  // See https://github.com/adametry/gulp-eslint/issues/39
  // and https://github.com/eslint/eslint/issues/2112
  "env": {
    "browser": true,
    "node": false,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "modules": true
    },
    "sourceType": "module"
  },
  "sourceType": "module",
  "rules": {
    "quotes": 0,
    "no-alert": 0,
    "no-extra-boolean-cast": 0
  },
  "globals": [
    "jQuery",
    "$",
    "ATTCK"
  ]
};

/**
 * Copy any fonts from /src and /bower_components to /dist.
 */
gulp.task('fonts', () => {
  return gulp.src((`${PATHS.ASSETS}/fonts/**/*`))
    .pipe(gulp.dest(`${PATHS.DIST}/fonts`));
});

/**
 * Lint the JavaScript.
 */
gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([`${PATHS.JS}/**/*.js`, '!node_modules/**/*'])
    .pipe($.debug())
    .pipe($.plumber(function(err) {
      beep();
      notifier.notify({
        title: 'JS Error',
        message: 'Fix yo\' scripts!',
        icon: path.join(__dirname, 'dev/icons/js.svg'),
        sound: true,
        wait: false
      });
      console.log("[js]".bgYellow.black + " " + err.message.yellow);

      this.emit('end');
    }))
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe($.eslint(ESLINT_CONFIG))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe($.eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe($.eslint.failAfterError());
});

function styles(env="development") {
  let config;

  if (env === "production") {
    config = {
      outputStyle: 'compressed',
      precision: 10,
      includePaths: PATHS.SCSS_INCLUDE
    };
  } else {
    config = {
      outputStyle: 'expanded',
      precision: 10,
      includePaths: PATHS.SCSS_INCLUDE
    };
  }

  return gulp
    .src(`${PATHS.SCSS}/**/*.scss`)
    .pipe($.debug())
    .pipe($.plumber(function(err) {
      beep();
      notifier.notify({
        title: 'SASS Error',
        message: 'Fix yo\' styles!',
        icon: path.join(__dirname, 'dev/icons/sass.png'),
        sound: true,
        wait: false
      });
      console.log('[sass]'.bgMagenta.black + ' ' + err.message.magenta);
      this.emit('end');
    }))
    .pipe( $.if( env === "development", $.sourcemaps.init() ) )
    .pipe($.sass.sync(config))
    .pipe(postcss([ autoprefixer() ]))
    .pipe( $.if( env === "development", $.sourcemaps.write() ) )
    .pipe(gulp.dest(`${PATHS.DIST}/css`));
}

/**
 * Compile sass into /dist and generate sourcemaps.
 */
gulp.task('styles', () => {
  return styles();
});

gulp.task('styles-production', () => {
  return styles("production");
});


function scripts(env="development") {
  let webpackConfig = require( path.join( __dirname, `webpack.config.${env}.js` ) );

  return gulp.src(`${PATHS.JS}/app.js`)
    .pipe($.plumber(function(err) {
      beep();
      notifier.notify({
        title: 'JS Error',
        message: 'Fix yo\' scripts!',
        icon: path.join(__dirname, 'dev/icons/js.svg'),
        sound: true,
        wait: false
      });
      console.log("[js]".bgYellow.black + " " + err.message.yellow);

      this.emit('end');
    }))
    .pipe(
      webpackStream( webpackConfig, webpack )
    )
    .pipe($.debug())
    .pipe(gulp.dest(`${PATHS.DIST}/js/`));
}

/**
 * Run JS in /src through babel, and concatenate it into /dist as main.js.
 */
gulp.task('scripts', ['lint'], () => {
  return scripts();
});

gulp.task('scripts-production', ['lint'], () => {
  return scripts("production");
});

/**
 * Compile all .svg files in /src/svg to /dist/images/svg-sprite.svg. This file
 *  gets injected into the main html by a php include, /inc/svg-sprite.inc.php .
 */
gulp.task('svgstore', function() {
  return gulp
    .src(`${PATHS.ASSETS}/svg/**/*.svg`)
    .pipe($.svgmin(function(file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe($.svgstore({
      inlineSvg: true
    }))
    .pipe($.rename("svg-sprite.svg"))
    .pipe(gulp.dest(PATHS.SVG_SPRITE));
});

/**
 * Copy /src/images files into /dist/images after optimizing them.
 */
gulp.task('images', () => {
  return gulp.src(`${PATHS.ASSETS}/images/**/*`)
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      }))
      .on('error', function(err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest(`${PATHS.DIST}/images`));
});


/**
 * Clear the generated images folders.
 */
gulp.task('clean-images', () => {
  return del([
    `${PATHS.TMP}/images/**/*`,
    `${PATHS.DIST}/images/**/*`
  ]);
});


/**
 * Clear the generated JS folders.
 */
gulp.task('clean-scripts', () => {
  return del([
    `${PATHS.TMP}/js/**/*`,
    `${PATHS.DIST}/js/**/*`
  ]);
});

/**
 * Clear the generated CSS folders.
 */
gulp.task('clean-styles', () => {
  return del([
    `${PATHS.TMP}/css/**/*`,
    `${PATHS.DIST}/css/**/*`
  ]);
});

/**
 * Default Gulp task. Clears out the generated files directories (/dist),
 *  builds the whole project, and runs watches on src and bower directories.
 */
gulp.task('watch', [
  'scripts',
  'styles',
  'fonts',
  'images',
  'svgstore'
], () => {
  gulp.watch( `${PATHS.ASSETS}/fonts/**/*`, ['fonts'] );
  // gulp.watch( `${PATHS.ASSETS}/images/**/*`, ['images'] );

  // TODO - find a better way of running these, since gulp.start is deprecated.
  watch([`${PATHS.SCSS}/**/*.scss`, `${PATHS.COMPONENTS}/**/*.scss`], function() {
    runSequence('styles');
  });
  watch([`${PATHS.JS}/**/*.js`, `${PATHS.COMPONENTS}/**/*.js`], function() {
    runSequence('scripts');
  });
  watch(`${PATHS.ASSETS}/svg/**/*.svg`, function() {
    runSequence('svgstore');
  });
  watch(`${PATHS.ASSETS}/images/**/*`, function() {
    runSequence('images');
  });
});

gulp.task('publish', [
  'styles',
  'fonts',
  'images',
  'svgstore',
  'scripts',
  //'inject-npm-js'
], () => {
  runSequence('styles-production');
  runSequence('scripts-production');
  runSequence('svgstore');
  runSequence('images');
});

gulp.task('default', () => {
  $.util.log('========================================')
  $.util.log('========================================')
  $.util.log('')
  $.util.log(chalk.green('Greetings! Welcome to ' + pkg.name + ' v' + pkg.version + '. ✌️'))
  $.util.log('')
  $.util.log(chalk.green.underline('gulp watch') + ' - Begin hot reloading and auto compiling.')
  $.util.log(chalk.green.underline('gulp publish') + ' - Compile production worthy files.')
  $.util.log('')
  $.util.log('========================================')
});
