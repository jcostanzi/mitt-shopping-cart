const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

function cleanTask(cb) {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function styleTask(cb) {
  return src('src/css/*')
    .pipe(concat('all-styles.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'));
}

function jsTask(cb) {
  return src('src/js/*')
    .pipe(concat('all-js.min.js'))
    .pipe(terser())
    .pipe(dest('dist/js'));
}

exports.default = series(cleanTask, styleTask, jsTask);