const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

function cleanTask(cb) {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function copyTask(cb) {
  return src(['src/*', '!src/css', '!src/js', '!src/images'])
    .pipe(dest('dist/'));
}

function styleTask(cb) {
  return src('src/css/*', { sourcemaps: true })
    .pipe(concat('all-styles.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist/css', { sourcemaps: '../maps/css' }));
}

function jsTask(cb) {
  return src('src/js/*', { sourcemaps: true })
    .pipe(concat('all-js.min.js'))
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '../maps/js' }));
}

function imagesTask(cb) {
  return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

exports.default = series(cleanTask, styleTask, jsTask, imagesTask, copyTask);