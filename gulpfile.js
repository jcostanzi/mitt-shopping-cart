const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

function cleanTask(cb) {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function copyTask(cb) {
  return src(['src/*', '!src/css', '!src/js', '!src/images'])
    .pipe(dest('dist/'));
}

function styleTask(cb) {
  return src('src/css/*')
    .pipe(concat('all-styles.min.css'))
    .pipe(sourcemaps.init())
      .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('dist/css'));
}

function jsTask(cb) {
  return src('src/js/*')
    .pipe(concat('all-js.min.js'))
    .pipe(sourcemaps.init())
      .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('dist/js'));
}

exports.default = series(cleanTask, copyTask, styleTask, jsTask);